import { useState } from "react";
import { Check } from "lucide-react";
import { sendEnquiry } from "@/api/enquiries.api.js";
import { sendAppointment } from "@/api/appointments.api.js";

const emptyValues = { name: "", email: "", detail: "", brief: "" };

const ContactForm = ({ mode = "enquiry", context = "", onClose }) => {
  const isCall = mode === "appointment";
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (key) => (event) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  const validate = () => {
    const next = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email";
    if (isCall && !values.detail.trim()) next.detail = "A preferred time is required";
    if (values.brief.trim().length < 5) next.brief = "Tell us a little more";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const payload = {
      name: values.name,
      email: values.email,
      message: values.brief,
      website: "",
    };

    try {
      setSending(true);
      if (isCall) {
        await sendAppointment({ ...payload, preferredTime: values.detail });
      } else {
        await sendEnquiry({ ...payload, location: values.detail });
      }
      setSent(true);
    } catch (err) {
      const next = {};
      const apiErrors = err.response?.data?.errors;
      if (Array.isArray(apiErrors)) {
        const map = {
          name: "name",
          email: "email",
          message: "brief",
          preferredTime: "detail",
          location: "detail",
          website: null,
        };
        for (const item of apiErrors) {
          const target = map[item.field];
          if (target) next[target] = item.message;
        }
      }
      next.form =
        err.response?.data?.message || "Something went wrong. Please try again.";
      setErrors(next);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="draft-ready">
        <Check size={30} aria-hidden="true" />
        <p>
          Thank you, {values.name}.
          <br />
          Your {isCall ? "call request" : "enquiry"} has been received. Our team will be in
          touch.
        </p>
        <button type="button" className="button" onClick={onClose}>
          Close
        </button>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={onSubmit} noValidate>
      {context && !isCall && (
        <p className="enquiry-context">
          Regarding <strong>{context}</strong>
        </p>
      )}

      <div className="form-row">
        <label>
          Your name
          <input
            value={values.name}
            onChange={update("name")}
            required
            autoComplete="name"
            maxLength={120}
            placeholder="Full name"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </label>

        <label>
          Email address
          <input
            type="email"
            value={values.email}
            onChange={update("email")}
            required
            autoComplete="email"
            maxLength={200}
            placeholder="you@example.com"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </label>
      </div>

      {isCall ? (
        <label>
          Preferred day, time &amp; timezone
          <input
            value={values.detail}
            onChange={update("detail")}
            required
            maxLength={180}
            placeholder="e.g. Tuesday, 6 PM, Nepal time"
          />
          {errors.detail && <span className="form-error">{errors.detail}</span>}
        </label>
      ) : (
        <label>
          Project location <span>(optional)</span>
          <input
            value={values.detail}
            onChange={update("detail")}
            maxLength={150}
            placeholder="City or area in Nepal"
          />
        </label>
      )}

      <label>
        {isCall ? "What would you like to discuss?" : "A little about your project"}
        <textarea
          value={values.brief}
          onChange={update("brief")}
          required
          minLength={10}
          maxLength={2500}
          rows={3}
          placeholder="Your home, development or partnership idea"
        />
        {errors.brief && <span className="form-error">{errors.brief}</span>}
      </label>

      {errors.form && <p className="form-error">{errors.form}</p>}

      <button type="submit" className="button" disabled={sending}>
        {sending ? "Sending…" : isCall ? "Prepare my call request" : "Prepare my enquiry"}
      </button>

      <p className="form-note">
        Your details are sent to NEBCO and reviewed by our team.
      </p>
    </form>
  );
};

export default ContactForm;
