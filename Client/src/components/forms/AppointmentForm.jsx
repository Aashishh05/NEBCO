import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { sendAppointment } from "@/api/appointments.api.js";
import { appointmentSchema } from "@/utils/validators";
import FormField from "./FormField";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AppointmentForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(appointmentSchema) });

  const onSubmit = async (values) => {
    try {
      await sendAppointment(values);
      toast.success("Appointment requested — we will confirm by email.");
      reset();
      onSuccess?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not book your call");
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

      <FormField label="Full name" htmlFor="appointment-name" required error={errors.name?.message}>
        <Input id="appointment-name" className={fieldClass} {...register("name")} />
      </FormField>

      <div className="grid grid-cols-2 gap-5 max-[700px]:grid-cols-1">
        <FormField label="Email" htmlFor="appointment-email" error={errors.email?.message}>
          <Input
            id="appointment-email"
            type="email"
            className={fieldClass}
            {...register("email")}
          />
        </FormField>

        <FormField label="Phone" htmlFor="appointment-phone" error={errors.phone?.message}>
          <Input id="appointment-phone" className={fieldClass} {...register("phone")} />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-5 max-[700px]:grid-cols-1">
        <FormField label="Preferred date" htmlFor="appointment-date" error={errors.preferredDate?.message}>
          <Input
            id="appointment-date"
            type="date"
            className={fieldClass}
            {...register("preferredDate")}
          />
        </FormField>

        <FormField label="Preferred time" htmlFor="appointment-time" error={errors.preferredTime?.message}>
          <Input
            id="appointment-time"
            type="time"
            className={fieldClass}
            {...register("preferredTime")}
          />
        </FormField>
      </div>

      <FormField label="What would you like to discuss?" htmlFor="appointment-message" error={errors.message?.message}>
        <Textarea
          id="appointment-message"
          rows={4}
          className="rounded-none"
          {...register("message")}
        />
      </FormField>

      <PrimaryButton type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Sending…" : "Schedule a call"}
      </PrimaryButton>
    </form>
  );
};

export default AppointmentForm;
