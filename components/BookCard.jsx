import Link from "next/link";

export default function BookCard({ image, link }) {
    return (
        <div className="grid gap-2 rounded-md overflow-hidden p-2 border border-secondary/80">
            <Link href={link || "#"}>
                <img src={image} className="hover:opacity-70 transition cursor-pointer sm:h-52 sm:min-w-40 sm:max-w-40 w-full h-full rounded-md" />
            </Link>
        </div>
    )
}