import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyJWT() {
    const cookieStore = cookies();
    
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
        return new Response(
            JSON.stringify({
                message: "You are not logged in",
            }),
            { status: 401 } // Use 401 for unauthorized access
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
        
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: "Error in verifying login token",
                error: error.message,
            }),
            { status: 401 } // Use 401 for invalid token
        );
    }
}