import { verifyJWT } from "@/middlewares/verifyJWT";

export async function GET() {
    const decodedUser = await verifyJWT();

    if(decodedUser instanceof Response){
        return decodedUser;
    }
    
    try {
        // Handle sign out logic, e.g., clear the cookie
        return new Response(
            JSON.stringify({
                message: "Successfully signed out",
            }),
            {
                status: 200,
                headers: {
                    "Set-Cookie": "access_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict", // Clear the cookie
                },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: "Error in Signing Out",
                error: error.message,
            }),
            { status: 500 } // Use 500 for server errors
        );
    }
}