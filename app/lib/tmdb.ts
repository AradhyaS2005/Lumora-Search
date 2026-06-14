const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export async function searchMovies(query: string) {

    const url = `https://api.themoviedb.org/3/search/movie` +
        `?api_key=${API_KEY}` +
        `&query=${encodeURIComponent(query)}`

    const res = await fetch(url)

    if (!res.ok) {
        throw new Error("TMDB fetch failed")
    }

    const data = await res.json()
    return data.results
}