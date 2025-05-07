import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from "../../../../../lib/connexion"

export async function POST(req: NextRequest) {
  try {
    const { userId, category, level } = await req.json();

    await connectToDatabase();

    const result = await db.collection('users').updateOne(
      { uid: userId },
      {
        $set: {
          [`progress.${category}`]: level,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Database update failed' }, { status: 500 });
  }
}