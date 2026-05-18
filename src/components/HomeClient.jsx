"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Building2, Star, ChevronRight } from "lucide-react";
import { TrailerModal } from "@/components/TrailerModal";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import popupData from "@/data/popupdata.json";

const getEmbedUrl = (url) => {
  if (!url) return "";
  if (url.includes("embed/")) return url;
  
  // Handle watch?v= or youtu.be format
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  return url;
};

export default function HomeClient({ initialData, initialPopupData }) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isStartupPopupOpen, setIsStartupPopupOpen] = useState(false);

  const finalData = initialData || {};
  
  const apiPopup = initialPopupData?.popup?.[0] || {};
  const activePopup = (initialPopupData?.popup && initialPopupData.popup.length > 0)
    ? {
        showPopup: true,
        title: apiPopup.title || popupData.title,
        subtitle: apiPopup.subtitle || popupData.subtitle,
        videoUrl: apiPopup.video_url ? getEmbedUrl(apiPopup.video_url) : popupData.videoUrl
      }
    : popupData;

  const studioMap = {};
  if (finalData.studios) {
    finalData.studios.forEach(s => {
      studioMap[s.id] = s.title;
    });
  }

  const formatMovie = (m) => {
    const posterUrl = m.poster.startsWith("http")
      ? m.poster
      : `https://res.cloudinary.com/neomfilms/${m.poster}`;
    
    return {
      id: m.id?.toString(),
      title: m.title,
      description: m.description,
      poster: posterUrl,
      backdrop: posterUrl,
      trailer: getEmbedUrl(m.trailer),
      releaseDate: m.release_date,
      genre: m.genre,
      rating: m.rating?.toString() || "0",
      status: m.status || "Now Playing",
      studio: typeof m.studio === "number" ? (studioMap[m.studio] || `Studio ${m.studio}`) : (m.studio || "Unknown")
    };
  };

  const featuredMovies = (finalData.banner?.items && finalData.banner.items.length > 0)
    ? finalData.banner.items.map(formatMovie)
    : [];

  const nowPlaying = (finalData.now_playing && finalData.now_playing.length > 0)
    ? finalData.now_playing.map(formatMovie)
    : [];

  const upcoming = (finalData.coming_soon && finalData.coming_soon.length > 0)
    ? finalData.coming_soon.map(formatMovie)
    : [];

  const stats = finalData.stats || null;

  const finalTheaters = (finalData.theatre && finalData.theatre.length > 0)
    ? finalData.theatre.map(t => ({ name: t.title }))
    : [];

  const finalPartners = (finalData.studios && finalData.studios.length > 0)
    ? finalData.studios.map(s => s.title)
    : [];

  useEffect(() => {
    const interval = setInterval(() => {
      if (featuredMovies.length > 0) {
        setCurrentHeroIndex((prev) => (prev + 1) % featuredMovies.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem("hasShownStartupPopup");
    if (activePopup.showPopup && !hasShownPopup) {
      const timer = setTimeout(() => {
        setIsStartupPopupOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activePopup.showPopup]);

  const handleCloseStartupPopup = () => {
    setIsStartupPopupOpen(false);
    sessionStorage.setItem("hasShownStartupPopup", "true");
  };

  const handleWatchTrailer = (movie) => {
    setSelectedMovie(movie);
    setIsTrailerOpen(true);
  };

  if (featuredMovies.length === 0 && nowPlaying.length === 0 && upcoming.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-center p-8">
        <div className="space-y-6 max-w-md glass p-12 rounded-[3rem] border border-white/5 shadow-2xl">
          <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto border border-brand-gold/20">
            <Play className="w-8 h-8 fill-brand-gold" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">No Releases Found</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            There are currently no active cinema titles loaded from our distribution database. Check back soon for premium releases!
          </p>
        </div>
      </div>
    );
  }

  const heroMovie = featuredMovies[currentHeroIndex] || featuredMovies[0];

  return (
    <div className="relative pb-24 space-y-24">
      {/* Hero Section */}
      {heroMovie && (
        <section className="relative h-[95vh] w-full overflow-hidden">
          {/* Background Backdrop with Ken Burns Effect */}
          <div className="absolute inset-0 transition-all duration-1000">
            <Image
              src={heroMovie.poster}
              alt={heroMovie.title}
              fill
              priority
              className="object-cover scale-105 animate-ken-burns brightness-[0.75]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative h-full flex flex-col justify-center px-4 md:px-16 lg:px-24 max-w-5xl gap-8 z-10">
            <div className="flex items-center gap-3 animate-fade-in">
              <Badge variant="destructive" className="bg-brand-gold font-bold uppercase tracking-widest text-[10px] px-3 py-1.5">
                {heroMovie.status}
              </Badge>
              <span className="text-gray-300 text-sm font-medium flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {heroMovie.rating} / 10 • {heroMovie.studio}
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.9] text-shadow text-white shadow-xl">
                {heroMovie.title}
              </h1>
              <p className="text-xl text-gray-300/90 line-clamp-3 max-w-2xl font-light leading-relaxed">
                {heroMovie.description}
              </p>
            </div>

            <div className="mt-4">
              <Button
                size="xl"
                className="bg-brand-gold text-white hover:bg-brand-gold/90 font-bold px-10 py-3 rounded-full shadow-[0_0_30px_rgba(229,9,20,0.4)] gap-3 group transition-all cursor-pointer"
                onClick={() => handleWatchTrailer(heroMovie)}
              >
                <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" /> WATCH TRAILER
              </Button>
            </div>
          </div>

          {/* Hero Bottom Indicators */}
          {featuredMovies.length > 1 && (
            <div className="absolute bottom-12 right-12 flex items-center gap-4 z-20">
              <div className="flex gap-2">
                {featuredMovies.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentHeroIndex(idx)}
                    className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentHeroIndex ? "w-12 bg-brand-gold" : "w-4 bg-white/20"
                      }`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-white/40">{currentHeroIndex + 1} / {featuredMovies.length}</span>
            </div>
          )}
        </section>
      )}

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto space-y-32 px-4 md:px-12 lg:px-16">

        {/* Now Playing Row */}
        <section className="space-y-10">
          <div className="flex items-end justify-between border-l-4 border-brand-gold pl-6">
            <div className="space-y-1">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Now Playing</h2>
              <p className="text-gray-500 font-medium">Experience these masterpieces on the big screen</p>
            </div>
          </div>

          {nowPlaying.length > 0 ? (
            <Carousel opts={{ align: "start", loop: true }} className="w-full group/carousel">
              <CarouselContent className="-ml-6">
                {nowPlaying.map((movie) => (
                  <CarouselItem key={movie.id} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/4 xl:basis-1/5">
                    <div
                      className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[2/3] transition-all duration-500 hover:shadow-[0_0_40px_rgba(229,9,20,0.2)]"
                      onClick={() => handleWatchTrailer(movie)}
                    >
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500" />

                      {/* Hover Info */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="space-y-2">
                          <span className="text-brand-gold font-bold text-[10px] uppercase tracking-widest">{movie.studio}</span>
                          <h3 className="text-xl font-bold text-white leading-tight">{movie.title}</h3>
                          <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                            <span className="text-xs text-gray-400 font-medium">{movie.genre}</span>
                            <div className="bg-brand-gold p-2 rounded-full">
                              <Play className="w-4 h-4 fill-white text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden lg:flex -left-6 bg-black/80 border-white/10 text-white hover:bg-brand-gold hover:border-brand-gold" />
              <CarouselNext className="hidden lg:flex -right-6 bg-black/80 border-white/10 text-white hover:bg-brand-gold hover:border-brand-gold" />
            </Carousel>
          ) : (
            <div className="text-center py-20 bg-zinc-950/20 rounded-[3rem] border border-white/5">
              <p className="text-gray-500 text-lg">No movies currently playing in cinemas.</p>
            </div>
          )}
        </section>

        {/* Coming Soon - Premium Grid */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic">Coming Soon</h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
            <p className="text-gray-500 max-w-xl mx-auto">Mark your calendars for the most anticipated releases coming to a theater near you.</p>
          </div>

          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {upcoming.slice(0, 3).map((movie) => (
                <div key={movie.id} className="group relative glass-dark rounded-3xl overflow-hidden p-3 transition-all duration-500 hover:border-white/20 hover:-translate-y-2 cursor-pointer" onClick={() => handleWatchTrailer(movie)}>
                  <div className="relative aspect-video rounded-2xl overflow-hidden">
                    <Image src={movie.poster} alt={movie.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end items-center p-8">
                      <div className="bg-brand-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 scale-50 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                        <Play className="w-8 h-8 fill-white text-white" />
                      </div>
                      Watch Trailer
                    </div>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      <Badge className="glass text-white border-white/20 px-3 py-1 text-[10px]">{movie.releaseDate}</Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-brand-gold transition-colors">{movie.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2 font-light">{movie.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{movie.studio}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-zinc-950/20 rounded-[3rem] border border-white/5">
              <p className="text-gray-500 text-lg">No upcoming movies scheduled at the moment.</p>
            </div>
          )}
        </section>

        {/* Theater Network - Distributor Focus */}
        <section className="relative py-24 rounded-[3rem] overflow-hidden">
          <div className="absolute inset-0 glass-dark -z-10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 blur-[120px] -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-12 lg:px-24">
            <div className="space-y-10">
              <div className="space-y-4">
                <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/10 px-4 py-1 uppercase tracking-widest text-[10px]">Distribution Network</Badge>
                <h2 className="text-5xl lg:text-6xl font-black text-white uppercase leading-tight">Covering every <br /> corner of Nepal</h2>
                <p className="text-gray-400 text-lg font-light leading-relaxed max-w-lg">
                  Neom Films ensures your production reaches every cinema lover from the Terai to the Mountains.
                </p>
              </div>

              {stats && (
                <div className="grid grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <div className="text-4xl font-black text-brand-gold italic">{stats.theater_count || "0"}+</div>
                    <p className="text-xs uppercase text-gray-500 font-bold tracking-widest">Partner Theaters</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-black text-brand-gold italic">{stats.screen_count || "0"}+</div>
                    <p className="text-xs uppercase text-gray-500 font-bold tracking-widest">Screens Nationwide</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-black text-brand-gold italic">{stats.cities_count || "0"}+</div>
                    <p className="text-xs uppercase text-gray-500 font-bold tracking-widest">Partner Cities</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {finalTheaters.length > 0 ? (
                finalTheaters.map((t, i) => (
                  <div key={i} className="glass p-6 rounded-2xl flex items-center justify-between group hover:border-brand-gold/50 transition-all">
                    <div className="flex items-center gap-5">
                      <div className="bg-brand-gold/10 p-3 rounded-xl">
                        <Building2 className="w-6 h-6 text-brand-gold" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg">{t.name}</h4>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 glass p-6 rounded-2xl">
                  <p className="text-gray-500 text-sm">No theater network registered.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Studio Partners Marquee */}
        {finalPartners.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 text-center space-y-16">
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.5em]">Representing Global Giants</h2>
              <div className="flex flex-wrap justify-center gap-x-20 gap-y-10 opacity-20 hover:opacity-100 transition-opacity duration-700">
                {finalPartners.map((p, i) => (
                  <span key={i} className="text-4xl md:text-6xl font-black tracking-tighter text-white italic hover:text-brand-gold cursor-default transition-colors">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>

      {/* Startup Popup Modal */}
      <TrailerModal
        isOpen={isStartupPopupOpen}
        onClose={handleCloseStartupPopup}
        trailerUrl={activePopup.videoUrl}
        movieTitle={activePopup.title}
        subtitle={activePopup.subtitle}
      />

      {/* Trailer Modal */}
      {selectedMovie && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          trailerUrl={selectedMovie.trailer}
          movieTitle={selectedMovie.title}
        />
      )}
    </div>
  );
}
