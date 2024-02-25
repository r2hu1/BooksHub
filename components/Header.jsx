import Link from "next/link";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import Logo from "./Logo";

export default function Header() {
    return (
        <header className="py-3 border-b border-secondary/80 px-6 md:mx-20 lg:mx-32 flex items-center justify-between">
            <div>
                <Logo />
            </div>
            <div className="flex items-center gap-2">
                <Button asChild size="icon"><Link href="/saved"><Bookmark className="h-4 w-4" /></Link></Button>
                <ModeToggle />
            </div>
        </header>
    );
}