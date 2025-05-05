import { connectToDatabase } from "../../../../../lib/connexion";
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/app/models/user"

export async function GET(request : NextRequest, { params }: { params : { userName : string}}) {

    const { userName } = params

    try {
        await connectToDatabase()
        const user = await User.findOne({name : userName})

        if (!user) {
            return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
        }

        // console.log("PASSWORD BACKEND: ", user)

        // export async function comparePasswords({
        //     password,
        //     salt,
        //     hashedPassword
        // } : {
        //     password : string,
        //     salt : string,
        //     hashedPassword : string
        // }) {
        //     const inputHashedPassword = await hashPassword(password, salt)
        
        //     return inputHashedPassword === hashedPassword
        // }

        return NextResponse.json(user, {status : 200})

    } catch (error) {
        console.log("Erreur lors de la recherche d'un utilisateur")
        return NextResponse.json({message : "Erreur de récupération d'un utilisateur"}, {status : 500})
    }
}