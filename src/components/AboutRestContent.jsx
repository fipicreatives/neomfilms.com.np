"use client";

import { Check } from "lucide-react";
import { parseRestDescriptionBlocks } from "@/lib/parse-about-description";

export default function AboutRestContent({ blocks }) {
  const segments = parseRestDescriptionBlocks(blocks);

  if (segments.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20">
      <div className="space-y-12">
        {segments.map((segment, i) => {
          if (segment.type === "title") {
            return (
              <h3
                key={i}
                className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter italic pt-4 first:pt-0"
              >
                {segment.text}
              </h3>
            );
          }

          if (segment.type === "list") {
            return (
              <ul key={i} className="space-y-3">
                {segment.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-400 text-lg md:text-xl font-light leading-relaxed"
                  >
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <p key={i} className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
              {segment.text}
            </p>
          );
        })}
      </div>
    </section>
  );
}
