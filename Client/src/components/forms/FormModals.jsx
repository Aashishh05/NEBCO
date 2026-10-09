import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/slices/uiSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import ContactForm from "./ContactForm";

const COPY = {
  enquiry: {
    eyebrow: "Start a conversation",
    title: "Tell us what you have in mind.",
    description:
      "A few details are enough to begin. The finer details can follow in our conversation.",
  },
  appointment: {
    eyebrow: "Schedule a call",
    title: "Let’s find a time to talk.",
    description: "Share a preferred time and your timezone. We’ll reply to confirm.",
  },
};

const FormModals = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.ui.activeModal);

  const isCall = activeModal === "appointment";
  const isEnquiry = activeModal === "enquiry";
  const open = isCall || isEnquiry;
  const copy = isCall ? COPY.appointment : COPY.enquiry;

  const close = () => dispatch(closeModal());

  return (
    <Dialog open={open} onOpenChange={(value) => !value && close()}>
      <DialogContent className="enquiry-dialog">
        <p className="eyebrow">{copy.eyebrow}</p>
        <DialogTitle>{copy.title}</DialogTitle>
        <DialogDescription>{copy.description}</DialogDescription>
        {open && (
          <ContactForm
            key={activeModal}
            mode={isCall ? "appointment" : "enquiry"}
            context={isCall ? "" : "your project"}
            onClose={close}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FormModals;
