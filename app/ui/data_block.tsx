type DataBlockProps = {
    title: string,
    content: string,
    href: string
}

export default function DataBlock(props: DataBlockProps) {
  return (
    <a href={props.href} className="flex flex-row items-center bg-blue-900 w-full h-[150px] m-10 p-20 rounded-full transition-all duration-300 hover:bg-blue-800 hover:translate-x-[-40px]">
        <div>
            <div className="font-bold text-4xl text-white">
                {props.title}
            </div>
            <div>
                {props.content}
            </div>
        </div>
    </a>
  );
}
