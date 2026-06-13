import { buildOffers } from "./buildOffers"
 
export function processMovie(rawMovie: any){
    return{
        id: rawMovie.id,
        title: rawMovie.title,
        year: rawMovie.year,
        poster: rawMovie.poster,

        offers: buildOffers(rawMovie.rawoffers)
    }
}