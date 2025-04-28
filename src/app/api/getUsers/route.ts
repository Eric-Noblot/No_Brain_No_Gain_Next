import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
      console.log("test")
      return NextResponse.json({ result: "bro" });
    } catch (error) {
      return NextResponse.json(
        { error: "Error" },
        { status: 500 }
      );
    }
  }