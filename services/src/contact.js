// src/routes/contact.js   (patched)
import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { sendContactEmail } from "./resendMailer.js";

const router = Router();
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10)
});

router.post("/contact", rateLimit({ windowMs: 60_000, max: 2 }), async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ errors: parsed.error.flatten() });

  const result = await sendContactEmail(parsed.data);   // 👉 returns full Resend response

  if (result.error) {
    console.error("Resend error:", result.error);
    return res.status(500).json({ ok:false, error: result.error.message });
  }

  return res.json({ ok:true, id: result.id });          // surface the real message‑id
});

export default router;
