import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to Rohit's MongoDB");
    });

    connection.on("error", (err) => {
      console.log("Error in connecting to MongoDB in try block", err);
      process.exit(1);
    });
  } catch (error) {
    console.log(
      "Something went wrong in MongoDB connection in catch block",
      error
    );
  }
}
