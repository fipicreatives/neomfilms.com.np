import Image from "next/image";
import Link from "next/link";

export function Footer({ contact }) {
  console.log("contact", contact);
  return (
    <footer className="bg-black text-gray-400 py-16 px-4 md:px-12 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <div className="flex flex-col gap-6 items-center justify-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-10 w-40">
              <Image
                src="/neoms logo.png"
                alt="Neom Films"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            The premier gateway for international cinema in Nepal. Empowering filmmakers and entertaining audiences since 2010.
          </p>
          <div className="flex gap-5 mt-2 text-gray-400">
            <a
              href={contact?.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-gold transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
              </svg>
            </a>
            <a
              href={contact?.instagram_link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-gold transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
              </svg>
            </a>
            <a
              href={contact?.tiktok_link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-gold transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="TikTok"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,72a48.05,48.05,0,0,1-48-48,8,8,0,0,0-8-8H128a8,8,0,0,0-8,8V156a20,20,0,1,1-28.57-18.08A8,8,0,0,0,96,130.69V88a8,8,0,0,0-9.4-7.88C50.91,86.48,24,119.1,24,156a76,76,0,0,0,152,0V116.29A103.25,103.25,0,0,0,224,128a8,8,0,0,0,8-8V80A8,8,0,0,0,224,72Zm-8,39.64a87.19,87.19,0,0,1-43.33-16.15A8,8,0,0,0,160,102v54a60,60,0,0,1-120,0c0-25.9,16.64-49.13,40-57.6v27.67A36,36,0,1,0,136,156V32h24.5A64.14,64.14,0,0,0,216,87.5Z"></path>
              </svg>
            </a>
            <a
              href={contact?.youtube_link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-gold transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="YouTube"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M164.44,121.34l-48-32A8,8,0,0,0,104,96v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,145.05V111l25.58,17ZM234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-15.49,113a8,8,0,0,1-4.77,5.49c-31.65,12.22-85.48,12-86,12H128c-.54,0-54.33.2-86-12a8,8,0,0,1-4.77-5.49C34.8,173.39,32,156.57,32,128s2.8-45.39,5.16-54.47A8,8,0,0,1,41.93,68c30.52-11.79,81.66-12,85.85-12h.27c.54,0,54.38-.18,86,12a8,8,0,0,1,4.77,5.49C221.2,82.61,224,99.43,224,128S221.2,173.39,218.84,182.47Z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center justify-center">
          <h3 className="text-white font-bold italic uppercase tracking-widest text-xs">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-sm text-center items-center">
            <li><Link href="/movies" className="hover:text-brand-gold transition-colors">Distribution Portfolio</Link></li>
            <li><Link href="/gallery" className="hover:text-brand-gold transition-colors">Movie Gallery</Link></li>
            <li><Link href="/merch" className="hover:text-brand-gold transition-colors">Official Merchandise</Link></li>
            <li><Link href="/network" className="hover:text-brand-gold transition-colors">Partner Network</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-6 items-center justify-center">
          <h3 className="text-white font-bold italic uppercase tracking-widest text-xs">Company</h3>
          <ul className="flex flex-col gap-3 text-sm text-center items-center">
            <li><Link href="/about" className="hover:text-brand-gold transition-colors">About Neom</Link></li>
            <li><Link href="/network" className="hover:text-brand-gold transition-colors">Cinema Partners</Link></li>
            <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Distribution Inquiry</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>
          © {new Date().getFullYear()} Neom Films Pvt. Ltd. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          <Link href="/cookie" className="hover:text-white">Cookie Settings</Link>
        </div>
      </div>
      <br />
      <div className="flex justify-center text-sm">
        Designed & Developed by
        <a
          href="https://fipicreatives.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-gold hover:underline font-semibold transition-all ml-1"
        >
          FiPi Creatives
        </a>
      </div>
    </footer>
  );
}
