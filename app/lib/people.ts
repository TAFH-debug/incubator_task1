export type Person = {
    name: string,
    birth_year: string,
    gender: string,
    height: string,
    url: string
}

export async function loadPerson(id: string | null) {

    const req = await (await fetch(`https://swapi.dev/api/people/${id}`)).json();

    return {
        name: req.name,
        birth_year: req.birth_year,
        gender: req.gender,
        height: req.height,
        url: req.url.split('/').reverse()[1]
    };
}


export async function loadPeople(search: string | null, page: string | null) {
    const s = search === null ? '' : search;
    const p = page === null ? 1 : page;

    const req = await (await fetch(`https://swapi.dev/api/people?search=${s}&page=${p}`)).json()

    const res: { prev: string | null, next: string | null, people: Array<Person> } = { 
        people: req.results, prev: null, next: null };

    if (req.previous != null) {
        res.prev = `/people?search=${s}&page=${req.previous.split('=').reverse()[0]}`;
    }

    if (req.next != null) {
        res.next = `/people?search=${s}&page=${req.next.split('=').reverse()[0]}`;
    }

    return res;
}