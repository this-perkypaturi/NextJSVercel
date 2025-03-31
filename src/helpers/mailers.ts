import nodemailer from "nodemailer";
import User from "@/models/user.models";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedUserId = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedUserId,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedUserId,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "Nw9wH@example.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
            <h1>${
              emailType === "VERIFY"
                ? "Verify your email"
                : "Reset your password"
            }</h1>
            <p>Click 
            <a href="${
              process.env.DOMAIN
            }/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedUserId}">here</a>
             to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.</p>
            <p>This link will expire in 1 hour.</p>
        `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
