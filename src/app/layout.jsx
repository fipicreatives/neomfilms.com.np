import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Neom Films | Premier Movie Distribution in Nepal",
  description: "Neom Films Pvt. Ltd. is Nepal's leading movie distribution company, bringing global and local cinema to audiences across the nation.",
};

const fetchContact = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
    next: { revalidate: 60 * 60 * 24, tags: ['contact', 'globals'] }, // 1 day
    cache: "force-cache",
  });
  const data = await res.json();
  return data.contact;
};


export default async function RootLayout({ children }) {
  const contact = await fetchContact();
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-[#050505] text-white selection:bg-red-600/30 selection:text-white`}>
        <TooltipProvider>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer contact={contact} />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
