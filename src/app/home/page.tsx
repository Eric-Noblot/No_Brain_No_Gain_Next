"use client"

import { connectToDatabase } from "../../../lib/connexion";
import { useState } from "react";

export const dynamic = "force-dynamic"; // Ça force Next.js à exécuter la route API à chaque requête, sans utiliser le cache.

export default function Home() {

  

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <h1>HOME PAGE</h1>
      <h2>Bienvenue Eric !</h2>
      <div className="text-center flex flex-col w-[200px] items-center">
       
        <p>Utilisateur trouvé</p>
      </div>

    </div>
  );
}