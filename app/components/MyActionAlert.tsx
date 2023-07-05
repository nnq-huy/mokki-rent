import { IconType } from "react-icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./ui/alert-dialog"
import { Button } from "./ui/button"
interface ColumnActionAlertProps {
  action: () => void,
  title: string,
  actionText: string,
  actionSubText?: string,
  actionButtonLabel: string,
  outline?: boolean,
  icon?: IconType
}

const MyActionAlert: React.FC<ColumnActionAlertProps> = ({
  action,
  title,
  actionButtonLabel,
  actionText,
  actionSubText,
  outline,
  icon: Icon,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger >
        {(outline && Icon) ? <Button size="lg" variant="outline" className="px-2 my-[-4px] text-sm font-normal">
          <Icon size={20} className="text-neutral-500" />&nbsp;{title}
        </Button> : <Button variant="ghost" className="px-2 my-[-4px] text-sm font-normal">
          {title}
        </Button>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{actionText}</AlertDialogTitle>
          <AlertDialogDescription>
            {actionSubText ?? 'This action cannot be undone.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-mokki-green hover:bg-mokki-green hover:opacity-70"
            onClick={action}
          >
            {actionButtonLabel ?? "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default MyActionAlert;


