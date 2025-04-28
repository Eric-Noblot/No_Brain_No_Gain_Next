import { NextResponse } from "next/server"
import { connectToDatabase } from "../../../../lib/connexion"
import { User } from "@/app/models/user"


export async function GET() {
    try {
        await connectToDatabase()
        const users = await User.find()
        return NextResponse.json(users, {status : 200})
    } catch (error) {
        console.log("Erreur lors du GET des users", error)
        return NextResponse.json({message: "Erreur lors du GET des users"}, {status: 500} )
    }
}


export async function POST(request : Request) {
    try {
        await connectToDatabase()
        const data = await request.json()
        const newUser = await User.create(data)
        return NextResponse.json(newUser,  { status: 201})
    } catch (error) {
        console.log("Erreur lors de l'envoi des donneés", error)
        return NextResponse.json({message : "Erreur lors du POST d'un user"}, {status : 500})
    }

}