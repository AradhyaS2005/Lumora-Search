import { normalizePlatform } from "@/utils/normalizePlatform";
import type { Offer } from "@/types/movie";
import { isValidPlatform } from "@/app/lib/filterOffers";

export function buildOffers(rawOffers: any[] = []): Offer[] { // means If nothing is passed or it is undefined, use empty array instead
  return rawOffers
    .map((o) => {
      const platform = normalizePlatform(o.platform);

      if (!platform) return null;

      if(!isValidPlatform(o.platform)) return null

      const offer: Offer = {
        platform,
        type: o.type,
        price: o.price,
      };

      return offer;
    })
    .filter((o): o is Offer => o !== null);  // removes all null values from the array, ensuring the return type is Offer[]
}