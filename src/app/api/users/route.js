import { connection } from "@/db/connection";
import { userModel } from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connection();

// Get all users
export const GET = async () => {
  try {
    const users = await userModel.find().select("-password").populate("notes");
    return NextResponse.json({
      msg: "All Users Have Been successfully fetched",
      success: true,
      result: users,
    });
  } catch (error) {
    return NextResponse.json({
      msg: error.message,
      success: false,
      result: null,
    });
  }
};

//register user
export const POST = async (req) => {
  const { name, email, password } = await req.json();
  try {
    //check user is exists or not
    const isExists = await userModel.findOne({ email });
    if (isExists) {
      throw new Error("This Email is Already Registered!");
    }
    // Hash the password before saving the user
    const passWithSecrete = password + process.env.BYCRIPT_SECRETE;
    const hashedPassword = await bcrypt.hash(passWithSecrete, 10);
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Set expiration time here
    });
    const { password: password2, ...filterdUserData } = user._doc;
    const response = NextResponse.json({
      msg: "you have been successfully registered",
      success: true,
      token,
      result: filterdUserData,
    });
    response.cookies.set("authToken", token, {
      secure: true, // Only send over HTTPS connections
      maxAge: 3600, // Set cookie expiration time in seconds (1 hour)
      // httpOnly: true, // Prevent access from client-side JavaScript
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
