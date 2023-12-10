import { connection } from "@/db/connection";
import { userModel } from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { noteModel } from "@/models/noteModel";
connection();

export const GET = async (req, { params }) => {
  const id = params.id;
  try {
    const user = await userModel.findById(id).populate("notes");
    if (!user) {
      throw new Error("user has not been found");
    }
    return NextResponse.json({
      msg: "single user data has been fetched",
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

// update user details
export const PUT = async (req, { params }) => {
  const id = params.id;
  try {
    const { name, email, password } = await req.json();
    // hasPassword if exists
    let hashedPassword;
    if (password) {
      const passWithSecrete = password + process.env.BYCRIPT_SECRETE;
      hashedPassword = await bcryptjs.hash(passWithSecrete, 10);
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser) {
      throw new Error("user has been not found to update");
    }
    return NextResponse.json({
      msg: "user data has been updated successfully",
      success: true,
      result: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({
      msg: error.message,
      success: false,
      result: null,
    });
  }
};

//delete user
export const DELETE = async (req, { params }) => {
  const id = params.id;
  try {
    // Delete the user's notes
    await noteModel.deleteMany({ userId: id });
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error("User not found to delete");
    }
    return NextResponse.json({
      msg: "User and associated notes deleted successfully",
      success: true,
      result: deletedUser,
    });
  } catch (error) {
    return NextResponse.json({
      msg: error.message,
      success: false,
      result: null,
    });
  }
};
