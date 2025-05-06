"use client"

import { connectToDatabase } from "../../../lib/connexion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import Games from "../components/Games";

export const dynamic = "force-dynamic"; // Ça force Next.js à exécuter la route API à chaque requête, sans utiliser le cache.

export default function Home() {

  const router = useRouter()

  const [userData, setUserData] = useState<{
    _id: string
    name: string
    email: string
    password: string
    salt: string
  } | null>(null) //null parce que le state est vide au départ (donc null ou {}), donc il vaut mieux refléter cette réalité dans le typage. Sinon TypeScript t'obligera à fournir toutes les propriétés dès l'initialisation.

  const [hasFetchedData, setHasFetchedData] = useState(false) 

  const fetchedData = async (name : string) => {

    if (!name) {
      console.log("Aucun utilisateur fourni pour la page Home")
      return
    }

    try {
      const response = await fetch (`/api/users/${name}`, {
        method: "GET",
        headers : { "Content-Type" : "application/json" }
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la récuparation d'un utilisateur")
    }

    const data = await response.json()
    setUserData(data)
    setHasFetchedData(true)
    } catch (error) {
      console.log ("Erreur dans la récupération de la data pour la page Home")
    }
  }

  useEffect (() => {
    const getData = async () => {
      const name = localStorage.getItem("username")
      if (!name) {
        router.push("/")
        return
      }
  
      await fetchedData(name)
    }
    getData()
  },[hasFetchedData])

  const handleLogout = () => {
    localStorage.removeItem("username")
    router.push("/")
  }

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <h1>HOME PAGE</h1>
      <h2>Bienvenue {userData?.name} !</h2>
      <div className="text-center flex flex-col w-[200px] items-center">
       
        <Games userData= {userData}/>
        <button onClick={handleLogout} className= "mt-2 cursor-pointer text-white p-2 bg-blue-400 rounded-md hover:bg-yellow-500">
          LOG OUT
        </button>
      </div>

    </div>
  );
}