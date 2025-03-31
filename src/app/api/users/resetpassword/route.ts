import { connectDB } from "@/db/dbConfig";
import User from "@/models/user.models";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, token } = reqBody;

    if (!password || !token) {
      return NextResponse.json(
        { error: "Missing password or token in request body" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      const tokenExpired = await User.findOne({ verifyToken: token });
      if (tokenExpired) {
        return NextResponse.json(
          { error: "Token has expired, request a new reset link" },
          { status: 402 }
        );
      }

      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt).catch(() => {
      throw new Error("Error hashing password");
    });

    await User.findOneAndUpdate(
      { verifyToken: token },
      {
        $set: {
          password: hashPassword,
          verifyToken: undefined,
          verifyTokenExpiry: undefined,
        },
      }
    );

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
