const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY


export async function searchMovies(query: string) {
    if (!API_KEY) {
        throw new Error("TMDB API key is missing")
    }
    const url = `https://api.themoviedb.org/3/search/movie` +
        `?api_key=${API_KEY}` +
        `&query=${encodeURIComponent(query)}`

    console.log("[TMDB] Searching:", query)

    for (let attempt = 1; attempt <= 2; attempt++) {
        const controller = new AbortController()
        const timeout = setTimeout(() => {
            controller.abort()
        }, 5000)

        try {


            const res = await fetch(url, {
                signal: controller.signal,
            })


            if (!res.ok) {
                throw new Error(`TMDB returned ${res.status}`)
            }

            const data = await res.json()

            console.log(
                "[TMDB] Found",
                data.results?.length ?? 0,
                "movies"
            )
            return data.results ?? []
        } catch (err) {
            console.error(
                `[TMDB] Attempt ${attempt} failed:`,
                err
            )

            if (attempt === 2) {
                throw err
            }

            console.log("[TMDB] Retrying...")
        } finally {
            clearTimeout(timeout)
        }

    }
    return []
}

export async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular` +
        `?api_key=${API_KEY}` +
        `&language=en-IN` +
        `&page=1`

        const res = await fetch(url)
        if(!res.ok) {
            throw new Error("TMDB popular movies fetch failed")
        }

        const data = await res.json()
        return data.results
}