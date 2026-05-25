import NewsClient from "@/components/NewsClient";
import { fetchPaginated } from "@/lib/fetch-paginated";

export default async function Page() {
  const data = await fetchPaginated("/news/", { tags: ["news", "globals"] });
  return <NewsClient initialData={data} />;
}
