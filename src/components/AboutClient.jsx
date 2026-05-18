"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

export default function AboutClient({ initialData }) {
  const finalData = initialData || {};
  const about = finalData.about || null;

  if (!about) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-center p-8">
        <div className="space-y-6 max-w-md glass p-12 rounded-[3rem] border border-white/5 shadow-2xl">
          <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto border border-brand-gold/20">
            <Building2 className="w-8 h-8 text-brand-gold" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">About Neom Films</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Company information is currently being updated in our central database. Please visit our home or contact sections in the meantime.
          </p>
        </div>
      </div>
    );
  }

  const imageUrl = about.image.startsWith("http")
    ? about.image
    : `https://res.cloudinary.com/neomfilms/${about.image}`;

  const partners = (finalData.studios && finalData.studios.length > 0)
    ? finalData.studios.map(s => s.title)
    : [];

  const paragraphs = about.description ? about.description.split("\n").filter(p => p.trim() !== "") : [];

  return (
    <div className="pt-32 pb-24 space-y-32">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm">Our Legacy</h2>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.85]">
              Beyond the <br /> <span className="text-white shadow-xl italic">Screen</span>
            </h1>
          </div>

          {paragraphs.length > 0 ? (
            <div className="space-y-8 text-gray-400 text-lg font-light leading-relaxed max-w-xl border-l border-white/10 pl-8">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-lg font-light max-w-xl border-l border-white/10 pl-8 pl-8">No description available.</p>
          )}

          <div className="flex gap-4">
            <Button size="xl" className="bg-brand-gold text-white hover:bg-brand-gold/90 font-bold px-12 rounded-full">
              JOIN THE TEAM
            </Button>
          </div>
        </div>

        {about.image && (
          <div className="relative aspect-square rounded-[3rem] overflow-hidden group">
            <Image
              src={imageUrl}
              alt="Cinema"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          </div>
        )}
      </section>

      {/* Mission & Vision */}
      {(about.mission || about.vision) && (
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-white/5 skew-y-3 -z-10" />
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-24">
            {about.mission && (
              <div className="space-y-6">
                <h3 className="text-4xl font-black text-white uppercase italic">Our Mission</h3>
                <p className="text-gray-400 text-xl font-light leading-relaxed">
                  {about.mission}
                </p>
              </div>
            )}
            {about.vision && (
              <div className="space-y-6">
                <h3 className="text-4xl font-black text-white uppercase italic">Our Vision</h3>
                <p className="text-gray-400 text-xl font-light leading-relaxed">
                  {about.vision}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Studio Partners Marquee */}
      {partners.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.5em]">Representing Global Giants</h2>
            <div className="flex flex-wrap justify-center gap-x-20 gap-y-10 opacity-20 hover:opacity-100 transition-opacity duration-700">
              {partners.map((p, i) => (
                <span key={i} className="text-4xl md:text-6xl font-black tracking-tighter text-white italic hover:text-brand-gold cursor-default transition-colors">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team CTA */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="glass p-16 md:p-24 rounded-[4rem] text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/20 blur-[100px] -z-10" />
          <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Ready to work with us?</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">Whether you're looking for distribution partners or want to join our creative team, we're always open for a conversation.</p>
          <Button size="xl" className="bg-white text-black hover:bg-gray-200 font-bold rounded-full px-16 shadow-xl">
            GET IN TOUCH
          </Button>
        </div>
      </section>
    </div>
  );
}
