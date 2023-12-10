import { connection } from "@/db/connection";
import { noteModel } from "@/models/noteModel";
import { NextResponse } from "next/server";
connection();

//get user notes
export const GET = async (req, { params }) => {
  const id = params.id;
  try {
    const notes = await noteModel.find({ userId: id });
    return NextResponse.json({
      msg: "your all notes are fetched",
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
