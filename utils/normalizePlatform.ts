export function normalizePlatform(name: string) {
  const key = name.toLowerCase().trim();

  const map: Record<string, string | null> = {
    // Subscription
    netflix: "Netflix",
    "netflix india": "Netflix",

    prime: "Amazon Prime Video",
    "prime video": "Amazon Prime Video",

    hotstar: "Disney+ Hotstar",
    "disney hotstar": "Disney+ Hotstar",

    zee5: "Zee5",
    sonyliv: "SonyLIV",

    "apple tv": "Apple TV",
    itunes: "Apple TV",

    // Rental
    "google tv": "Google TV",
    "youtube movies": "Google TV",
  };

  // return null = IGNORE THIS ENTRY (important)
  return map[key] ?? name;
}