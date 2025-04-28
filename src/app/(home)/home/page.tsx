import { connectToDatabase } from "../../../../lib/connexion";

export const dynamic = "force-dynamic"; // <-- pour s'assurer que ça soit exécuté à chaque requête (important)

export default async function Home() {
  await connectToDatabase();  // On se connecte à MongoDB
  return (
    <div>
      <h1>Connexion MongoDB réussie !</h1>
    </div>
  );
}