import {connectDB} from "@/db/dbConfig";
import User from "@/models/user.models.js";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody;

        console.log("Login credentials : " , reqBody);
    
        if(!email || !password){
            return NextResponse.json({error : "Please enter all the fields"}, {status : 400});
        }
    
        const user = await User.findOne({email});
    
        if(!user){
            return NextResponse.json({error : "user does not exist"} ,{status : 403})
        }
    
        const isPasswordCorrect =  await bcryptjs.compare(password,user.password);
    
        if(!isPasswordCorrect){
            return NextResponse.json({error : "Invalid password"} , {status : 404});
        }
    
        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }
    
        const token = jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!,
            {expiresIn : "1d"}
        );
    
        const response = NextResponse.json({message : "Login successful"} , {status : 200});
    
        const options ={
            httpOnly : true,
            secure : true,
        }
        
        response.cookies.set("Login Token",token,options)
    
        return response;

    } catch (error : any) {
        return NextResponse.json({error : error.message} , {status : 502})
    }
}