import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/slices/uiSlice";
import Modal from "@/components/common/Modal";
import EnquiryForm from "./EnquiryForm";
import AppointmentForm from "./AppointmentForm";

const FormModals = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.ui.activeModal);

  const close = () => dispatch(closeModal());

  return (
    <>
      <Modal
        open={activeModal === "enquiry"}
        onOpenChange={(open) => !open && close()}
        title="Discuss your project"
        description="Tell us what you have in mind and our team will get back to you."
      >
        <EnquiryForm onSuccess={close} />
      </Modal>

      <Modal
        open={activeModal === "appointment"}
        onOpenChange={(open) => !open && close()}
        title="Schedule a call"
        description="Choose a convenient time and we will confirm it with you."
      >
        <AppointmentForm onSuccess={close} />
      </Modal>
    </>
  );
};

export default FormModals;
