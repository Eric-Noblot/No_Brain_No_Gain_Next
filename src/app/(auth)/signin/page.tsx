"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"


export default function Signin () {

    const router = useRouter()

    const [formData, setFormData] = useState({
        name: "",
        password: ""
    })

    const handleChange = ((e : React.ChangeEvent<HTMLInputElement>) => {
        // setFormError("")
        const { name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name] : value,
        }))
    })

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault()

        try {

            const response = await fetch (`api/password/${formData}`, {
                method: "GET",
                headers : {"Content-Type" : "application/json"},
            })

            if (!response.ok) {
                throw new Error("Erreur lors de la récuparation d'un utilisateur")
            }

            const data = await response.json()
            console.log("Utilisateur trouvé: ", data)

        } catch (error) {
            console.log("Erreur lors de la connexion de l'utilisateur", error)
        }
    }

    return (
        <div className="bg-pink-300 min-h-screen flex justify-center items-center flex flex-col">
            <h2 className="font-bold mb-2">Connexion</h2>
            <form onSubmit = {handleSubmit} className="">
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                     onChange={handleChange}
                     value={formData.name}
                     className= "p-2 bg-grey-200 border w-full" 
                     name="name" 
                     id ="name" 
                     type="text" 
                     placeholder="Name"
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
                    <button className= "mt-2 cursor-pointer text-white p-2 bg-blue-400 rounded-md hover:bg-yellow-500" type="submit">
                        SUBMIT
                    </button>
                </div>
            </form>
                {/* {
                submitted && <p className="text-green-800 font-bold mt-2">Formulaire envoyé !</p>
                } */}
                {/* {formError} */}
                <Link className="hover:text-yellow-600" href="/signup">Sign up...</Link>
        </div>
    )
}