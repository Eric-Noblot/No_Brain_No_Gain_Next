import { NextResponse } from "next/server"
import { connectToDatabase } from "../../../../lib/connexion"
import { User } from "@/app/models/user"

export async function POST(request : Request) {
    console.log("je suis dans users/route")
    await connectToDatabase()
    const data = await request.json()
    const newUser = await User.create(data)
    return NextResponse.json(newUser,  { status: 201})
}