import bcrypt from "bcryptjs";
import { User } from "../users/user.model.js";
export const LoginUser = async ({ email, password }) => {
  // here check the user present or not

  const user = await User.findOne({ email });
  console.log("user", user);
  if (!user) {
    throw new Error("User not found ");
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    throw new Error("password is not correct");
  }

  return {
    user: {
      email: user.email,
      role: user.role,
    },
  };
};
