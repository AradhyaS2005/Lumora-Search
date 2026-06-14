import { buildOffers } from "./buildOffers"

export function processMovie(rawMovie: any) {

    console.log("Process Movie input:", rawMovie)

    return {
        id: rawMovie.id,
        title: rawMovie.title,
        year: rawMovie.year,
        poster: rawMovie.poster,

        offers: buildOffers(rawMovie.rawOffers)
    }
}