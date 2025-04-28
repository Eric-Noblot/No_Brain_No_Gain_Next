"use client"

import { useState } from "react"
import Link from "next/link"

export default function Login() {

    const [formData, setFormData] = useState({
        name : "",
        email: "",
        password: ""
    })

    const [submitted, setSubmitted] = useState(false)
    const [formError, setFormError] = useState("")

    const handleChange = ((e : React.ChangeEvent<HTMLInputElement>) => {
        setFormError("")
        const { name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name] : value,
        }))
    })

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault()
        if (emailValidity(formData.email)) {
            try {
                const response = await fetch ("api/users/route", {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(formData)
                })
                if (response.ok) {
                    const data = await response.json()
                    console.log("Utilisateur crée avec succès: ", data)
                    setSubmitted(true)
                } else {
                    console.log("Erreur lors de la création de l\'utilisateur")
                }
            } catch (error) {
                console.error("Erreur réseau ou autre: ", error)
            }
        }
    }

    const emailValidity = ((email : string) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email == "") {
            setFormError("L'adresse mail est vide")
            return
        } else if (regex.test(email) === false) {
            setFormError("L'adresse mail n'est pas valide")
            return
        } else {
            setFormError("")
            return true
        }
    })


    return (
        <div className="bg-pink-300 min-h-screen flex justify-center items-center flex flex-col">
            <h2 className="font-bold mb-2">Formulaire</h2>
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
                    <button className= "mt-2 cursor-pointer text-white p-2 bg-blue-400 rounded-md hover:bg-yellow-500" type="submit">
                        SUBMIT
                    </button>
                </div>
            </form>
                {
                submitted && <p className="text-green-800 font-bold mt-2">Formulaire envoyé !</p>
                }
                {formError}
                <Link className="hover:text-yellow-600" href="/signin">Sign in...</Link>
        </div>
    )
}