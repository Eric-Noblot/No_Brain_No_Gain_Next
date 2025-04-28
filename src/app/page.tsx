import Link from "next/link"

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <p>BIENVENUE SUR NO BRAIN NO GAME !!</p>
      <div className="flex justify-between w-[200px]">
        <Link href="/login" className="bg-red-200 p-4 rounded-md m-2 hover:bg-yellow-400">LOGIN</Link>
        <Link href="/signin" className="bg-red-200 p-4 rounded-md m-2 hover:bg-yellow-400">SIGNIN</Link>
      </div>
    </div>
  );
}
