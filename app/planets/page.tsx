import Image from 'next/image';

export default function Page() {

    function get_data() {
        
    }

    return (
        <main className="flex text-white w-full bg-black">
            <div className="flex text-yellow-400 w-full h-20 p-4 justify-between items-center font-bold text-3xl">
                STAR WARS
                <div className="flex border-solid border-white border-2 p-1 rounded-lg">
                    <Image width={20} height={20} alt="" src="/search.svg"/>
                    <input className="bg-black border-transparent focus:border-transparent focus:ring-0 text-2xl" />
                </div>
            </div>
            <div>
                
            </div>
        </main>
    )
}