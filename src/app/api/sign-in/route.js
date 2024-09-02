import jwt from "jsonwebtoken";
import { UserModel } from "@/models/user";
import bcryptjs from "bcryptjs";
import dbConnect from "@/lib/dbConnect";

export async function POST(request) {
    await dbConnect();

    try {
        const { username, password } = await request.json();
        const user = await UserModel.findOne({ username });

        if (!user) {
            return new Response(
                JSON.stringify({ message: "User does not exist" }),
                { status: 404 }
            );
        }

        const isPasswordCorrect = bcryptjs.compareSync(password, user.password);

        if (!isPasswordCorrect) {
            return new Response(
                JSON.stringify({ message: "Invalid Username or Password" }),
                { status: 404 }
            );
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Exclude the password from the user object before sending the response
        const { password: _, ...userWithoutPassword } = user._doc;

        // Set the cookie and send the response
        return new Response(
            JSON.stringify({ data: userWithoutPassword }),
            {
                status: 200,
                headers: {
                    "Set-Cookie": `access_token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: "Error in Signing In",
                error: error.message,
            }),
            { status: 500 }
        );
    }
}
