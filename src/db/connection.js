import mongoose from "mongoose";

export const connection = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_URL);
    connection && console.log("connection to db has been done!");
  } catch (error) {
    console.log({
      msg: error.message,
      result: "connection to db has been failed",
    });
  }
};
