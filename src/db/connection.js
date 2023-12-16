import mongoose from "mongoose";
const connectionConfig = {
  isConnected: 0,
};
export const connection = async () => {
  try {
    if (connectionConfig.isConnected) {
      console.log("already connected");
      return;
    }
    const { connection } = await mongoose.connect(process.env.DB_URL);
    connectionConfig.isConnected = connection.readyState;
    console.log(connection.readyState, "|", connectionConfig.isConnected);
    connection && console.log("connection to db has been done!");
  } catch (error) {
    console.log({
      msg: error.message,
      result: "connection to db has been failed",
    });
  }
};
