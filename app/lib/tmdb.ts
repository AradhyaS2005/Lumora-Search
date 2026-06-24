const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export async function searchMovies(query: string) {
const url = `https://api.themoviedb.org/3/search/movie` +
        `?api_key=${API_KEY}` +
        `&query=${encodeURIComponent(query)}`

        console.log("[TMDB] Searching:", query)

        for(let attempt = 1; attempt <= 2; attempt++){
            try{
                const controller = new AbortController()

                const timeout = setTimeout(() => {
                    controller.abort()
                }, 5000)

                const res = await fetch(url, {
                    signal: controller.signal,
                })

                clearTimeout(timeout)

                if(!res.ok){
                    throw new Error(`TMDB returned ${res.status}`)
                }

                const data = await res.json()

                console.log(
                    "[TMDB] Found",
                    data.results?.length ?? 0,
                    "movies"
                )
                return data.results ?? []
            } catch(err){
                console.error(
                    `[TMDB] Attempt ${attempt} failed:`,
                    err
                )

                if(attempt === 2){
                    throw err
                }

                console.log("[TMDB] Retrying...")
            }
        }
        return []
}