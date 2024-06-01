'use client';

import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { Data, loadPlanet, loadPlanets, Planet, Resident } from "../lib/planets";
import Image from "next/image";
import DataBlock from "../ui/data_block";
import { useEffect, useState } from "react";

type State = {
    planets: Array<Planet>,
    isLoading: boolean,
    prev: string | null,
    next: string | null
}

export const load = (async (query: ReadonlyURLSearchParams, search: string) => {
    const id = query.get('id');
    const page = query.get('page');

    if (typeof id === 'string') {
        const planet = await loadPlanet(id);
        return { 
            props: {
                planets: [planet],
                prev: null,
                next: null
            }
        }
    }

    const props = await loadPlanets(
        typeof search === 'string' ? search : null,
        typeof page === 'string' ? page : null
    );

    return { props }
})

export default function Client() {
    const query = useSearchParams();

    const [search, setSearch] = useState<string>('');

    if (query.has('id')) {
        return (
            <PlanetPage id={query.get('id')}/>
        )
    }

    return (
        <main className="flex flex-col text-white w-full bg-black items-center">
            <div className="flex text-yellow-400 w-full h-20 p-4 justify-between items-center font-bold text-3xl">
                <a href="/">STAR WARS</a>
                <div className="flex border-solid border-white border-2 p-1 rounded-lg">
                    <Image width={ 20 } height={ 20 } alt="" src="/search.svg" />
                    <Input search={search} setSearch={ (src) => {
                        setSearch(src);
                    } } />
                </div>
            </div>
            <div className="w-3/5">
                <List search={search}/>
            </div>
        </main>
    )
}

function Input({ search, setSearch }: { search: string, setSearch: ((src: string) => void) }) {
    return <input value={search} onChange={(e) => setSearch(e.target.value)}
        className="bg-black border-transparent focus:border-transparent focus:ring-0 text-2xl" />
}

function List({ search }: { search: string }) {
    const query = useSearchParams();

    const [state, setState] = useState<State>({ planets: [], isLoading: true, prev: '', next: '' });

    useEffect(() => { 
        async function efct() {
            const data = (await load(query, search)).props; 
            setState({ planets: data.planets, isLoading: false, prev: data.prev, next: data.next });
        }
        efct();
    }, [query, search]);

    if (state.isLoading) return <div></div>;

    return <> 
        {
            state.planets.map((val) => {
                return <DataBlock key={val.url} title={ val.name } content={ val.climate } href={"/planets?id=" + val.url } />
            })
        }
        <div className="h-[150px] w-full flex items-center justify-center">
        {
            state.prev !== null ? 
            <a href={state.prev} className="bg-blue-500 rounded-full p-3 m-10 hover:bg-blue-400">Previous</a>
            : <></>
        }
        {
            state.next !== null ? 
            <a href={state.next} className="bg-blue-500 rounded-full p-3 m-10 hover:bg-blue-400">Next</a>
            : <></>
        }
        </div>
    </>
}

function PlanetPage({ id }: { id: string | null }) {

    const [planet, setPlanet] = useState<Planet>({ 
        name: '', 
        terrain: '', 
        climate: '', 
        residents: [],
        url: ''
    });

    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function efct() {
            const data = (await loadPlanet(id));
            setPlanet(data);
            setLoading(false);
        }
        efct();
    }, [id]);

    return (
        <div className="flex w-screen h-screen text-white justify-center items-center bg-image-starwars">
            <div className="flex flex-col w-2/5 min-h-4/5 rounded-lg bg-black items-center">
                <div className='m-20 font-bold text-5xl text-center'>STAR WARS PLANET</div>
                {
                    isLoading ? <div className="font-bold m-20">Loading...</div> : (<>
                        <div className="text-2xl"><strong>Name:</strong> {planet.name}</div>
                        <div className="text-2xl"><strong>Climate:</strong> {planet.climate}</div>
                        <div className="text-2xl"><strong>Terrain:</strong> {planet.terrain}</div>
                        <div className="text-2xl"><strong>Residents:</strong></div>
                        <ResidentList residents={planet.residents} />
                    </>)
                }
            </div>
        </div>
    )
}


function ResidentList({ residents }: { residents: Array<Resident> }) {

    return (
        residents.map((resd, index) => {
            return <a className="m-1 hover:text-blue-700" key={index} href={"/people?id=" + resd.href.split('/').reverse()[1]}>
                {resd.name}
            </a>
        })
    )
}