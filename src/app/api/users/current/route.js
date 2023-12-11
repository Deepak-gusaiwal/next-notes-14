import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { userModel } from "@/models/userModel";

export const GET = async (req) => {
  try {
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
      throw new Error("token is not found");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;
    //now fetch the user details
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("you are not allowed to do that");
    }

    return NextResponse.json({
      msg: "current user details are fetched",
      success: true,
      result: user,
    });
  } catch (error) {
    return NextResponse.json({
      msg: error.message,
      success: false,
      result: null,
    });
  }
};
