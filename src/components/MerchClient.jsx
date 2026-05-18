"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Maximize2, Tag } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";

export default function MerchClient({ initialData }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const finalData = initialData || {};

  const formatMerchItem = (item) => {
    const imageUrl = item.image.startsWith("http")
      ? item.image
      : `https://res.cloudinary.com/neomfilms/${item.image}`;
    return {
      id: item.id?.toString(),
      movie: item.movie,
      title: item.title,
      price: item.price,
      image: imageUrl
    };
  };

  const merchandise = (finalData.results && finalData.results.length > 0)
    ? finalData.results.map(formatMerchItem)
    : [];

  return (
    <div className="pt-40 pb-24 px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-16">
      <div className="space-y-6">
        <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm">Official Collection</h2>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
          Merchandise <span className="italic text-white">Showcase</span>
        </h1>
        <p className="text-gray-400 text-xl font-light leading-relaxed max-w-2xl">
          High-quality movie memorabilia and exclusive bundles. Available at our partner cinema outlets across Nepal.
        </p>
      </div>

      {merchandise.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {merchandise.map((item) => (
            <div key={item.id} className="relative group overflow-hidden rounded-[2.5rem] break-inside-avoid border border-white/5 bg-zinc-950/20">
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={800}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Immersive Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 text-brand-gold font-bold text-[10px] uppercase tracking-[0.2em]">
                     <Tag className="w-3 h-3" /> {item.movie}
                  </div>
                  <div className="space-y-1">
                     <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{item.title}</h3>
                     <p className="text-white/60 text-lg font-black italic">{item.price || "N/A"}</p>
                  </div>
                  <div className="flex gap-3 pt-2">
                     <Link 
                        href={`/contact?inquiry=Merchandise&item=${encodeURIComponent(item.title)}&price=${encodeURIComponent(item.price || "N/A")}`}
                        className="inline-flex items-center justify-center bg-white text-black hover:bg-brand-gold hover:text-white font-bold rounded-full px-6 transition-all text-xs py-3 tracking-widest uppercase cursor-pointer"
                     >
                        ENQUIRE NOW
                     </Link>
                     <button 
                        onClick={() => setSelectedPhoto(item)}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/20 text-white transition-all cursor-pointer"
                     >
                        <Maximize2 className="w-5 h-5" />
                     </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-950/20 rounded-[3rem] border border-white/5">
          <p className="text-gray-500 text-lg">No official merchandise catalog items found.</p>
        </div>
      )}

      {/* Note for Distributors */}
      <section className="glass p-12 lg:p-20 rounded-[4rem] text-center space-y-8 max-w-5xl mx-auto">
         <h2 className="text-3xl font-black text-white uppercase tracking-tight">Bulk Orders & Cinema Partnerships</h2>
         <p className="text-gray-400 text-lg font-light leading-relaxed">
            Are you a theater owner or retail partner? We offer exclusive wholesale pricing for movie merchandise bundles. Contact our distribution team for catalog and pricing details.
         </p>
         <Link 
            href="/contact?inquiry=Theater%20Partnership"
            className="inline-flex items-center justify-center bg-brand-gold text-white hover:bg-brand-gold/90 font-bold px-12 py-5 rounded-full text-sm tracking-widest uppercase shadow-[0_20px_40px_rgba(212,175,55,0.2)] transition-all"
         >
            CONTACT DISTRIBUTION TEAM
         </Link>
      </section>

      {/* Photo Lightbox Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] md:max-w-[50vw] w-full p-0 bg-black/95 border-zinc-800 overflow-hidden rounded-3xl flex flex-col items-center justify-center">
          <DialogHeader className="p-6 w-full bg-zinc-900/50 backdrop-blur-md border-b border-white/5 flex flex-row items-center justify-between">
            <div>
              <DialogTitle className="text-white font-bold text-xl uppercase tracking-tighter">
                {selectedPhoto?.title}
              </DialogTitle>
              <div className="flex gap-2 items-center mt-1">
                <span className="text-brand-gold font-bold text-[10px] uppercase tracking-widest">
                  {selectedPhoto?.movie}
                </span>
                <span className="text-white/40 text-[10px]">•</span>
                <span className="text-white/60 font-bold text-[10px] uppercase tracking-widest">
                  {selectedPhoto?.price || "N/A"}
                </span>
              </div>
            </div>
          </DialogHeader>
          <div className="relative w-full flex-grow flex items-center justify-center p-6">
            {selectedPhoto && (
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[60vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            )}
          </div>
          <div className="p-6 border-t border-white/5 w-full bg-zinc-950 flex justify-end">
            <Link 
              href={`/contact?inquiry=Merchandise&item=${encodeURIComponent(selectedPhoto?.title || "")}&price=${encodeURIComponent(selectedPhoto?.price || "N/A")}`}
              onClick={() => setSelectedPhoto(null)}
              className="inline-flex items-center justify-center bg-brand-gold text-white hover:bg-brand-gold/90 font-bold rounded-full px-8 py-3.5 transition-all text-xs tracking-widest uppercase cursor-pointer"
            >
              ENQUIRE ABOUT THIS ITEM
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
