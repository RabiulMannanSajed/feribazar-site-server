import { LoginUser } from "./auth.service.js";

export const createLoginUser = async (req, res, next) => {
  try {
    const result = await LoginUser(req.body);
    console.log("result", result);
    res.status(200).json({
      success: true,
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};
