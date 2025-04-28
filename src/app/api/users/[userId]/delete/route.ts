import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../../lib/connexion";
import { User } from "@/app/models/user"

export async function DELETE(request : Request, { params }: { params : { userId : string}}) {
    const { userId } = params
    try {
        await connectToDatabase()
        const user = await User.findOneAndDelete({name : userId})

        if (!user) {
            return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
        }
                
        return NextResponse.json(user, {status : 200})

    } catch (error) {
        console.log("Erreur lors de la suppression d'un utilisateur")
        return NextResponse.json({message : "Erreur de suppression d'un utilisateur"}, {status : 500})
    }
}