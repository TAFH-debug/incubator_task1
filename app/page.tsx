'use client';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image'

export default function Page() {

  function handleClick() {
    var a = document.getElementById('bar');
    if (a !== null) {
      a.style.display = "flex";
      a.style.transform = "translateX(0)";
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-0 m-0">
      <div className="flex h-20 shrink-0 items-center bg-black p-4 md:h-52 justify-center text-yellow-500 font-bold text-9xl">
        STAR WARS
      </div>
      <div className="flex grow flex-col md:flex-row bg-gray-800 text-yellow-500">
          <div className="flex flex-col justify-center gap-6 rounded-lg px-6 py-10 md:w-2/5 md:px-20">
            <p className={`text-xl md:text-3xl md:leading-normal`}>
              <strong>Welcome to Starwars fandom.</strong> Click here to start searching.
            </p>
            <button onClick={handleClick} className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
              <span>Start</span> <ArrowRightIcon className="w-5 md:w-6" />
            </button>
          </div>
          <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12"></div>
          <div id="bar" className="absolute duration-1000 bg-gray-950 flex translate-x-full flex grow flex-row transition-all justify-center items-center md:flex-row text-yellow-500 left-0 bottom-0 top-52 w-full">
          <div className="flex h-80 w-60 bg-black rounded-lg p-5 m-5 justify-center items-center transition-all hover:scale-125 hover:[text-shadow:_#FFF_0_0_10px] hover:shadow-[0_0_10px_#FFF] shadow-white">
              <a href="planets" className="flex flex-col items-center cursor-pointer text-gray-50 m-5 font-bold h-auto text-4xl">
                <Image width={200} height={200} src="/planet.svg" alt="" />
                Planets
              </a>
            </div>
            <div className="flex h-80 w-60 bg-black rounded-lg p-5 m-5 justify-center items-center transition-all hover:scale-125 hover:[text-shadow:_#FFF_0_0_10px] hover:shadow-[0_0_10px_#FFF] shadow-white">
              <a href="people" className="flex flex-col items-center cursor-pointer text-gray-50 m-5 font-bold h-auto text-4xl">
                <Image width={200} height={200} src="/darth.svg" alt="" />
                People
              </a>
            </div>
            <div className="flex h-80 w-60 bg-black rounded-lg p-5 m-5 justify-center items-center transition-all hover:scale-125 hover:[text-shadow:_#FFF_0_0_10px] hover:shadow-[0_0_10px_#FFF] shadow-white">
              <a href="/starships" className="flex flex-col items-center cursor-pointer text-gray-50 m-5 font-bold h-auto text-4xl">
                <Image width={200} height={200} src="/starship.svg" alt="" />
                Starships
              </a>
            </div>
          </div>
      </div>
    </main>
  );
}
