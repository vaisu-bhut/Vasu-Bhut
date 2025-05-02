import { Resend } from "resend";
import { env } from "./config.js";

const resend = new Resend(env.resendApiKey);

/**
 * @param {{name:string,email:string,subject:string,message:string}} payload
 */
export async function sendContactEmail(payload) {
  const html = `
    <h2>New portfolio enquiry</h2>
    <p><b>Name:</b> ${payload.name}</p>
    <p><b>Email:</b> <a href="mailto:${payload.email}">${payload.email}</a></p>
    <p><b>Subject:</b> ${payload.subject}</p>
    <pre style="white-space:pre-wrap;font-family:inherit">${payload.message}</pre>
  `;

  const result = await resend.emails.send({
    from: `Portfolio <${env.mailFrom}>`,
    to: ["vasubhut157@gmail.com"],
    subject: `📬 ${payload.subject}`,
    html,
  });  
  return result;
}
