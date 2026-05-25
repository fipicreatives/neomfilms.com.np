"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "Network", href: "/network" },
    { name: "Gallery", href: "/gallery" },
    { name: "Merch", href: "/merch" },
    { name: "News", href: "/news" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-12 py-5",
        isScrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl" : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
      )}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-12 w-48 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/neoms logo.png"
              alt="Neom Films"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-brand-gold transition-all hover:scale-105 active:scale-95"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Trigger & Sheet */}
        <div className="flex lg:hidden items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className="text-gray-300 hover:text-brand-gold transition-colors focus:outline-none p-2 rounded-md hover:bg-white/5 active:scale-95 cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-6.5 h-6.5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-[#050505]/95 backdrop-blur-2xl border-r border-white/10 w-[300px] flex flex-col p-6 text-foreground"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <div className="relative h-10 w-36">
                    <Image
                      src="/neoms logo.png"
                      alt="Neom Films"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-bold tracking-wider text-gray-300 hover:text-brand-gold transition-colors uppercase border-b border-white/[0.03] pb-2 active:scale-95"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
