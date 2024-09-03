import dbConnect from "@/lib/dbConnect";
import { verifyJWT } from "@/middlewares/verifyJWT";
import { UserModel } from "@/models/user";

export async function GET() {
    await dbConnect();

    const decodedUser = await verifyJWT();
    
    if (decodedUser instanceof Response) {
        return decodedUser;
    }

    try {
        const user = await UserModel.findById(decodedUser.userId).select("-password");

        if (!user) {
            return new Response(
                JSON.stringify({ message: "User Cart does not exist" }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({
                message: "Fetched User Cart Successfully",
                data: user.shoppingCart
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: "Error in fetching cart",
                error: error.message
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
