"use client";
import BookCard from "@/components/BookCard";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getHomepageFeed } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [feed, setFeed] = useState([]);
  const getAndSetFeed = async () => {
    const feed = await getHomepageFeed().then((data) => {
      for (let i = 0; i < data.items.length; i++) {
        setFeed((prev) => [...prev, data.items[i]]);
      }
    });
  }
  useEffect(() => {
    getAndSetFeed();
  }, []);

  return (
    <main>
      <Hero />
      <div className="px-5 max-w-5xl mx-auto grid gap-4 w-fit grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
