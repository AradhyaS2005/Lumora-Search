import type { MovieResult } from "@/types/movie";
import { groupOffers } from "@/utils/groupOffers";
import { genreMap } from "@/app/lib/genres";
import {
  Popcorn,
  ShoppingCart,
  IndianRupee,
} from "lucide-react";

type Props = {
  movie: MovieResult;
};

// Optional: map platform codes → readable names
type platformInfo = {
  name: string;
  logo?: string;
};

const platformMap: Record<string, platformInfo> = {
  "Netflix": {
    name: "Netflix",
    logo: "/logos/netflix.svg",
  },

  "Amazon Prime Video": {
    name: "Amazon Prime Video",
    logo: "/logos/prime-video.svg",
  },

  "Apple TV": {
    name: "Apple TV",
    logo: "/logos/apple-tv.svg",
  },

  "SonyLIV": {
    name: "SonyLIV",
    logo: "/logos/sonyliv.png",
  },

  "Zee5": {
    name: "Zee5",
    logo: "/logos/zee5.svg",
  },

  "Vimeo": {
    name: "Vimeo",
    logo: "/logos/vimeo.svg",
  },

  "Lionsgate Play": {
    name: "Lionsgate Play",
    logo: "/logos/lionsgate.svg",
  },
};

export default function MovieCard({ movie }: Props) {
  const grouped = groupOffers(movie.offers);

  const genres = movie.genres
    ?.slice(0, 2)
    .map(id => genreMap[id])
    .filter(Boolean) // this removes all false values like undefined or null or empty
    .join(" • ");
  //console.log("Genres:", genres);
  const renderOffer = (o: any, type: string) => {
   
    return(
    
    <div
      key={`${type}-${o.platform}-${o.price ?? "free"}`}
      className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0"
    >
      <span className="text-gray-200">
        <div className="w-25 h-15 bg-gray-700 rounded-lg flex items-center justify-center">
          <img
          src={platformMap[o.platform]?.logo}
          alt={platformMap[o.platform]?.name}
          title={platformMap[o.platform]?.name}
          className="h-15 w-20 object-contain"
        />
        </div>
        </span>

      {type !== "subscription" && o.price != null && (
        <span className="font-semibold text-green-400">₹{o.price}</span>
      )}
    </div>
  );
}

  return (
    <div className="bg-[#161B22] border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      <div className="flex gap-6 items-center">

        {/* Poster */}
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-100 rounded-xl object-cover"
          />
        ) : (
          <div className="w-36 h-52 rounded-xl border border-gray-700 flex items-center justify-center text-gray-500">
            No Poster
          </div>
        )}

        {/* Movie Info */}
        <div className="flex-1">

          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            {movie.title}
          </h2>

          <p className="text-sm text-gray-400 font-medium mb-6">
            Released • {movie.year} • {genres || "Unknown Genre"}
          </p>

          {/* Subscription */}
          <div className="mb-5" >
            <span className="inline-flex items-center bg-[#1E3A2F] text-[#A7F3D0] px-2.5 py-1 rounded-full text-[13px] font-semibold mb-2.5">
              <Popcorn className="w-4 h-4 shrink-0 mr-2" /> 
              Subscription
            </span>

            <div className="flex flex-wrap gap-3">
              {grouped.subscription.length > 0 ? (
              grouped.subscription.map((o) =>
                renderOffer(o, "subscription")
              )
            ) : (
              <p className="text-gray-500 italic">
                Not available
              </p>
            )}
            </div>
            
          </div>

          {/* Rent */}
          <div className="mb-5">
            <span className="inline-flex items-center bg-[#476592] text-[#d3e4f9] px-2.5 py-1 rounded-full text-[13px] font-semibold mb-2.5">
              <IndianRupee className="w-4 h-4 shrink-0 mr-2" />
              Rent
            </span>
            
            <div className="flex flex-wrap gap-3">
            {grouped.rent.length > 0 ? (
              grouped.rent.map((o) =>
                renderOffer(o, "rent")
              )
            ) : (
              <p className="text-gray-500 italic">
                Not available
              </p>
            )}
            </div>
          </div>

          {/* Buy */}
          <div>
            <span className="inline-flex items-center bg-[#1E3A8A] text-[#BFDBFE] px-2.5 py-1 rounded-full text-[13px] font-semibold mb-2.5">
              <ShoppingCart className="w-4 h-4 shrink-0 mr-2" />
              Buy
            </span>

            <div className="flex flex-wrap gap-3">
            {grouped.buy.length > 0 ? (
              grouped.buy.map((o) =>
                renderOffer(o, "buy")
              )
            ) : (
              <p className="text-gray-500 italic">
                Not available
              </p>
            )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}