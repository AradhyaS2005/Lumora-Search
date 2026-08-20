const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

async function tmdbFetch(url: string) {
    const MAX_RETRIES = 3

    for(let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        const controller = new AbortController()

        const timeoutId = setTimeout(() => {
            controller.abort()
        }, 8000)

        try {
            const res = await fetch(url, {
                signal: controller.signal,
                cache: "no-store"
            })

            if(!res.ok) {
                throw new Error(
                    `TMDB request failed: ${res.status} ${res.statusText}`
                )
            }

            return await res.json()
        } catch (err: any) {
            console.error(
                `[TMDB] Attempt ${attempt} failed:`,
                err
            )

            if(attempt == MAX_RETRIES) {
                throw new Error("TMDB request faield after 3 attempts");
            }

            console.log("[TMDB] Retrying...");

            await new Promise((resolve) => setTimeout(resolve, 500 * attempt))
        } finally {
            clearTimeout(timeoutId)
        }
    }
}

export async function searchMovies(query: string) {
    console.log("[TMDB] Searching:", query)

    const url = `https://api.themoviedb.org/3/search/movie` +
        `?api_key=${API_KEY}` +
        `&query=${encodeURIComponent(query)}`

    const data = await tmdbFetch(url)    

    console.log("[TMDB] Found", data.results?.length ?? 0, "movies" )

    return data.results ?? []
}

export async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular` +
        `?api_key=${API_KEY}` +
        `&language=en-IN` +
        `&page=1`

        const data = await tmdbFetch(url)

        return data.results ?? []
}