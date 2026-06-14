export function normalizePlatform(name: string) {

  const key = name.toLowerCase().trim();

  const map: Record<string, string> = {

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

    // Rent / Buy
    "google tv": "Google TV",
    "youtube movies": "Google TV",
  };

  return map[key] || name;
}