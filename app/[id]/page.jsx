"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, getDetailsById } from "@/lib/utils";
import { ArrowUp, Bookmark, BookmarkCheck, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function Page({ params }) {
    const { id } = params;
    const [data, setData] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [isMarked, setIsMarked] = useState(false);


    const handleBookmark = (book) => {
        if (!isMarked) {
            const updatedBookmarks = [...bookmarks, book];
            setBookmarks(updatedBookmarks);
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            setIsMarked(true);
        }
    };

    const getAndSetData = async () => {
        const data = await getDetailsById({ id }).then((data) => {
            setData(data);
        });
    }
    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        if (storedBookmarks) {
            setBookmarks(storedBookmarks);
            for (let i = 0; i < storedBookmarks.length; i++) {
                if (storedBookmarks[i].id == id) {
                    setIsMarked(true);
                }
            }
        }
        getAndSetData();
    }, []);

    return (
        <section className="px-5 md:px-20 lg:px-32 py-10 mt-10 grid gap-3">
            <img src={data?.volumeInfo?.imageLinks?.thumbnail} className="h-[350px] w-full rounded-md bg-secondary/80" alt={data?.volumeInfo?.title} />
            <div className="mt-2 mb-2 border border-secondary/80 rounded-md h-fit grid gap-2 p-4 bg-background/95 rounded-b-md backdrop-blur-3xl">
                <h1 className="text-2xl font-bold">{data?.volumeInfo?.title}</h1>
                <p className={cn("text-sm mb-3", data?.volumeInfo?.description ? "block" : "hidden")} dangerouslySetInnerHTML={{ __html: data?.volumeInfo?.description }} />
                <p className={cn("text-sm opacity-70 mb-3", data?.volumeInfo?.description ? "hidden" : "block")}>No description available!</p>
                <div className="flex flex-wrap items-center gap-2">
                    <Badge className={cn("hidden", data?.volumeInfo?.publishedDate && "block")}>{data?.volumeInfo?.publishedDate}</Badge>
                    <Badge variant="outline" className={cn("hidden", data?.volumeInfo?.authors && "block")}>{data?.volumeInfo?.authors}</Badge>
                    <Badge variant="outline" className={cn("hidden", data?.volumeInfo?.publisher && "block")}>{data?.volumeInfo?.publisher}</Badge>
                </div>
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Language</TableHead>
                            <TableHead>Pages</TableHead>
                            <TableHead>Ratings</TableHead>
                            <TableHead>Avarage</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>{data?.volumeInfo?.language}</TableCell>
                            <TableCell>{data?.volumeInfo?.pageCount}</TableCell>
                            <TableCell>{data?.volumeInfo?.ratingsCount}</TableCell>
                            <TableCell>{data?.volumeInfo?.averageRating}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className="grid gap-2 mt-4">
                <div className="flex gap-2 items-center w-full">
                    <Button asChild className="w-full"><a href={data?.accessInfo?.pdf?.downloadLink || "#"} target="_blank">Download</a></Button>
                    <Button asChild size="icon" variant="outline"><a href={data?.saleInfo?.buyLink || "#"} target="_blank"><ShoppingCart className="h-4 w-4" /></a></Button>
                    <Button size="icon" variant="outline" disabled={isMarked} onClick={() => { handleBookmark(data) }}>{!isMarked ? <Bookmark className="h-4 w-4" /> : <BookmarkCheck className="h-4 w-4" />}</Button>
                </div>
                <a href={data?.volumeInfo?.previewLink || "#"} target="_blank" className="text-slate-500 flex gap-1 w-fit mx-auto underline items-center text-sm text-center">Preview on Google Books <ArrowUp className="h-4 w-4 rotate-[30deg]" /></a>
            </div>
        </section>
    )
}