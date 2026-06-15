// import JustWatch from "justwatch-api";

// const jw = new JustWatch({ locale: "en_IN" })

// export async function fetchJustWatchOffers(query: string) {
//     try {
//         const results = await jw.search({
//             query,
//         })

//         if (!results.items?.length) {
//             return [];
//         }

//         const movie = results.items.find((item: any) =>
//             item.title?.toLowerCase() === query.toLowerCase()
//         ) || results.items[0];

//         const offers = movie.offers || []

//         return offers.map((offer: any) => {
//             let type = "subscription"

//             if (offer.monetization_type === "rent") {
//                 type = "rent"
//             }
//             if (offer.monetization_type === "buy") {
//                 type = "buy"
//             }

//             return {
//                 platform:
//                     offer.package?.clear_name || "Unkown",

//                 type,

//                 price:
//                     offer.retail_price,
//             }
//         })
//     } catch (err) {
//         console.error("JUSTWATCH ERROR:", err)

//         return []
//     }
// }

const JustWatch = require("justwatch-api");

const jw = new JustWatch({ locale: "en_IN" });

export async function fetchJustWatchOffers(query: string) {

  try {

    const results = await jw.search({
      query,
    });

    console.log(
      JSON.stringify(results, null, 2)
    );

    return [];

  } catch (err) {

    console.error(err);

    return [];
  }
}