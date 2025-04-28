"use client"

import { connectToDatabase } from "../../../../lib/connexion";
import { useState } from "react";

export const dynamic = "force-dynamic"; // Ça force Next.js à exécuter la route API à chaque requête, sans utiliser le cache.

export default function Home() {

  const [userOne, setUserOne] = useState("")
  const [updateUserOne, setUpdateUserOne] = useState("")

  
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
            throw new Error("Erreur lors de la récuparation d'un utilisateur")
        }
        const data = await response.json()
        console.log("Utilisateur trouvé: ", data)
    } catch (error) {
        console.log("Erreur reseau ou connexion (findOne)")
    }
  }

  const handleDeleteOne = async () => {
    if (!userOne) {
      console.log("Aucun utilisateur fourni")
      return 
    }

    try {
      const response = await fetch(`/api/users/${userOne}/delete` , {
        method: "DELETE",
        headers: {
          "Content-type" : "application/json"
        }
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression d'un utilisateur")
      }

      const data = await response.json()
      console.log("Utilisateur supprimé", data)
    } catch (error) {
      console.log("Erreur reseau ou connexion (deleteOne)")
    }
  }

  const handleUpdateOne = async () => {

    if (!updateUserOne || !userOne) {
      console.log("Aucun utilisateur fourni")
      return 
    }

    try {
      const response = await fetch (`api/users/${userOne}/update`, {
        method: "PATCH",
        headers: {
          "Content-type" : "application/json"
        }, 
        body : JSON.stringify(updateUserOne)
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Utilisateur modifié avec succès")
      } else {
        console.log("Erreur lors de la modification de l\'utilisateur")
    }
    } catch (error) {
      console.error("Erreur réseau ou autre: ", error)
    }
  }

  const handleChangeUpdate = ((e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUserOne(e.target.value)
  })

  const handleChange = ((e : React.ChangeEvent<HTMLInputElement>) => {
    setUserOne(e.target.value)
  })

  console.log("USER ONE : ", updateUserOne)
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
        <button onClick = {handleDeleteOne} className= "mt-2 w-[80px] cursor-pointer text-white p-2 bg-blue-400 rounded-md hover:bg-yellow-500">
          DELETE ONE
        </button>
        <button onClick = {handleUpdateOne} className= "my-2 w-[80px] cursor-pointer text-white p-2 bg-blue-400 rounded-md hover:bg-yellow-500">
          UPDATE ONE
        </button>
        <input 
          type="text" 
          className="border p-2 mr-4" placeholder="search..."
          onChange={handleChangeUpdate} 
          value= {updateUserOne}>
        </input>
        <p>Utilisateur trouvé</p>
      </div>

    </div>
  );
}