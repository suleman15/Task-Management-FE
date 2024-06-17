import nodemailer from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import {
  SMTP_EMAIL,
  SMTP_PASSWORD,
  SMTP_USERNAME,
} from "../config/envManager.js";

const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve("src/hbs"),
    defaultLayout: false,
  },
  viewPath: path.resolve("src/hbs"),
  extName: ".hbs",
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

transporter.use("compile", hbs(handlebarOptions));

const sendEmail = async (mailOptions) => {
  try {
    const response = await transporter.sendMail({
      ...mailOptions,
      to: "sulemanahmed2704@gmail.com",
    });
    return response?.accepted?.length > 0;
  } catch (error) {
    console.log("Something went wrong while sending Emails ", error);
    return null;
  }
};

export { sendEmail };
