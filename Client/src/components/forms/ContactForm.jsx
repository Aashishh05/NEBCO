import { useState } from "react";
import { Check } from "lucide-react";

const EMAIL = "nebconepal@gmail.com";

const emptyValues = { name: "", email: "", detail: "", brief: "" };

const ContactForm = ({ mode = "enquiry", context = "", onEdit }) => {
  const isCall = mode === "appointment";
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [draft, setDraft] = useState(null);

  const update = (key) => (event) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Your name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email";
    if (isCall && !values.detail.trim()) next.detail = "A preferred time is required";
    if (values.brief.trim().length < 10) next.brief = "Tell us a little more";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const subject = isCall ? "NEBCO — call request" : "NEBCO — enquiry";
    const lines = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      isCall
        ? `Preferred day, time & timezone: ${values.detail}`
        : values.detail
          ? `Project location: ${values.detail}`
          : null,
      `${isCall ? "Discussion" : "About the project"}: ${values.brief}`,
    ].filter(Boolean);

    setDraft(
      `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        lines.join("\n"),
      )}`,
    );
  };

  if (draft) {
    return (
      <div className="draft-ready">
        <Check size={30} aria-hidden="true" />
        <p>
          {isCall
            ? "Your call request is ready to send. The appointment will be confirmed by our team."
            : "Your enquiry is ready to send."}
          <br />
          Nothing has been sent yet.
        </p>
        <a className="button" href={draft}>
          Open email draft
        </a>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            setDraft(null);
            onEdit?.();
          }}
        >
          Edit my details
        </button>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={onSubmit}>
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

      <button type="submit" className="button">
        {isCall ? "Prepare my call request" : "Prepare my enquiry"}
      </button>

      <p className="form-note">
        Review and send from your email app. Your details are not stored on this website.
      </p>
    </form>
  );
};

export default ContactForm;
