import { transporter } from "../config/nodemailer.js";
import { logger } from "./logger.js";

// Used by every form submission. Never throws: a failed email
// must not prevent the enquiry from being saved.
export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    });
  } catch (error) {
    logger.warn({ err: error.message }, "Email failed to send");
  }
};

const summary = (form) =>
  Object.entries(form)
    .filter(([key]) => !["message", "website", "preferredTime"].includes(key))
    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
    .join("");

export const confirmationEmail = (name, type) => ({
  subject: `We received your ${type}`,
  html: `
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto">
      <h2>Thank you, ${name}</h2>
      <p>This email confirms that we received your ${type} on our website. Our team will get back to you within one working day.</p>
      <p>If you need a faster answer, call us: +977 980 385 0955</p>
      <p>— NEBCO</p>
    </div>`,
});

export const notificationEmail = (form, type) => ({
  subject: `New website ${type} from ${form.name}`,
  html: `
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto">
      <h2>New ${type}</h2>
      <ul>${summary(form)}</ul>
      ${form.message ? `<p><strong>Message:</strong> ${form.message}</p>` : ""}
    </div>`,
});
