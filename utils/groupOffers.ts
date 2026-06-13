import type { Offer } from "@/types/movie.ts";


export function groupOffers(offers: Offer[]) {
  return {
    subscription: offers.filter(o => o.type === "subscription"),
    rent: offers.filter(o => o.type === "rent"),
    buy: offers.filter(o => o.type === "buy"),
  };
}