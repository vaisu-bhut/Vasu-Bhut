import "dotenv/config";

export const env = {
  port: Number(process.env.PORT || 5000),
  resendApiKey: process.env.RESEND_API_KEY,
  mailFrom: process.env.MAIL_FROM,
};

// basic guard – crash fast if something critical is missing
for (const [key, val] of Object.entries(env)) {
  if (!val) throw new Error(`Missing env var: ${key}`);
}
