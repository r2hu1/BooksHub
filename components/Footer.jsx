import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="py-10 px-5 mt-10 opacity-70">
            <div className="grid place-items-center gap-2">
                <Logo />
                <p className="text-sm text-center text-wrap">
                    Built by <a href="https://github.com/r2hu1" className="underline">r2hu1</a> using <a href="https://nextjs.org" className="underline">Next.js</a> hosted on <a href="https://vercel.com" className="underline">Vercel</a>.
                </p>
            </div>
        </footer>
    )
}