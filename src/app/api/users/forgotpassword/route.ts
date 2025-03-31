import { connectDB } from "@/db/dbConfig";
import { sendEmail } from "@/helpers/mailers";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    //check if user exists with that email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    //send reset password email
    await sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: user._id,
    });

    await user.save();

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
}
