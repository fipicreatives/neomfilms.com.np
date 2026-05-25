"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Newspaper, Calendar } from "lucide-react";
import { ListPagination } from "@/components/ListPagination";
import { useClientPagination } from "@/hooks/use-client-pagination";

const formatImageUrl = (image) => {
  if (!image) return "";
  return image.startsWith("http")
    ? image
    : `https://res.cloudinary.com/neomfilms/${image}`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
};

export default function NewsClient({ initialData }) {
  const finalData = initialData || {};

  const formatNewsItem = (item) => {
    const paragraphs = (item.description || item.content || "")
      .split(/\r?\n/)
      .filter((p) => p.trim() !== "");

    return {
      id: item.id?.toString(),
      title: item.title,
      description: item.description || item.content || "",
      excerpt: paragraphs[0] || "",
      image: formatImageUrl(item.image),
      date: formatDate(item.published_date || item.created_at || item.date),
    };
  };

  const newsItems = useMemo(() => {
    if (finalData.results && finalData.results.length > 0) {
      return finalData.results.map(formatNewsItem);
    }
    if (Array.isArray(finalData.news)) {
      return finalData.news.map(formatNewsItem);
    }
    return [];
  }, [finalData.results, finalData.news]);

  const { page, totalPages, paginatedItems, setPage } = useClientPagination(newsItems, 9);

  return (
    <div className="pt-40 pb-24 px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-16">
      <div className="space-y-6 pb-6 border-b border-white/5">
        <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm">Latest Updates</h2>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
          Industry <span className="italic text-white">News</span>
        </h1>
        <p className="text-gray-400 text-xl font-light leading-relaxed max-w-2xl">
          Announcements, premieres, and distribution updates from Neom Films across Nepal and beyond.
        </p>
      </div>

      {paginatedItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {paginatedItems.map((item) => (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-950/20 transition-all duration-500 hover:border-brand-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
              >
                {item.image && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                )}

                <div className="p-8 space-y-4">
                  {item.date && (
                    <div className="flex items-center gap-2 text-brand-gold font-bold text-[10px] uppercase tracking-[0.2em]">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight group-hover:text-brand-gold transition-colors">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-4">
                      {item.excerpt}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
          <ListPagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      ) : (
        <div className="text-center py-20 bg-zinc-950/20 rounded-[3rem] border border-white/5 space-y-4">
          <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto border border-brand-gold/20">
            <Newspaper className="w-8 h-8 text-brand-gold" />
          </div>
          <p className="text-gray-500 text-lg">No news articles available at the moment.</p>
        </div>
      )}
    </div>
  );
}
