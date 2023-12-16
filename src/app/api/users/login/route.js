import { connection } from "@/db/connection";
import { userModel } from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
connection();

export const POST = async (req) => {
  try {
    const { email, password } = await req.json();
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("user note found!");
    }
    // Compare the password with the hashed password
    const passWithSecrete = password + process.env.BYCRIPT_SECRETE;
    const isPasswordValid = bcrypt.compareSync(passWithSecrete, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials!");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    const { password: password2, ...filterdUserData } = user._doc;
    const response = NextResponse.json({
      msg: "you have been logged in",
      success: true,
      token,
      result: filterdUserData,
    });
    //if the token is expired it will automatically remove the cookie from the browser
    response.cookies.set("authToken", token, {
      secure: true, // Only send over HTTPS connections
      // maxAge: 10, // Set cookie expiration time in seconds (1 hour)
      httpsOnly: true, // Prevent access from client-side JavaScript
      // sameSite: "strict", // Prevent Cross-Site Request Forgery attacks
      //path: "/", // Set cookie path
    });
    return response;
  } catch (error) {
    return NextResponse.json({
      msg: error.message,
      success: false,
      result: null,
    });
  }
};
