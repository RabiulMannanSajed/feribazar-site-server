import nodemailer from "nodemailer";
export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use host/port for other SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"${process.env.FROM_NAME}" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });

  return info;
};
