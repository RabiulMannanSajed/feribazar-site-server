import {
  createUserIntoDB,
  deleteUserFromDB,
  getAllUserFormDB,
  updateUserInDB,
} from "./user.service.js";

export const createUser = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const result = await createUserIntoDB(userInfo);
    res.status(200).json({
      success: true,
      message: "Students is are retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const result = await getAllUserFormDB();
    res.status(200).json({
      success: true,
      message: "Students is are created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const result = await updateUserInDB(userId, req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const result = await deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
