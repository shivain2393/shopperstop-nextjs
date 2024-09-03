import dbConnect from "@/lib/dbConnect";
import { verifyJWT } from "@/middlewares/verifyJWT";
import { UserModel } from "@/models/user";

export async function POST(request){

    await dbConnect();

    const { cart } = await request.json();

    const decodedUser = await verifyJWT();

    if(decodedUser instanceof Response){
        return decodedUser;
    }

    try {

        const user = await UserModel.findById(decodedUser.userId).select("-password");

        if(!user){
            return new Response({
                message: "User Cart does not exist"
            }, { status: 401 });
        }

        user.shoppingCart = cart;

        await user.save();

        return new Response({
            message: "Cart updated successfully"
        }, { status: 200 })
        
    } catch (error) {
        return new Response({
            message: "Error in updating cart",
            error: error.message,
        }, { status: 500})
    }
}