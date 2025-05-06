"use client"

import { useState } from "react"

export default function Login() {

    const [formData, setFormData] = useState({
        name : "",
        email: "",
        password: ""
    })

    const [userOne, setUserOne] = useState("")
    const [updateUserOne, setUpdateUserOne] = useState("")

    const handleChange = ((e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name] : value,
        }))
    })

    const handleChangeUpdate = ((e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateUserOne(e.target.value)
    })

    const handleChangeGetInput = ((e : React.ChangeEvent<HTMLInputElement>) => {
        setUserOne(e.target.value)
    })

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch ("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                const data = await response.json()
                console.log("Utilisateur crée avec succès: ", data)
            } else {
                console.log("Erreur lors de la création de l\'utilisateur")
            }
        } catch (error) {
            console.error("Erreur réseau ou autre: ", error)
        }
    }

    const handleGet = async () => {
        try {
            const response = await fetch("/api/users", {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                },
            })
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des utilisateurs")
            }
            const data = await response.json()
            console.log("MA DATA: ", data)
        }
        catch(error) {
            console.log("Erreur reseau ou connexion (get)", error)
        }
    }

    const handleFindOne = async () => {
        if (!userOne) {
        console.log("Aucun utilisateur fourni")
        return 
        }
        try {
            const response = await fetch(`/api/users/${userOne}`, {
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
        const response = await fetch(`/api/users/${userOne}` , {
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
        const response = await fetch (`api/users/${userOne}`, {
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

    return (
        <div className="bg-yellow-100 min-h-screen flex justify-center items-center flex flex-col">
            <h2 className="font-bold mb-2">Opération CRUD</h2>
            <form onSubmit = {handleSubmit} className="">
                <div>
                    <label className= "block" htmlFor="name">Name</label>
                    <input 
                    onChange={handleChange}
                    value = {formData.name}
                    className= "block p-2 bg-grey-200 border w-full" 
                    name="name" 
                    id="name" 
                    type="text" 
                    placeholder="Name"
                    autoComplete="off">
                    </input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                     onChange={handleChange}
                     value={formData.email}
                     className= "p-2 bg-grey-200 border w-full" 
                     name="email" 
                     id ="email" 
                     type="email" 
                     placeholder="Email"
                     autoComplete="off">
                     </input>
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                     type="password"
                     id="password"
                     name="password"
                     className= "p-2 bg-grey-200 border w-full"
                     placeholder="Mot de passe"
                     autoComplete="off"
                     onChange={handleChange}
                     value = {formData.password}
                     >
                     </input>
                </div>
                <div className="text-center">
                    <button className= "mt-2 cursor-pointer text-white p-2 bg-blue-700 rounded-md hover:bg-yellow-500" type="submit">
                        POST
                    </button>
                </div>
            </form>
            <div className ="border m-4 p-4">
                <button onClick = {handleGet} className= "ml-6 mt-2 cursor-pointer text-white p-2 bg-blue-700 rounded-md hover:bg-yellow-500">
                        GET
                </button>
                <input 
                    type="text" 
                    className="border p-2 mx-4" placeholder="Recherche sur name"
                    onChange={handleChangeGetInput} 
                    value= {userOne}>
                </input>
                <button onClick = {handleFindOne} className= "mx-2 w-[80px] cursor-pointer text-white p-2 bg-blue-700 rounded-md hover:bg-yellow-500">
                    FIND ONE
                </button>
                <button onClick = {handleDeleteOne} className= "mx-2 w-[80px] cursor-pointer text-white p-2 bg-blue-700 rounded-md hover:bg-yellow-500">
                    DELETE ONE
                </button>
                <button onClick = {handleUpdateOne} className= "mx-2 w-[80px] cursor-pointer text-white p-2 bg-blue-700 rounded-md hover:bg-yellow-500">
                    UPDATE ONE
                </button>
                <input 
                    type="text" 
                    className="border p-2 mx-4" placeholder="Nouveau name à Update"
                    onChange={handleChangeUpdate} 
                    value= {updateUserOne}>
                </input>
            </div>
        </div>
    )
}