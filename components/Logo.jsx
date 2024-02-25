import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <BookOpen className="h-6 w-6" />
        </Link>
    );
}