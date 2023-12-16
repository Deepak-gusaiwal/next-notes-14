import { connection } from "@/db/connection";
import { noteModel } from "@/models/noteModel";
import { userModel } from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connection();

// this to get all the notes of the user
export const GET = async () => {
  try {
    const notes = await noteModel.find();
    return NextResponse.json({
      msg: "all notes are fetched",
      success: true,
      result: notes,
    });
  } catch (error) {
    return NextResponse.json({
      msg: error.message,
      success: false,
      result: null,
    });
  }
};

// add note api
export const POST = async (req) => {
  try {
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
      throw new Error("token is not found");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clientInput = await req.json();
    const userId = decoded._id;
    const user = await userModel.findById(userId);
    const note = new noteModel({ ...clientInput, userId });
    const result = await note.save();
    user.notes.push(result._id);
    await user.save();
    return NextResponse.json({
      msg: "your note has been added successfully",
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json({
      msg: error.message,
      success: false,
      result: null,
    });
  }
};
