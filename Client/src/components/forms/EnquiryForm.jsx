import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { sendEnquiry } from "@/api/enquiries.api.js";
import { enquirySchema } from "@/utils/validators";
import FormField from "./FormField";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const INTERESTS = ["Construction", "Consulting", "Investments", "General"];

const EnquiryForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(enquirySchema) });

  const onSubmit = async (values) => {
    try {
      await sendEnquiry(values);
      toast.success("Thanks — we will get back to you shortly.");
      reset();
      onSuccess?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not send your enquiry");
    }
  };

  const fieldClass = "h-12 rounded-none";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("website")}
      />

      <FormField label="Full name" htmlFor="enquiry-name" required error={errors.name?.message}>
        <Input id="enquiry-name" className={fieldClass} {...register("name")} />
      </FormField>

      <div className="grid grid-cols-2 gap-5 max-[700px]:grid-cols-1">
        <FormField label="Email" htmlFor="enquiry-email" error={errors.email?.message}>
          <Input id="enquiry-email" type="email" className={fieldClass} {...register("email")} />
        </FormField>

        <FormField label="Phone" htmlFor="enquiry-phone" error={errors.phone?.message}>
          <Input id="enquiry-phone" className={fieldClass} {...register("phone")} />
        </FormField>
      </div>

      <FormField label="Interested in" htmlFor="enquiry-interest" error={errors.interest?.message}>
        <select
          id="enquiry-interest"
          className="h-12 w-full border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring"
          {...register("interest")}
        >
          <option value="">Select a service</option>
          {INTERESTS.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Message" htmlFor="enquiry-message" error={errors.message?.message}>
        <Textarea id="enquiry-message" rows={4} className="rounded-none" {...register("message")} />
      </FormField>

      <PrimaryButton type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </PrimaryButton>
    </form>
  );
};

export default EnquiryForm;
