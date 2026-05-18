"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Calendar, Star, Building2 } from "lucide-react";
import { TrailerModal } from "@/components/TrailerModal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

export default function MoviesClient({ initialData }) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Now Playing", "Coming Soon", "Archive"];

  const finalData = initialData || {};

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
      studio: m.studio_name || (m.studio ? `Studio ${m.studio}` : "Unknown")
    };
  };

  const movies = (finalData.results && finalData.results.length > 0)
    ? finalData.results.map(formatMovie)
    : [];

  const filteredMovies = movies.filter(m => {
    return activeFilter === "All" || m.status === activeFilter;
  });

  const handleWatchTrailer = (movie) => {
    setSelectedMovie(movie);
    setIsTrailerOpen(true);
  };

  return (
    <div className="pt-40 pb-24 px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-16">
      {/* Page Header */}
      <div className="flex flex-col justify-between items-start">
        <div className="space-y-4">
          <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm">Our Library</h2>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
            Movie <span className="text-white shadow-xl italic">Portfolio</span>
          </h1>
        </div>

        {/* Category Filters on the Right Side */}
        <div className="flex flex-wrap gap-3 mt-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer",
                activeFilter === f
                  ? "bg-brand-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] border border-brand-gold"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="group space-y-6">
              <div
                className="relative aspect-[2/3] overflow-hidden rounded-[2rem] cursor-pointer shadow-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(229,9,20,0.2)] hover:-translate-y-2 border border-white/5"
                onClick={() => handleWatchTrailer(movie)}
              >
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Overlay Tags */}
                <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                  <Badge className={cn(
                    "px-3 py-1 text-[9px] font-bold uppercase tracking-widest border-none",
                    movie.status === "Now Playing" ? "bg-green-600 text-white" :
                      movie.status === "Coming Soon" ? "bg-brand-gold text-white" : "bg-gray-600 text-white"
                  )}>
                    {movie.status}
                  </Badge>
                  <div className="glass px-2 py-1 rounded-lg flex items-center gap-1.5 backdrop-blur-md border-white/10">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-bold text-white">{movie.rating}</span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end items-center p-8">
                  <div className="bg-brand-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 scale-50 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                    <Play className="w-8 h-8 fill-white text-white" />
                  </div>
                  Watch Trailer
                </div>
              </div>

              <div className="space-y-3 px-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">
                  <Building2 className="w-3 h-3" /> {movie.studio}
                </div>
                <h3 className="text-2xl font-black text-white group-hover:text-brand-gold transition-colors truncate tracking-tighter uppercase leading-none">
                  {movie.title}
                </h3>
                <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                  <span className="truncate max-w-[150px]">{movie.genre}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {movie.releaseDate ? movie.releaseDate.split('-')[0] : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-40 glass rounded-[3rem] space-y-4">
          <h3 className="text-2xl font-bold text-gray-500">No movies found.</h3>
        </div>
      )}

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
