export function getCheapestOffer(offers: any[]) {
    const rents = offers.filter((o) => o.type === "rent" && o.price)

    if(!rents.length) return null

    return rents.reduce((min, curr) => curr.price < min.price ? curr : min)
}