import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: String,
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
