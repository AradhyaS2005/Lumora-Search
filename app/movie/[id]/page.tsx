import BackButton from "@/app/components/BackButton";

type Props = {
  params: Promise<{ id: string }>;
};

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
};

type Provider = {
  logo_path: string | null;
  provider_name: string;
  provider_id: number;
};

type ProvidersData = {
  flatrate?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
};

export default async function MoviePage({ params }: Props) {

  const { id } = await params;

  // MOVIE DETAILS
  const movieRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    {
      cache: "no-store",
    }
  );

  if (!movieRes.ok) {
    throw new Error(
      `Failed to fetch movie: ${movieRes.status}`
    );
  }

  const movie: Movie = await movieRes.json();

  // PROVIDERS
  const providersRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    {
      cache: "no-store",
    }
  );

  if (!providersRes.ok) {
    throw new Error(
      `Failed to fetch movie providers: ${providersRes.status}`
    );
  }

  const providersData = await providersRes.json();

  const providers: ProvidersData | undefined =
    providersData.results?.IN;

  // IMAGES
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  return (
    <div
      className="movie-page"
      style={{ position: "relative" }}
    >

      {/* BACKDROP */}
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      />

      {/* CONTENT */}
      <div className="content relative z-10 px-12 py-12">

        <BackButton />

        {/* POSTER */}
        <img
          src={posterUrl}
          alt={movie.title}
          className="poster"
        />

        {/* DETAILS */}
        <div className="details">

          <h1 className="title">
            {movie.title}
          </h1>

          <p className="meta">
            {movie.vote_average} • {movie.release_date}
          </p>

          <p className="overview">
            {movie.overview}
          </p>

        </div>

        {/* STREAMING PROVIDERS */}
        <div style={{ marginTop: "30px" }}>

          <h2>Where to Watch</h2>

          {!providers && (
            <p>
              Not available in your region
            </p>
          )}

          {/* SUBSCRIPTION */}
          {providers?.flatrate && (
            <div>

              <h3>Subscription</h3>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >

                {providers.flatrate.map(
                  (provider: Provider) => (

                    <img
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                      style={{
                        width: "50px",
                        borderRadius: "8px",
                      }}
                    />

                  )
                )}

              </div>

            </div>
          )}

          {/* RENT */}
          {providers?.rent && (
            <div>

              <h3>Rent</h3>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >

                {providers.rent.map(
                  (provider: Provider) => (

                    <img
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                      style={{
                        width: "50px",
                        borderRadius: "8px",
                      }}
                    />

                  )
                )}

              </div>

            </div>
          )}

          {/* BUY */}
          {providers?.buy && (
            <div>

              <h3>Buy</h3>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >

                {providers.buy.map(
                  (provider: Provider) => (

                    <img
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                      style={{
                        width: "50px",
                        borderRadius: "8px",
                      }}
                    />

                  )
                )}

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}