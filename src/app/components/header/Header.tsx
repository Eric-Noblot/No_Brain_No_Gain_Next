import Link from "next/link"

const Header = (() => {
    return (
        <header className="flex justify-center gap-4 bg-black text-white h-[100px] items-center px-8">
        <Link href="/">
            ACCUEIL
        </Link>
        <Link href="/signin">
            SIGNIN
        </Link>
        <Link href="/signup">
            SIGNUP
        </Link>
        <Link href="/home">
            HOME 
        </Link>
        <Link href="/crud">
            CRUD 
        </Link>
    </header>
    )
})

export default Header
