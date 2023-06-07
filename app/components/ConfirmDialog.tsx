'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog"

interface ConfirmDialogProps {
  isOpen?: boolean;
  actionLabel?: string;
  disabled?: boolean;
  title: string;
  subtitle: string;
  onConfirm: () => void;
  onDismiss: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  actionLabel,
  disabled,
  title,
  subtitle,
  onConfirm,
  onDismiss
}) => {
  return (
    <AlertDialog
      open={isOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {subtitle}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel
          onClick={onDismiss} >
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          disabled={disabled}
          onClick={onConfirm}
          className="text-white bg-mokki-green hover:bg-mokki-green hover:opacity-70"
        >
          {actionLabel ?? "Continue"}
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmDialog;
