import AboutClient from "@/components/AboutClient";

const fetchAboutData = async () => {
  if (!process.env.NEXT_PUBLIC_API_URL) return null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/about/`, {
      next: { revalidate: 60 * 60 * 24, tags: ["about", "globals"] }, // 24 hours
      cache: "force-cache",
    });
    if (!res.ok) throw new Error("API failed");
    return await res.json();
  } catch (e) {
    console.error("Failed to fetch about page server-side:", e);
    return null;
  }
};

export default async function Page() {
  const data = await fetchAboutData();
  return <AboutClient initialData={data} />;
}
