import { connectToDatabase } from "../../../../../lib/connexion";
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/app/models/user"

// GET findOne
export async function GET(request : NextRequest, { params }: { params : { userId : string}}) {

    const { userId } = params
    try {
        await connectToDatabase()
        const user = await User.findOne({name : userId})

        if (!user) {
            return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
        }

        return NextResponse.json(user, {status : 200})

    } catch (error) {
        console.log("Erreur lors de la recherche d'un utilisateur")
        return NextResponse.json({message : "Erreur de récupération d'un utilisateur"}, {status : 500})
    }
}

//PATCH UpdateOne
export async function PATCH(request : Request, { params }: { params : { userId : string}}) {
    const { userId } = params
    try {
        
        await connectToDatabase()
        const data = await request.json()

        if (!data) {
            return NextResponse.json({ message: "Le champ 'name' est requis" }, { status: 400 });
        }

        // en principe on utilise findByIdAndUpdate mais là j'envoie le name en request
        const userUpdated = await User.findOneAndUpdate(
            {name : userId}, // élément qu'on recheche
            {name: data}, // ce que je mets à jour
            {new : true}) // retourne le document mis à jour et non l'ancien

        if (!userUpdated) {
            return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
        }
                
        return NextResponse.json(userUpdated, {status : 200})

    } catch (error) {
        console.log("Erreur lors de la modification d'un utilisateur")
        return NextResponse.json({message : "Erreur de modification d'un utilisateur"}, {status : 500})
    }
}

// DELETE DeleteOne
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