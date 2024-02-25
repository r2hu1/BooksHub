"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Hero() {
    const [vlv, setVlv] = useState("");
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        router.push("/search/" + encodeURI(vlv));
    };
    return (
        <div className="py-20 px-5">
            <div className="text-center max-w-sm mx-auto md:max-w-3xl">
                <h1 className="sm:text-4xl text-3xl font-bold md:text-5xl">Discover Great Reads</h1>
                <p className="sm:text-base text-sm md:text-lg mt-1">Celebrate the joy of reading with our diverse collection of books.</p>
            </div>
            <form method="post" onSubmit={handleSearch} className="mt-8 flex gap-2 items-center max-w-sm mx-auto md:max-w-md">
                <Input required onChange={(e) => setVlv(e.target.value)} value={vlv} placeholder="Search for books.." type="text" />
                <Button size="icon" type="submit"><Search className="h-4 w-4" /></Button>
            </form>
        </div>
    )
}