/**
 * Fetches all pages from a DRF paginated list endpoint (follows `next` until exhausted).
 */
export async function fetchPaginated(endpoint, { tags = [], revalidate = 60 * 60 * 24 } = {}) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!apiBase) return null;

  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  let url = `${apiBase}${path}`;
  const allResults = [];
  let count = 0;

  const fetchOptions = {
    next: { revalidate, tags },
    cache: "force-cache",
  };

  try {
    while (url) {
      const res = await fetch(url, fetchOptions);
      if (!res.ok) throw new Error(`API failed with status ${res.status}`);
      const data = await res.json();
      count = data.count ?? count;
      if (Array.isArray(data.results)) {
        allResults.push(...data.results);
      }
      url = data.next || null;
    }

    return {
      count: count || allResults.length,
      next: null,
      previous: null,
      results: allResults,
    };
  } catch (e) {
    console.error(`Failed to fetch paginated data from ${path}:`, e);
    return null;
  }
}
