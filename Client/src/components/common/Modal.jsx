import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Modal = ({ open, onOpenChange, title, description, children, className = "" }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`rounded-none ${className}`}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
