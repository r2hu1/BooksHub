"use client";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getByQuery } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const [feed, setFeed] = useState([]);
    const [vlv, setVlv] = useState("");
    const router = useRouter();

    const getAndSetFeed = async () => {
        const feed = await getByQuery({ query: params.query }).then((data) => {
            for (let i = 0; i < data.items.length; i++) {
                setFeed((prev) => [...prev, data.items[i]]);
            }
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.push("/search/" + encodeURI(vlv));
    };
    useEffect(() => {
        getAndSetFeed();
    }, []);

    return (
        <main className="px-5 md:px-20 lg:px-32 py-10 mt-10">
            <div className="mb-10">
                <div className="text-center max-w-sm mx-auto md:max-w-3xl">
                    <h1 className="sm:text-4xl text-3xl font-bold md:text-5xl">Search Results</h1>
                    <p className="sm:text-base text-sm md:text-lg mt-1">Search results for your "{decodeURI(params.query)}".</p>
                </div>
                <form method="post" onSubmit={handleSearch} className="mt-8 flex gap-2 items-center max-w-sm mx-auto md:max-w-md">
                    <Input required onChange={(e) => setVlv(e.target.value)} value={vlv} placeholder="Search for books.." type="text" />
                    <Button size="icon" type="submit"><Search className="h-4 w-4" /></Button>
                </form>
            </div>
            <div className="max-w-5xl mx-auto grid gap-4 w-fit grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {feed.map((book) => (
                    book.volumeInfo.imageLinks?.thumbnail && <BookCard image={book.volumeInfo.imageLinks.thumbnail} key={book?.etag} link={"/" + book.id} />
                ))}
            </div>
            {!feed.length && (
                <div className="h-[200px] flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            )}
        </main>
    );
}
