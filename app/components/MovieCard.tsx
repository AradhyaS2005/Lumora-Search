import type { MovieResult } from "@/types/movie";
import { groupOffers } from "@/utils/groupOffers";

type Props = {
  movie: MovieResult;
};

// Optional: map platform codes → readable names
const platformMap: Record<string, string> = {
  nfx: "Netflix",
  amz: "Amazon Prime",
  zee: "Zee5",
  itv: "iTunes",
  pva: "Prime Video",
  prv: "Provider",
  vim: "Vimeo",
  asa: "ASA",
};

export default function MovieCard({ movie }: Props) {
  const grouped = groupOffers(movie.offers);

  const renderOffer = (o: any, type: string) => (
    <div
      key={`${type}-${o.platform}-${o.price ?? "free"}`}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "4px 0",
      }}
    >
      <span>{platformMap[o.platform] ?? o.platform}</span>

      {type !== "subscription" && o.price != null && (
        <span>₹{o.price}</span>
      )}
    </div>
  );

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
      {/* Poster */}
{movie.poster ? (
  <img
    src={movie.poster}
    alt={movie.title}
    style={{ width: 120, borderRadius: 6 }}
  />
) : (
  <div
    style={{
      width: 120,
      height: 180,
      border: "1px solid #ddd",
      borderRadius: 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    No Poster
  </div>
)}

      {/* Title */}
      <h2>{movie.title}</h2>
      <p>{movie.year}</p>

      {/* Subscription */}
      <div>
        <h3>Subscription</h3>
        {grouped.subscription.length > 0 ? (
          grouped.subscription.map((o) => renderOffer(o, "subscription"))
        ) : (
          <p>Not available</p>
        )}
      </div>

      {/* Rent */}
      <div>
        <h3>Rent</h3>
        {grouped.rent.length > 0 ? (
          grouped.rent.map((o) => renderOffer(o, "rent"))
        ) : (
          <p>Not available</p>
        )}
      </div>

      {/* Buy */}
      <div>
        <h3>Buy</h3>
        {grouped.buy.length > 0 ? (
          grouped.buy.map((o) => renderOffer(o, "buy"))
        ) : (
          <p>Not available</p>
        )}
      </div>
    </div>
  );
}