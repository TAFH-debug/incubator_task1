export type Resident = {
    name: string,
    href: string
}

export type Planet = {
    name: string,
    climate: string,
    terrain: string,
    url: string,
    residents: Array<Resident>
}

export type Data = {
    planets: Array<Planet>,
    prev: string | null,
    next: string | null
}

export async function loadPlanet(id: string | null) {

    const req = await (await fetch(`https://swapi.dev/api/planets/${id}`)).json()

    const resd: Array<Resident> = [];


    for (const elem of req.residents) {
        const reqs = await (await fetch(elem)).json();
        resd.push({ name: reqs.name, href: elem });
    }

    return {
        name: req.name,
        climate: req.climate,
        terrain: req.terrain,
        url: req.url,
        residents: resd
    };
}


export async function loadPlanets(search: string | null, page: string | null) {
    const s = search === null ? '' : search;
    const p = page === null ? 1 : page;

    const req = await (await fetch(`https://swapi.dev/api/planets?search=${s}&page=${p}`)).json()

    const res: { prev: string | null, next: string | null, planets: Array<Planet> } = { 
        planets: [], prev: null, next: null };

    if (req.previous != null) {
        res.prev = `/planets?search=${s}&page=${req.previous.split('=').reverse()[0]}`;
    }

    console.log(req);
    if (req.next != null) {
        res.next = `/planets?search=${s}&page=${req.next.split('=').reverse()[0]}`;
    }

    req.results.forEach( (element: { name: string, climate: string, terrain: string, url: string, residents: Array<string> }) => {
        res.planets.push({
            name: element.name,
            climate: element.climate,
            terrain: element.terrain,
            url: element.url.split('/').toReversed()[1],
            residents: []
        })
    });

    res.planets = res.planets.sort();
    return res;
}