import { SMTP_EMAIL, SMTP_USERNAME } from "../config/envManager.js";
import { encrptUsingCypres } from "../helpers/cypresSetup.js";
import { sendEmail } from "../utils/mailer.js";

export const sendForgetPasswordMail = async ({
  email,
  recordId,
  username,
  location,
}) => {
  const context = {
    username,
    country: location?.country,
    state: location?.state,
    city: location?.city,
    town: location?.town,
    buttonURL: `http://localhost:3000/reset-password/${await encrptUsingCypres(
      recordId
    )}`,
  };

  const mailOptions = {
    from: `${SMTP_USERNAME} <${SMTP_EMAIL}>`,
    to: email,
    subject: "ECOMMERCE - RESET PASSWORD",
    template: "ForgetPassword",
    context,
  };

  const mailResponse = await sendEmail(mailOptions);
  return mailResponse;
};
