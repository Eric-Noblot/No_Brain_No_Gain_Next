import Link from "next/link"

const Header = (() => {
    return (
        <header className="flex justify-between bg-black text-white h-[100px] items-center px-8">
        <Link href="/">
            ACCUEIL
        </Link>
        <Link href="/login">
            LOGIN
        </Link>
        <Link href="/home">
            HOME GAMES
        </Link>
    </header>
    )
})

export default Header
