import { useEffect, useState } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/layout/PageHeader";
import FormField from "@/components/forms/FormField";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Spinner from "@/components/loaders/Spinner";
import { getContact, updateContact } from "@/api/contact.api.js";
import { changePassword } from "@/api/auth.api.js";

const inputClass =
  "h-11 w-full rounded-none border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring";

const Settings = () => {
  const [contact, setContact] = useState(null);
  const [savingContact, setSavingContact] = useState(false);
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    getContact()
      .then((res) => setContact(res.data?.contact || {}))
      .catch(() => setContact({}));
  }, []);

  const set = (key) => (event) => setContact((current) => ({ ...current, [key]: event.target.value }));
  const setSocial = (key) => (event) =>
    setContact((current) => ({
      ...current,
      socials: { ...(current.socials || {}), [key]: event.target.value },
    }));

  const saveContact = async (event) => {
    event.preventDefault();
    try {
      setSavingContact(true);
      const payload = {
        company: contact.company || "",
        email: contact.email || "",
        address: contact.address || "",
        phones: (contact.phonesLabel || "")
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
        socials: contact.socials || {},
      };
      await updateContact(payload);
      toast.success("Contact details saved");
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSavingContact(false);
    }
  };

  const savePassword = async (event) => {
    event.preventDefault();
    try {
      setSavingPassword(true);
      await changePassword(passwords);
      toast.success("Password updated");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update password");
    } finally {
      setSavingPassword(false);
    }
  };

  if (!contact) {
    return (
      <div className="py-16 text-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Settings" description="Company contact details and your password." />

      <div className="grid grid-cols-2 gap-6 max-[960px]:grid-cols-1">
        <form onSubmit={saveContact} className="flex flex-col gap-4 border border-border bg-white p-6">
          <h2 className="text-lg font-bold text-ink">Contact details</h2>

          <FormField label="Company name" htmlFor="company">
            <input id="company" value={contact.company || ""} onChange={set("company")} className={inputClass} />
          </FormField>

          <FormField label="Email" htmlFor="contact-email">
            <input id="contact-email" type="email" value={contact.email || ""} onChange={set("email")} className={inputClass} />
          </FormField>

          <FormField label="Phones (comma separated)" htmlFor="phones">
            <input
              id="phones"
              value={contact.phonesLabel ?? (contact.phones || []).join(", ")}
              onChange={set("phonesLabel")}
              className={inputClass}
            />
          </FormField>

          <FormField label="Address" htmlFor="address">
            <input id="address" value={contact.address || ""} onChange={set("address")} className={inputClass} />
          </FormField>

          <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
            <FormField label="Facebook" htmlFor="facebook">
              <input id="facebook" value={contact.socials?.facebook || ""} onChange={setSocial("facebook")} className={inputClass} />
            </FormField>
            <FormField label="Instagram" htmlFor="instagram">
              <input id="instagram" value={contact.socials?.instagram || ""} onChange={setSocial("instagram")} className={inputClass} />
            </FormField>
            <FormField label="LinkedIn" htmlFor="linkedin">
              <input id="linkedin" value={contact.socials?.linkedin || ""} onChange={setSocial("linkedin")} className={inputClass} />
            </FormField>
            <FormField label="YouTube" htmlFor="youtube">
              <input id="youtube" value={contact.socials?.youtube || ""} onChange={setSocial("youtube")} className={inputClass} />
            </FormField>
          </div>

          <PrimaryButton type="submit" disabled={savingContact}>
            {savingContact ? "Saving…" : "Save contact"}
          </PrimaryButton>
        </form>

        <form onSubmit={savePassword} className="flex h-fit flex-col gap-4 border border-border bg-white p-6">
          <h2 className="text-lg font-bold text-ink">Change password</h2>

          <FormField label="Current password" htmlFor="currentPassword" required>
            <input
              id="currentPassword"
              type="password"
              value={passwords.currentPassword}
              onChange={(event) =>
                setPasswords((current) => ({ ...current, currentPassword: event.target.value }))
              }
              required
              className={inputClass}
            />
          </FormField>

          <FormField label="New password" htmlFor="newPassword" required>
            <input
              id="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={(event) =>
                setPasswords((current) => ({ ...current, newPassword: event.target.value }))
              }
              required
              minLength={8}
              className={inputClass}
            />
          </FormField>

          <PrimaryButton type="submit" disabled={savingPassword}>
            {savingPassword ? "Saving…" : "Update password"}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default Settings;
