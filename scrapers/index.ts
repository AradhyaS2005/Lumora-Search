import { scrapeNetflix } from "./netflix";
import { scrapeAppleTV } from "./appletv";
import { scrapeGoogleTV } from "./googletv";

export async function scrapeAll(query: string) {
  const results = await Promise.all([
    scrapeNetflix(query),

    scrapeAppleTV(query),

    scrapeGoogleTV(query),
  ]);

  return results.flat();
}