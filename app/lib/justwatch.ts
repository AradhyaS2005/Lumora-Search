export async function fetchJustWatchOffers(query: string) {
  const res = await fetch(
    "https://apis.justwatch.com/graphql",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        operationName: "GetSearchResults",

        variables: {
          country: "IN",
          language: "en",
          searchQuery: query,
          first: 4,
          location: "SearchSuggester",
        },

        query: `
          query GetSearchResults(
            $country: Country!,
            $language: Language!,
            $first: Int!,
            $searchQuery: String,
            $location: String!
          ) {
            searchTitles(
              country: $country
              first: $first
              filter: {
                searchQuery: $searchQuery
                includeTitlesWithoutUrl: true
              }
              source: $location
            ) {
              edges {
                node {
                  id
                  objectId

                  content(
                    country: $country
                    language: $language
                  ) {
                    title
                    originalReleaseYear
                  }

                  offers(
                    country: $country
                    platform: WEB
                    filter: { preAffiliate: true }
                  ) {
                    monetizationType

                    package {
                      shortName
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    }
  );

  const data = await res.json();

  

  const firstMatch =
  data.data.searchTitles.edges[0]?.node;

if (!firstMatch) {
  return [];
}

const mappedOffers = firstMatch.offers.map((offer: any) => ({
  platform: offer.package.shortName,
  type:
    offer.monetizationType === "FLATRATE"
      ? "subscription"
      : offer.monetizationType === "RENT"
      ? "rent"
      : "buy",
}));



return mappedOffers;

}