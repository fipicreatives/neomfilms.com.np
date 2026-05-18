import HomeClient from "@/components/HomeClient";

const fetchHomeData = async () => {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    return null;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/`, {
      next: { revalidate: 60 * 60 * 24, tags: ["home", "globals"] }, // Cache for 24 hours
      cache: "force-cache",
    });
    if (!res.ok) {
      throw new Error(`API failed with status ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch home page data server-side:", error);
    return null;
  }
};

const fetchPopupData = async () => {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    return null;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/popup/`, {
      next: { revalidate: 60 * 60 * 24, tags: ["popup", "globals"] }, // Cache for 24 hours
      cache: "force-cache",
    });
    if (!res.ok) {
      throw new Error(`API failed with status ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch popup data server-side:", error);
    return null;
  }
};

export default async function Page() {
  const [data, popupData] = await Promise.all([fetchHomeData(), fetchPopupData()]);
  return <HomeClient initialData={data} initialPopupData={popupData} />;
}
