import type { MovieResult } from "@/types/movie";
import { groupOffers } from "@/utils/groupOffers";
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

  const renderOffer = (o: any, type: string) => {
   
    return(
    
    <div
      key={`${type}-${o.platform}-${o.price ?? "free"}`}
      className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0"
    >
      <span className="text-gray-200">
        <div className="w-25 h-15 bg-white rounded-lg flex items-center justify-center">
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
      <div className="flex gap-6">

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

          <h2 className="text-3xl font-bold">
            {movie.title}
          </h2>

          <p className="text-gray-400 mb-6">
            {movie.year}
          </p>

          {/* Subscription */}
          <div className="mb-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <Popcorn size={18} />
              Subscription
            </h3>

            {grouped.subscription.length > 0 ? (
              grouped.subscription.map((o) =>
                renderOffer(o, "subscription")
              )
            ) : (
              <p className="text-gray-500">
                Not available
              </p>
            )}
          </div>

          {/* Rent */}
          <div className="mb-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <IndianRupee size={18} />
              Rent
            </h3>

            {grouped.rent.length > 0 ? (
              grouped.rent.map((o) =>
                renderOffer(o, "rent")
              )
            ) : (
              <p className="text-gray-500">
                Not available
              </p>
            )}
          </div>

          {/* Buy */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <ShoppingCart size={18} />
              Buy
            </h3>

            {grouped.buy.length > 0 ? (
              grouped.buy.map((o) =>
                renderOffer(o, "buy")
              )
            ) : (
              <p className="text-gray-500">
                Not available
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}