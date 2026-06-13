import type { MovieResult } from "@/types/movie";
import { groupOffers } from "@/utils/groupOffers";

type Props = {
  movie: MovieResult;
};

export default function MovieCard({ movie }: Props) {
  const grouped = groupOffers(movie.offers);

  return (
    <div>
      {/* Poster */}
      <img src={movie.poster} alt={movie.title} />

      {/* Title */}
      <h2>{movie.title}</h2>
      <p>{movie.year}</p>

      {/* Subscription */}
      <div>
        <h3>Subscription</h3>
        {grouped.subscription.map((o) => (
          <p key={o.platform}>{o.platform}</p>
        ))}
      </div>

      {/* Rent */}
      <div>
        <h3>Rent</h3>
        {grouped.rent.map((o) => (
          <p key={o.platform}>
            {o.platform} - ₹{o.price}
          </p>
        ))}
      </div>

      {/* Buy */}
      <div>
        <h3>Buy</h3>
        {grouped.buy.map((o) => (
          <p key={o.platform}>
            {o.platform} - ₹{o.price}
          </p>
        ))}
      </div>
    </div>
  );
}