import { User } from "../users/user.model.js";
export const LoginUser = async ({ email, password }) => {
  // here check the user present or not
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found ");
  }
  // const isCorrectPassword = await bcrypt.compare(password, user.password);
  console.log(password, user.password);
  if (password.trim() !== user.password.trim()) {
    throw new Error("password is not correct");
  }

  console.log("users created successfully ");
  return {
    user: {
      email: user.email,
    },
  };
};
