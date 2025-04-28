"use client"

import { connectToDatabase } from "../../../../lib/connexion";
import { useState } from "react";

export const dynamic = "force-dynamic"; // Ça force Next.js à exécuter la route API à chaque requête, sans utiliser le cache.

export default function Home() {

  const [userOne, setUserOne] = useState("")

  
  const handleFindOne = async () => {
    if (!userOne) {
      console.log("Aucun utilisateur fourni")
      return 
    }
    try {
        const response = await fetch(`/api/users/${userOne}/get`, {
            method : "GET",
            headers: {
                "Content-type" : "application/json"
            }
        })
        if (!response.ok) {
            throw new Error("Erreur lor de la récuparation d'un utilisateur")
        }
        const data = await response.json()
        console.log("Utilisateur trouvé: ", data)
    } catch (error) {
        console.log("Erreur reseau ou connexion (findOne)")
    }
}

  const handleChange = ((e : React.ChangeEvent<HTMLInputElement>) => {
    setUserOne(e.target.value)
  })

  console.log("USER ONE : ", userOne)
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <h1>HOME PAGE</h1>
      <h2>Bienvenue Eric !</h2>
      <div className="text-center flex flex-col w-[200px] items-center">
        <input 
          type="text" 
          className="border p-2 mr-4" placeholder="search..."
          onChange={handleChange} 
          value= {userOne}>
        </input>
        <button onClick = {handleFindOne} className= "mt-2 w-[80px] cursor-pointer text-white p-2 bg-blue-400 rounded-md hover:bg-yellow-500">
          FIND ONE
        </button>
        <p>Utilisateur trouvé</p>
      </div>

    </div>
  );
}