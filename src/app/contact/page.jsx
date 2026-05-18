import { Suspense } from "react";
import ContactClient from "@/components/ContactClient";

const fetchContactData = async () => {
  if (!process.env.NEXT_PUBLIC_API_URL) return null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/contact/`, {
      next: { revalidate: 60 * 60 * 24, tags: ["contact", "globals"] }, // 1 day
      cache: "force-cache",
    });
    if (!res.ok) throw new Error("API failed");
    const data = await res.json();
    return data.contact;
  } catch (e) {
    console.error("Failed to fetch contact server-side:", e);
    return null;
  }
};

export default async function Page() {
  const contactData = await fetchContactData();
  return (
    <Suspense fallback={
      <div className="pt-40 pb-24 text-center text-white">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-zinc-800 rounded-full mx-auto" />
          <div className="h-4 w-64 bg-zinc-800 rounded-full mx-auto" />
        </div>
      </div>
    }>
      <ContactClient initialData={contactData} />
    </Suspense>
  );
}
