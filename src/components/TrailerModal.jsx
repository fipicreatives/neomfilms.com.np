"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function TrailerModal({ isOpen, onClose, trailerUrl, movieTitle, subtitle = "Official Trailer" }) {
  // Append autoplay parameter if not present
  const embedUrl = trailerUrl.includes("?")
    ? `${trailerUrl}&autoplay=1`
    : `${trailerUrl}?autoplay=1`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[80vw] md:max-w-[80vw] w-full p-0 bg-black border-zinc-800 overflow-hidden rounded-3xl">
        <DialogHeader className="p-6 bg-zinc-900/50 backdrop-blur-md border-b border-white/5">
          <DialogTitle className="text-white font-bold text-xl uppercase tracking-tighter">
            {movieTitle} <span className="text-brand-gold ml-2">{subtitle}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            title={`${movieTitle} Trailer`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
