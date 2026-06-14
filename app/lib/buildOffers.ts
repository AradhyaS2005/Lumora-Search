import { normalizePlatform } from "@/utils/normalizePlatform";

import { isValidPlatform } from "@/app/lib/filterOffers";

import type { Offer } from "@/types/movie";

export function buildOffers(rawOffers: any[] = []): Offer[] {

  const offers: Offer[] = [];

  for (const o of rawOffers) {

    const platform = normalizePlatform(o.platform);

    // skip invalid platforms
    if (!platform) continue;

    // skip studios like sony/lionsgate
    if (!isValidPlatform(platform)) continue;

    const offer: Offer = {
      platform,

      type: o.type,
    };

    // only add price if it exists
    if (o.price !== undefined) {
      offer.price = o.price;
    }

    offers.push(offer);
  }

  return offers;
}