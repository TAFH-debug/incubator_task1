export type Starship = {
    name: string,
    model: string,
    cost: string,
    manufacturer: string,
    url: string
}

export async function loadStarship(id: string | null) {

    const req = await (await fetch(`https://swapi.dev/api/vehicles/${id}`)).json();

    return {
        name: req.name,
        model: req.model,
        cost: req.cost_in_credits,
        manufacturer: req.manufacturer,
        url: req.url
    }
}


export async function loadStarships(search: string | null, page: string | null) {
    const s = search === null ? '' : search;
    const p = page === null ? 1 : page;

    const req = await (await fetch(`https://swapi.dev/api/vehicles?search=${s}&page=${p}`)).json()

    const res: { prev: string | null, next: string | null, starships: Array<Starship> } = { 
        starships: req.results, prev: null, next: null };

    if (req.previous != null) {
        res.prev = `/starships?search=${s}&page=${req.previous.split('=').reverse()[0]}`;
    }

    if (req.next != null) {
        res.next = `/starships?search=${s}&page=${req.next.split('=').reverse()[0]}`;
    }

        
    return res;
}