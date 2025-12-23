import { User } from "./user.model.js";

export const createUserIntoDB = async (userData) => {
  const { name, email, password, phone, address } = userData;
  console.log(userData);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash the password

  // const saltRounds = 10;
  // const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    name,
    email,
    // password: hashedPassword,
    password,
    phone,
    address,
  });

  return newUser;
};

export const getAllUserFormDB = async () => {
  const allUser = await User.find();
  return allUser;
};

export const updateUserInDB = async (id, updatedData) => {
  console.log(id, updatedData);
  const allowedFields = ["name", "phone"];
  const dataToUpdate = {};

  allowedFields.forEach((field) => {
    if (updatedData[field] !== undefined) {
      dataToUpdate[field] = updatedData[field];
    }
  });

  // const existingUser = await User.findOne({ _id: id, isDeleted: false });
  const existingUser = await User.findOne({ _id: id });

  if (!existingUser) {
    throw new Error("User not found or has been deleted");
  }

  return await User.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
    runValidators: true,
  });
};

export const deleteUserFromDB = async (id) => {
  console.log("delete id", id);
  const existingUser = await User.findOne({ _id: id });

  if (!existingUser) {
    throw new Error("User not found or has been deleted");
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return updatedUser;
};
