import Link from "next/link";

export default function BannerCard({
    src,
    link,
}: {
    src: string;
    link: string;
}) {
    return (
        <div  className="
                snap-start
                relative
                w-[100vw]
                sm:w-[80vw]
                lg:w-[60vw]
                aspect-[16/9]
                overflow-hidden
                rounded-xl
                flex-shrink-0
            ">
        <Link
            href={link}
            className="block w-full h-full"
        >
            <img
                src={src}
                alt="Banner"
                className="w-full h-full object-cover"
            />
        </Link>

            <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
        </div>
    );
}