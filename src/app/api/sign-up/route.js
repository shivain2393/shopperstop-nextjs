import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user";
import { signUpSchema } from "@/validators/signUp";
import bcryptjs from "bcryptjs";

export async function POST(request){
    await dbConnect();

    try {
        const data = await request.json();
    
        const isValid = signUpSchema.safeParse(data);
    
        if(!isValid.success){
            return Response.json({
                message: "Please enter valid information",
                error: isValid.error?.errors
            }, {
                status: 400
            })
        }
    
        const hashedPassword = bcryptjs.hashSync(isValid.data.password, 10);
    
    
        const user = new UserModel({
            ...isValid.data,
            password: hashedPassword
        });

        await user.save();

        return Response.json({
            message: "User created successfully"
        }, { status: 200 });

    } catch (error) {
        return Response.json({
            message: "Error in creating User",
            error: error.message
        }, { status: 500 })   
    }
}