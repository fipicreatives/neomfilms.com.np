import GalleryClient from "@/components/GalleryClient";
import { fetchPaginated } from "@/lib/fetch-paginated";

export default async function Page() {
  const data = await fetchPaginated("/gallery/", { tags: ["gallery", "globals"] });
  return <GalleryClient initialData={data} />;
}
