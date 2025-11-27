// import nodemailer from "nodemailer";
// export const sendEmail = async ({ to, subject, text, html }) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail", // or use host/port for other SMTP
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const info = await transporter.sendMail({
//     from: `"${process.env.FROM_NAME}" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     text,
//     html,
//   });

//   return info;
// };

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Email Send Error:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Resend Critical Error:", err);
    return null;
  }
};
