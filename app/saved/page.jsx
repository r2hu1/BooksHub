"use client";
import BookCard from "@/components/BookCard";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [feed, setFeed] = useState([]);
    const router = useRouter();

    const getAndSetFeed = async () => {
        const feed = JSON.parse(localStorage.getItem("bookmarks"));
        if (feed) {
            for (let i = 0; i < feed.length; i++) {
                setFeed((prev) => [...prev, feed[i]]);
            }
            const unique = feed.filter(
                (value, index, self) => index === self.findIndex((t) => t.id === value.id)
            );
            setFeed(unique);
        }
    };
    const removeAll = () => {
        localStorage.removeItem("bookmarks");
        router.push("/");
    }
    useEffect(() => {
        getAndSetFeed();
    }, []);

    return (
        <main className="py-10 mt-10 px-5 md:px-20 lg:px-32">
            <div className="mb-20">
                <div className="text-center max-w-sm mx-auto md:max-w-3xl">
                    <h1 className="sm:text-4xl text-3xl font-bold md:text-5xl">Viewing Your Saves</h1>
                    <p className="sm:text-base text-sm md:text-lg mt-1">Celebrate the joy of reading with our diverse collection of books.</p>
                    <div className="mt-7 flex items-center justify-center gap-2">
                        <Button asChild><Link href="/">Back To Home</Link></Button>
                        <Button variant="outline" onClick={removeAll}>Remove All</Button>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto grid gap-4 w-fit grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {feed.map((book) => (
                    <BookCard image={book.volumeInfo.imageLinks.thumbnail} key={book?.etag} link={"/" + book.id} />
                ))}
            </div>
            {!feed.length && (
                <div className="h-[200px] flex items-center justify-center">
                    <p className="text-center text-sm opacity-70">No saved books!</p>
                </div>
            )}
        </main>
    );
}
