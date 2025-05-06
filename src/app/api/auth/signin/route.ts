import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { connectToDatabase } from '../../../../../lib/connexion'
import { User } from '@/app/models/user'

export async function POST(req: Request) {
  try {
    await connectToDatabase()

    const { name, password } = await req.json()

    const user = await User.findOne({ name })
    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    const derivedKey: Buffer = await new Promise((resolve, reject) => {
      crypto.scrypt(password.normalize(), user.salt, 64, (err, key) => {
        if (err) return reject(err)
        resolve(key)
      })
    })
    const candidateHash = derivedKey.toString('hex')

    const match = crypto.timingSafeEqual(
      Buffer.from(candidateHash, 'hex'),
      Buffer.from(user.password, 'hex')
    )

    if (!match) {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      )
    }

    return NextResponse.json(
    //   { message: 'Connexion réussie', user: { name: user.name, email: user.email } },
      { message: 'Connexion réussie', user: user },
      { status: 200 }
    )

  } catch (err) {
    console.error('Erreur dans signin:', err)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la connexion' },
      { status: 500 }
    )
  }
}
