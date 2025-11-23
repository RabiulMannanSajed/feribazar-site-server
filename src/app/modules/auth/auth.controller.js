import { sendEmail } from "../../uitils/sendEmail.js";
import { createUserIntoDB } from "../users/user.service.js";
import { LoginUser } from "./auth.service.js";
import crypto from "crypto";

// this is for registering user by email only
export const registerByEmail = async (req, res, next) => {
  try {
    const { email, name = "", phone = "", address = "" } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    // Validate email simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    // Generate a random password (8 chars hex)
    const generatedPassword = crypto.randomBytes(4).toString("hex"); // e.g. 'a3b12f8e'

    // Save the user into DB - your createUserIntoDB hashes password
    const newUser = await createUserIntoDB({
      name,
      email,
      password: generatedPassword,
      phone,
      address,
    });

    // Prepare login url (frontend will read email query param)
    const loginUrl = `${
      process.env.FRONTEND_URL
    }/login?email=${encodeURIComponent(email)}`;

    // Compose email
    const subject = "Welcome to feriBazar — your account is ready";
    const text = `Hello,

Your account has been created.
Email: ${email}
Password: ${generatedPassword}

Login here: ${loginUrl}

Please change your password after logging in.
`;

    const html = `
      <div style="font-family:Arial, sans-serif; line-height:1.4;">
        <h2>Welcome to feriBazar 🎉</h2>
        <p>Your account has been created successfully.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${generatedPassword}</p>
        <p>
          <a href="${loginUrl}" style="display:inline-block;padding:10px 16px;border-radius:6px;text-decoration:none;border:1px solid #3b82f6;">
            Click to Login
          </a>
        </p>
        <p style="font-size:12px;color:#666">For security, please change your password after logging in.</p>
      </div>
    `;

    await sendEmail({ to: email, subject, text, html });

    res.status(201).json({
      success: true,
      message: "Account created. Generated password sent to the given email.",
      data: { email: newUser.email },
    });
  } catch (error) {
    // if createUserIntoDB throws 'User with this email already exists' it will be handled here
    next(error);
  }
};

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
