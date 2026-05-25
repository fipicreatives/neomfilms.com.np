"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Check } from "lucide-react";
import AboutRestContent from "@/components/AboutRestContent";

const WHAT_WE_DO = [
  "Film Production",
  "Bollywood Movie Distribution",
  "Hollywood Movie Distribution",
  "Nepali Film Distribution",
  "Cross-Nepal & Worldwide Distribution",
  "Movie Marketing & Promotions",
  "Cinema & Exhibitor Coordination",
  "Audience Outreach Campaigns",
  "Entertainment Content Promotion",
];

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

  const descriptionBlocks = about.description
    ? about.description.split(/\r\n\r\n/).map((p) => p.trim()).filter(Boolean)
    : [];
  const leadParagraphs = descriptionBlocks.slice(0, 2);
  const restParagraphs = descriptionBlocks.slice(2);

  return (
    <div className="pt-32 pb-24 space-y-32">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm">Our Legacy</h2>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.85]">
              Beyond the <br /> <span className="text-white shadow-xl italic">Screen</span>
            </h1>
          </div>

          {leadParagraphs.length > 0 ? (
            <div className="space-y-8 text-gray-400 text-lg font-light leading-relaxed max-w-xl border-l border-white/10 pl-8">
              {leadParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : descriptionBlocks.length === 0 ? (
            <p className="text-gray-400 text-lg font-light max-w-xl border-l border-white/10 pl-8">No description available.</p>
          ) : null}

          <div className="flex gap-4">
            <Button
              asChild
              className="h-auto bg-brand-gold text-white hover:bg-brand-gold/90 font-bold px-12 py-4 rounded-full"
            >
              <Link href="/contact?inquiry=Careers">JOIN THE TEAM</Link>
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

      {/* Mission, Vision & Commitment */}
      {(about.mission || about.vision) && (
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-white/5 skew-y-3 -z-10" />
          <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20 space-y-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
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

            <div className="space-y-6 text-center md:text-left">
              <h3 className="text-4xl font-black text-white uppercase italic">Our Commitment</h3>
              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed md:mx-0 mx-auto">
                At Neom Films, we believe cinema is more than entertainment — it is an experience that connects
                people, cultures, and emotions. Our commitment is to support the growth of the film industry
                through impactful storytelling, successful theatrical releases, and innovative promotional
                strategies that bring audiences closer to great cinema.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* About Us & What We Do */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20 space-y-24">
        <div className="space-y-10">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
            About Us
          </h2>
          <div className="space-y-8 text-gray-400 text-lg md:text-xl font-light leading-relaxed">
            <p>
              Neom Films Pvt Ltd is a Nepal-based film production and distribution company dedicated to
              delivering quality entertainment to audiences across Nepal and international markets. Driven by
              a passion for cinema and storytelling, the company works across film distribution, theatrical
              releases, promotions, and audience engagement for Bollywood, Hollywood, and Nepali films.
            </p>
            <p>
              From coordinating cinema releases to managing promotional campaigns, Neom Films collaborates
              closely with exhibitors, producers, and industry partners to create impactful cinematic
              experiences. The company focuses on expanding the reach of entertainment content through strong
              distribution networks, strategic marketing, and industry coordination.
            </p>
          </div>
        </div>

        <div className="space-y-12">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
            What We Do
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHAT_WE_DO.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 glass p-5 rounded-2xl border border-white/5 text-gray-300 font-medium"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {restParagraphs.length > 0 && <AboutRestContent blocks={restParagraphs} />}

      {/* Team */}
      {about.teams && about.teams.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm">Leadership</h2>
            <h3 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
              Our Team
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {[...about.teams]
              .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
              .map((member) => {
                const memberImageUrl = member.image
                  ? member.image.startsWith("http")
                    ? member.image
                    : `https://res.cloudinary.com/neomfilms/${member.image}`
                  : null;
                return (
                  <div
                    key={member.id}
                    className="group text-center space-y-6"
                  >
                    {memberImageUrl && (
                      <div className="relative aspect-square max-w-[280px] mx-auto rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-500 group-hover:border-brand-gold/30 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                        <Image
                          src={memberImageUrl}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      </div>
                    )}
                    <div className="space-y-1">
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter">
                        {member.name}
                      </h4>
                      <p className="text-brand-gold font-bold text-xs uppercase tracking-[0.2em]">
                        {member.job_title}
                      </p>
                    </div>
                  </div>
                );
              })}
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
          <Button
            asChild
            className="h-auto bg-white text-black hover:bg-gray-200 font-bold rounded-full px-16 py-4 shadow-xl"
          >
            <Link href="/contact?inquiry=Other">GET IN TOUCH</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
