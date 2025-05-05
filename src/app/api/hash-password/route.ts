import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
    const { password } = await req.json()
    const salt = generateSalt()

    return new Promise((resolve, reject) => {
        crypto.scrypt(password.normalize(), salt, 64, (err, hash) => {
            if (err) {
                reject(NextResponse.json({ error: 'Hashing failed' }, { status: 500 }))
            } else {
                resolve(NextResponse.json({ hash: hash.toString('hex'), salt: salt}, { status : 200} ))
            }
        })
    })
}

export function generateSalt() {
    return crypto.randomBytes(16).toString("hex").normalize()
}