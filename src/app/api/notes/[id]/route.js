const { noteModel } = require("@/models/noteModel");
import { connection } from "@/db/connection";
import { userModel } from "@/models/userModel";
import { NextResponse } from "next/server";
connection();
// get single note
export const GET = async (req, { params }) => {
  const id = params.id;
  try {
    const note = await noteModel.findById(id);
    console.log("note is", note);
    if (!note) {
      throw new Error("failed to find your note");
    }
    return NextResponse.json({
      msg: "successfully fetch the single note",
      success: true,
      result: note,
    });
  } catch (error) {
    return NextResponse.json({
      msg: error.message,
      success: false,
      result: null,
    });
  }
};

// update note

export const PUT = async (req, { params }) => {
  const id = params.id;
  try {
    const clientInputs = await req.json();
    const note = await noteModel.findByIdAndUpdate(
      id,
      {
        ...clientInputs,
        lastEdit: Date.now(),
      },
      { new: true, runValidators: true }
    );
    if (!note) {
      throw new Error("failed to find and update the note");
    }
    return NextResponse.json({
      msg: "note has been successfully updated",
      success: true,
      result: note,
    });
  } catch (error) {
    return NextResponse.json({
      msg: error.message,
      success: false,
      result: null,
    });
  }
};

//Delete the note
export const DELETE = async (req, { params }) => {
  const id = params.id;

  try {
    const deletedNote = await noteModel.findByIdAndDelete(id);
    const userId = deletedNote.userId;
    const user = await userModel.findById(userId);
    user.notes.pull(deletedNote._id);
    await user.save();

    if (!deletedNote) {
      throw new Error("Note not found to delete");
    }
    return NextResponse.json({
      msg: "Note deleted successfully",
      success: true,
      result: deletedNote,
    });
  } catch (error) {
    return NextResponse.json({
      msg: error.message,
      success: false,
      result: null,
    });
  }
};
