import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // ----------- validation helpers -------------
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;

  const validate = (values: FormValues): FormErrors => {
    const v: FormErrors = {};

    if (!values.name.trim()) v.name = "Name is required";
    else if (values.name.trim().length < 2)
      v.name = "Name must be at least 2 chars";

    if (!values.email.trim()) v.email = "Email is required";
    else if (!emailRegex.test(values.email)) v.email = "Invalid email address";

    if (!values.subject.trim()) v.subject = "Subject is required";
    else if (values.subject.length < 4)
      v.subject = "Subject must be at least 4 chars";

    if (!values.message.trim()) v.message = "Message is required";
    else if (values.message.length < 10)
      v.message = "Message must be at least 10 chars";

    return v;
  };

  // clear an individual field error when user edits it
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormValues])
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name as keyof FormValues];
        return copy;
      });
  };

  async function sendContact(data: FormValues) {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to send message");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(formState);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return; // don’t submit if invalid
    }

    setIsSubmitting(true);
    try {
      await sendContact(formState);
      setFormSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ------------ UI -----------------
  const inputStyles = (field: keyof FormValues) =>
    `w-full px-4 py-2 bg-background rounded-md border 
      ${errors[field] ? "border-destructive" : "border-muted"}
      focus:outline-none focus:ring-2 
      ${errors[field] ? "focus:ring-destructive" : "focus:ring-primary"}`;

      return (
        <section
          id="contact"
          className="page-section bg-gradient-to-b from-background to-muted/20 relative"
        >
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
    
          <div className="section-container">
            <h2 className="section-title">Get In Touch</h2>
    
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* left column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-6">Let's Talk</h3>
                <p className="text-muted-foreground mb-8">
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision.
                </p>
    
                {/* contact details */}
                <div className="space-y-6">
                  {/* email */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Email</h4>
                      <a
                        href="mailto:bhut.v@northeastern.edu"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        bhut.v@northeastern.edu
                      </a>
                    </div>
                  </div>
                  {/* phone */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Phone className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Phone</h4>
                      <a
                        href="tel:6177771024"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +1&nbsp;(617)&nbsp;777‑1024
                      </a>
                    </div>
                  </div>
                  {/* location */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Location</h4>
                      <p className="text-muted-foreground">
                        Boston, MA, USA
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
    
              {/* right column – form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-lg blur opacity-30" />
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="relative bg-muted/50 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-muted"
                >
                  {/* NAME */}
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                      className={inputStyles("name")}
                      placeholder="Your Good Name"
                      required
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>
    
                  {/* EMAIL */}
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={inputStyles("email")}
                      placeholder="you@domain.com"
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>
    
                  {/* SUBJECT */}
                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formState.subject}
                      onChange={handleChange}
                      className={inputStyles("subject")}
                      placeholder="What's this regarding?"
                      required
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.subject}
                      </p>
                    )}
                  </div>
    
                  {/* MESSAGE */}
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      className={`${inputStyles(
                        "message"
                      )} resize-none`}
                      placeholder="Your message..."
                      required
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>
    
                  {/* SUBMIT BTN */}
                  <button
                    type="submit"
                    disabled={isSubmitting || formSubmitted}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white font-medium py-3 rounded-md hover:opacity-90 transition-opacity relative overflow-hidden disabled:opacity-50"
                  >
                    <span
                      className={`transition-opacity duration-300 ${
                        isSubmitting ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      {formSubmitted ? "Message Sent!" : "Send Message"}
                    </span>
    
                    {isSubmitting && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
    
                  {formSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center mt-4 text-sm text-green-500"
                    >
                      Thanks for your message! I'll get back to you soon.
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      );
    };
    
    export default Contact;    