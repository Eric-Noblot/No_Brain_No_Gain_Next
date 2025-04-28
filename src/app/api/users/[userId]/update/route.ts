import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../../lib/connexion";
import { User } from "@/app/models/user"

export async function PATCH(request : Request, { params }: { params : { userId : string}}) {
    const { userId } = params
    try {
        
        await connectToDatabase()
        const data = await request.json()
        const user = await User.findOneAndUpdate(
            {name : userId},
            {})

        if (!user) {
            return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
        }
                
        return NextResponse.json(user, {status : 200})

    } catch (error) {
        console.log("Erreur lors de la modification d'un utilisateur")
        return NextResponse.json({message : "Erreur de modification d'un utilisateur"}, {status : 500})
    }
}