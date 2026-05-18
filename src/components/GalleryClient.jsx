"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Maximize2, Play, Grid, Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrailerModal } from "@/components/TrailerModal";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";

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

export default function GalleryClient({ initialData }) {
  const [mediaType, setMediaType] = useState("All"); // "All", "Photos", "Videos"
  const [category, setCategory] = useState("All"); // "All", "Behind the Scenes", "Cast", "Events"
  
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const categories = ["All", "Behind the Scenes", "Cast", "Events"];
  const mediaTypes = [
    { name: "All", label: "All Media", icon: Grid },
    { name: "Photos", label: "Photos", icon: Camera },
    { name: "Videos", label: "Videos", icon: Film }
  ];

  const finalData = initialData || {};

  const formatGalleryItem = (item) => {
    const imageUrl = item.image.startsWith("http")
      ? item.image
      : `https://res.cloudinary.com/neomfilms/${item.image}`;
    return {
      id: item.id?.toString(),
      type: item.type, // "photo" or "video"
      category: item.category,
      title: item.title,
      image: imageUrl,
      videoUrl: item.video_url ? getEmbedUrl(item.video_url) : ""
    };
  };

  const gallery = (finalData.results && finalData.results.length > 0)
    ? finalData.results.map(formatGalleryItem)
    : [];

  const filteredGallery = gallery.filter(item => {
    const matchesMediaType = 
      mediaType === "All" || 
      (mediaType === "Photos" && item.type === "photo") ||
      (mediaType === "Videos" && item.type === "video");
      
    const matchesCategory = 
      category === "All" || item.category === category;
      
    return matchesMediaType && matchesCategory;
  });

  const handleItemClick = (item) => {
    if (item.type === "video") {
      setSelectedVideo(item);
    } else {
      setSelectedPhoto(item);
    }
  };

  return (
    <div className="pt-40 pb-24 px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-16">
      {/* Title Header with RTL Main Filter */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 pb-6 border-b border-white/5">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm">Visual Storytelling</h2>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
            Movie <span className="italic text-white">Gallery</span>
          </h1>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Explore captured frames, exclusive behind-the-scenes moments, and official highlight reels from Neom Films.
          </p>
        </div>

        {/* All, Photo & Video Filter on the Right Side (RTL alignment) */}
        {gallery.length > 0 && (
          <div className="flex gap-2 shrink-0">
            {mediaTypes.map((t) => {
              const Icon = t.icon;
              const isActive = mediaType === t.name;
              return (
                <button
                  key={t.name}
                  onClick={() => setMediaType(t.name)}
                  className={cn(
                    "flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer border",
                    isActive
                      ? "bg-brand-gold text-black border-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Category Selection under the Header */}
      {gallery.length > 0 && (
        <div className="flex flex-wrap gap-2.5 pt-2">
          {categories.map((c) => {
            const isActive = category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border",
                  isActive
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border-white/5"
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid Display */}
      {filteredGallery.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredGallery.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleItemClick(item)}
              className="relative group overflow-hidden rounded-3xl break-inside-avoid cursor-pointer border border-white/5 transition-all duration-500 hover:border-brand-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
            >
              {/* Thumbnail Image */}
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay with Type Icon / Label */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-brand-gold font-bold text-[10px] uppercase tracking-widest bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20">
                      {item.category}
                    </span>
                    <span className="text-white/60 font-bold text-[10px] uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight uppercase tracking-tighter">{item.title}</h3>
                </div>
                <div className="absolute top-6 right-6">
                   <div className="bg-brand-gold/20 backdrop-blur-md p-3 rounded-full border border-brand-gold/30 text-brand-gold group-hover:scale-110 transition-transform">
                      {item.type === "video" ? (
                        <Play className="w-5 h-5 fill-brand-gold" />
                      ) : (
                        <Maximize2 className="w-5 h-5" />
                      )}
                   </div>
                </div>
              </div>

              {/* Visual Indicator for video on default view */}
              {item.type === "video" && (
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 group-hover:opacity-0 transition-opacity duration-300">
                  <Play className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase">Video</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-950/20 rounded-[3rem] border border-white/5">
          <p className="text-gray-500 text-lg">No gallery media discovered.</p>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] md:max-w-[75vw] w-full p-0 bg-black/95 border-zinc-800 overflow-hidden rounded-3xl flex flex-col items-center justify-center">
          <DialogHeader className="p-6 w-full bg-zinc-900/50 backdrop-blur-md border-b border-white/5 flex flex-row items-center justify-between">
            <div>
              <DialogTitle className="text-white font-bold text-xl uppercase tracking-tighter">
                {selectedPhoto?.title}
              </DialogTitle>
              <span className="text-brand-gold font-bold text-[10px] uppercase tracking-widest">
                {selectedPhoto?.category} • Photo Frame
              </span>
            </div>
          </DialogHeader>
          <div className="relative w-full flex-grow flex items-center justify-center p-4">
            {selectedPhoto && (
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Modal using TrailerModal component */}
      {selectedVideo && (
        <TrailerModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          trailerUrl={selectedVideo.videoUrl}
          movieTitle={selectedVideo.title}
        />
      )}
    </div>
  );
}
