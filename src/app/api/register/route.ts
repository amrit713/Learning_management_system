import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, password, image } = body;

    const userExist = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      return new NextResponse("User with this email already exist", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        image,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[REGISTER ERROR]", error);
    return new NextResponse("internal error", { status: 400 });
  }
}
