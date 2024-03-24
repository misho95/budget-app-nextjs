import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI ? process.env.MONGODB_URI : "");
  } catch (error) {
    return { message: "can't connect to mongodb", error: error };
  }
};

export default connectMongoDB;
