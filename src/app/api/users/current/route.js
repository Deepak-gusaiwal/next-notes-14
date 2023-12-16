import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { userModel } from "@/models/userModel";

export const GET = async (req) => {
  try {
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
      throw new Error("token is not found");
    }
    let userId;
    // when there has wrong token jwt.verify throw the error and directly calls the catch part so for defining the custom error we use another trycatch block for it
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded._id;
    } catch (error) {
      const response = NextResponse.json({
        msg: "Invalid Token",
        success: false,
        result: null,
      });
      response.cookies.set("authToken", "");
      return response;
    }

    // // Check if the token is expired
    // const now = Date.now() / 1000; // Convert current time to seconds
    // const expiryTime = decoded.exp; // Get the token expiration time
    // if (now > expiryTime) {
    //   // Token is expired
    //   console.log("the token is expired");
    //   return NextResponse.json({
    //     msg: "Token has expired",
    //     success: false,
    //     result: null,
    //   });
    // }
    //now fetch the user details
    const user = await userModel.findById(userId);
    if (!user) {
      console.log("user note found");
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
