import MerchClient from "@/components/MerchClient";
import { fetchPaginated } from "@/lib/fetch-paginated";

export default async function Page() {
  const data = await fetchPaginated("/merch/", { tags: ["merch", "globals"] });
  return <MerchClient initialData={data} />;
}
