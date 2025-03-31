import { connectDB } from "@/db/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user.models";
import { NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findById(userId).select("-password");

    return NextResponse.json({message : "User found successfully",userData : user , success : true});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
