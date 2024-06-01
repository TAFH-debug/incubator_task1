'use client';

import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import DataBlock from "../ui/data_block";
import { useEffect, useState } from "react";
import { loadPeople, loadPerson, Person } from "../lib/people";

type State = {
    people: Array<Person>,
    isLoading: boolean,
    prev: string | null,
    next: string | null
}

const load = (async (query: ReadonlyURLSearchParams, search: string) => {
    const id = query.get('id');
    const page = query.get('page');

    if (typeof id === 'string') {
        const Person = await loadPerson(id);
        return { 
            props: {
                people: [Person],
                prev: null,
                next: null
            }
        }
    }

    const props = await loadPeople(
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
            <PersonPage id={query.get('id')}/>
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

    const [state, setState] = useState<State>({ people: [], isLoading: true, prev: null, next: null });

    useEffect(() => { 
        async function efct() {
            const data = (await load(query, search)).props; 
            setState({ people: data.people, isLoading: false, prev: data.prev, next: data.next });
            console.log(data);
        }
        efct();
    }, [query, search]);

    if (state.isLoading) return <div></div>;

    return <>
    {
        state.people.map((val) => {
            return <DataBlock key={val.url} title={ val.name } content={ val.birth_year } href={"/people?id=" + val.url.split('/').reverse()[1] } />
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

function PersonPage({ id }: { id: string | null }) {

    const [person, setPerson] = useState<Person>({ 
        name: '', 
        birth_year: '',
        gender: '',
        height: '',
        url: ''
    });

    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function efct() {
            const data = (await loadPerson(id));
            setPerson(data);
            setLoading(false);
        }
        efct();
    }, [id]);

    return (
        <div className="flex w-screen h-screen text-white justify-center items-center bg-image-starwars">
            <div className="flex flex-col w-2/5 min-h-4/5 rounded-lg bg-black items-center">
                <div className='m-20 font-bold text-5xl text-center'>STAR WARS PERSON</div>
                {
                    isLoading ? <div className="font-bold m-20">Loading...</div> : (<>
                        <div className="text-2xl"><strong>Name:</strong> {person.name}</div>
                        <div className="text-2xl"><strong>Birth year:</strong> {person.birth_year}</div>
                        <div className="text-2xl"><strong>Gender:</strong> {person.gender}</div>
                        <div className="text-2xl mb-10"><strong>Height:</strong> {person.height}</div>
                    </>)
                }
            </div>
        </div>
    )
}