"use client";

import { MapPin, Building2, ScreenShare, ShieldCheck, Globe2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NetworkClient({ initialData }) {
  const finalData = initialData || {};
  const statsData = finalData.stats || null;

  const finalTheaters = (finalData.theatre && finalData.theatre.length > 0)
    ? finalData.theatre.map(t => ({ name: t.title }))
    : [];

  const stats = statsData ? [
    { label: "Partner Theaters", value: `${statsData.theater_count || "0"}+`, icon: Building2 },
    { label: "Digital Screens", value: `${statsData.screen_count || "0"}+`, icon: ScreenShare },
    { label: "Major Cities", value: `${statsData.cities_count || "0"}+`, icon: MapPin },
    { label: "Years of Trust", value: `${statsData.years_count || "0"}+`, icon: ShieldCheck },
  ] : [];

  return (
    <div className="pt-32 pb-24 px-4 md:px-12 lg:px-24 space-y-32">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm">Distribution Network</h2>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9]">
              The Power of <br /> <span className="text-white shadow-xl">Reach</span>
            </h1>
            <p className="text-gray-400 text-xl font-light leading-relaxed max-w-lg">
              Neom Films operates the most sophisticated and reliable cinema distribution network in Nepal, reaching every major hub and city.
            </p>
          </div>
          <Button size="xl" className="bg-brand-gold text-white hover:bg-brand-gold/90 font-bold rounded-full px-12">
            PARTNER WITH US
          </Button>
        </div>

        {stats.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
             {stats.map((s, i) => (
               <div key={i} className="glass p-8 rounded-[2rem] space-y-4 border-white/5 hover:border-brand-gold/30 transition-all group">
                  <div className="bg-brand-gold/10 w-12 h-12 flex items-center justify-center rounded-2xl group-hover:bg-brand-gold group-hover:text-white transition-all text-brand-gold">
                     <s.icon className="w-6 h-6" />
                  </div>
                  <div>
                     <div className="text-4xl font-black text-white italic">{s.value}</div>
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{s.label}</p>
                  </div>
               </div>
             ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-950/20 rounded-[2rem] border border-white/5 flex items-center justify-center min-h-[300px]">
            <p className="text-gray-500">No stats recorded currently.</p>
          </div>
        )}
      </section>

      {/* Theater List */}
      <section className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-white uppercase">Our Cinema Partners</h2>
          <p className="text-gray-500">Connecting your stories with audiences across these premium locations.</p>
        </div>

        {finalTheaters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {finalTheaters.map((t, i) => (
                <div key={i} className="glass-dark p-8 rounded-3xl border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="bg-white/5 p-3 rounded-xl group-hover:bg-brand-gold transition-colors">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white uppercase tracking-tight">{t.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-950/20 rounded-[3rem] border border-white/5">
            <p className="text-gray-500 text-lg">No partner theaters currently registered in our distribution network.</p>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto glass p-12 lg:p-24 rounded-[4rem] text-center space-y-16">
         <div className="space-y-4">
            <h2 className="text-4xl font-black text-white uppercase tracking-tight">The Neom Advantage</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">We provide end-to-end distribution services tailored for both global blockbusters and local masterpieces.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: "Strategic Marketing", icon: Globe2, desc: "Bespoke marketing campaigns designed to create massive pre-release hype." },
              { title: "Digital Master", icon: ScreenShare, desc: "Secure digital delivery and high-end DCP mastering for every screen." },
              { title: "Box Office Tracking", icon: Trophy, desc: "Real-time revenue tracking and transparent reporting for all stakeholders." }
            ].map((item, i) => (
              <div key={i} className="space-y-6">
                 <div className="bg-brand-gold/10 w-20 h-20 flex items-center justify-center rounded-3xl mx-auto text-brand-gold">
                    <item.icon className="w-10 h-10" />
                  </div>
                 <div className="space-y-3">
                    <h4 className="text-2xl font-bold text-white uppercase tracking-tighter">{item.title}</h4>
                    <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
