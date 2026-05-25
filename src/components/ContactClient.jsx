"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";

export default function ContactClient({ initialData }) {
  const searchParams = useSearchParams();
  const inquiryParam = searchParams.get("inquiry") || "";
  const itemParam = searchParams.get("item") || "";
  const priceParam = searchParams.get("price") || "";

  const finalData = initialData || {};
  const wa_number = finalData.wa_number || "9779849072850";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: "Movie Distribution",
    message: ""
  });

  useEffect(() => {
    let finalInquiry = "Movie Distribution";
    const inquiryLower = inquiryParam.toLowerCase();

    if (inquiryParam) {
      if (inquiryLower.includes("merchandise")) {
        finalInquiry = "Merchandise";
      } else if (inquiryLower.includes("theater") || inquiryLower.includes("partner")) {
        finalInquiry = "Theater Partnership";
      } else if (inquiryLower.includes("marketing") || inquiryLower.includes("press")) {
        finalInquiry = "Marketing & Press";
      } else if (inquiryLower.includes("career") || inquiryLower.includes("team")) {
        finalInquiry = "Careers";
      } else if (inquiryLower.includes("distribution") || inquiryLower.includes("movie")) {
        finalInquiry = "Movie Distribution";
      } else {
        finalInquiry = "Other";
      }
    }

    let defaultMessage = "";
    if (itemParam) {
      defaultMessage = `Hi, I am interested in inquiring about the "${itemParam}"${priceParam ? ` (${priceParam})` : ""}. Please let me know how I can purchase or order this merchandise item.`;
    } else if (finalInquiry === "Careers") {
      defaultMessage =
        "Hi, I am interested in career opportunities at Neom Films. Please let me know about any open positions.";
    } else if (finalInquiry === "Theater Partnership") {
      defaultMessage =
        "Hi, I am interested in partnering with Neom Films as a cinema or distribution partner. Please share the next steps.";
    }

    setFormData((prev) => ({
      ...prev,
      inquiry: finalInquiry,
      message: defaultMessage || prev.message,
    }));
  }, [inquiryParam, itemParam, priceParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedMessage = `*New Inquiry via Neom Films Website*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Inquiry Type:* ${formData.inquiry}\n\n` +
      `*Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/${wa_number}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  const getFilteredDetails = (primary, secondary) => {
    const details = [];
    if (primary && primary !== "N/A" && primary !== "") details.push(primary);
    if (secondary && secondary !== "N/A" && secondary !== "") details.push(secondary);
    return details;
  };

  const contactInfo = [
    {
      title: "Direct Email",
      details: getFilteredDetails(finalData.primary_email, finalData.secondary_email),
      icon: Mail
    },
    {
      title: "Phone Lines",
      details: getFilteredDetails(finalData.primary_phone, finalData.secondary_phone),
      icon: Phone
    },
    {
      title: "Main Office",
      details: getFilteredDetails(finalData.location_primary, finalData.location_secondary),
      icon: MapPin
    },
    {
      title: "Working Hours",
      details: getFilteredDetails(finalData.working_primary, finalData.working_secondary),
      icon: Clock
    }
  ].filter(item => item.details.length > 0);

  const getMapEmbedUrl = (url) => {
    if (!url) return "";
    let parsedUrl = url.trim();

    // If it is a full iframe HTML tag, extract the src URL attribute
    if (parsedUrl.includes("<iframe")) {
      const srcMatch = parsedUrl.match(/src=["']([^"']+)["']/i);
      if (srcMatch && srcMatch[1]) {
        parsedUrl = srcMatch[1];
      }
    }
    
    if (parsedUrl.includes("embed") || parsedUrl.includes("output=embed")) {
      return parsedUrl;
    }
    
    // If it is the specific shortened link, return direct embed coordinates for Neom Films Durbar Marg office
    if (parsedUrl.includes("NQ4pDREMrXbfW5628") || parsedUrl.includes("maps.app.goo.gl")) {
      return "https://maps.google.com/maps?q=27.7103145,85.3221634&t=&z=16&ie=UTF8&iwloc=&output=embed";
    }

    const coordMatch = parsedUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch && coordMatch[1] && coordMatch[2]) {
      return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    }

    const placeMatch = parsedUrl.match(/\/place\/([^\/]+)/);
    if (placeMatch && placeMatch[1]) {
      return `https://maps.google.com/maps?q=${placeMatch[1]}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    }

    return `https://maps.google.com/maps?q=Kathmandu+44600&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  };

  const mapEmbedUrl = finalData.maps_link && finalData.maps_link !== "N/A"
    ? getMapEmbedUrl(finalData.maps_link)
    : "https://maps.google.com/maps?q=27.7103145,85.3221634&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="pt-40 pb-24 px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-16">
      {/* Header */}
      <div className="max-w-4xl space-y-6">
        <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm">Contact Us</h2>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.85]">
          Let's Start a <br /> <span className="text-white shadow-xl italic">Conversation</span>
        </h1>
        <p className="text-gray-400 text-xl font-light leading-relaxed max-w-2xl">
          Whether you're looking for distribution partnership, theater integration, or have a press inquiry, our team is ready to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Info Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {contactInfo.length > 0 ? (
            contactInfo.map((item, i) => (
              <div key={i} className="glass p-8 rounded-[2rem] border-white/5 hover:border-brand-gold/30 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="bg-brand-gold/10 p-4 rounded-2xl text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white font-bold text-lg uppercase tracking-tight">{item.title}</h3>
                    {item.details.map((d, idx) => (
                      <p key={idx} className="text-gray-500 text-sm font-medium">{d}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="glass p-8 rounded-[2rem] border-white/5 text-center text-gray-500 text-sm">
              No general contact parameters loaded. Please use the WhatsApp chat form on the right.
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="lg:col-span-2 glass-dark p-8 md:p-16 rounded-[3rem] border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 blur-[100px] -z-10" />

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">Full Name</label>
                <Input
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-white h-16 rounded-2xl px-6 focus:ring-brand-gold focus:border-brand-gold"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">Email Address</label>
                <Input
                  required
                  type="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/10 text-white h-16 rounded-2xl px-6 focus:ring-brand-gold focus:border-brand-gold"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">Inquiry Type</label>
              <select
                value={formData.inquiry}
                onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                className="w-full bg-[#121212] border border-white/10 text-gray-400 h-16 rounded-2xl px-6 focus:ring-2 focus:ring-brand-gold outline-none appearance-none"
              >
                <option value="Movie Distribution">Movie Distribution</option>
                <option value="Theater Partnership">Theater Partnership</option>
                <option value="Marketing & Press">Marketing & Press</option>
                <option value="Careers">Careers</option>
                <option value="Merchandise">Merchandise Inquiry</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">Your Message</label>
              <Textarea
                required
                placeholder="How can we help your project succeed?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white/5 border-white/10 text-white min-h-[200px] rounded-[2rem] p-8 focus:ring-brand-gold focus:border-brand-gold"
              />
            </div>

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-8 rounded-[2rem] text-sm uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(16,185,129,0.2)] group transition-all flex items-center justify-center border border-emerald-500/20">
              <MessageCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" /> CHAT ON WHATSAPP
            </Button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      {mapEmbedUrl && (
        <div className="w-full h-[500px] rounded-3xl overflow-hidden grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 shadow-2xl border border-white/5">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      )}
    </div>
  );
}
