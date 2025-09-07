import { BiLogOut } from "react-icons/bi";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { useAuth } from "~/hooks/use-auth";

const Header = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-muted flex justify-between items-center py-2 md:px-8 px-4">
      <div className="text-lg font-semibold">AppName</div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="ghost" className="text-destructive">
            <BiLogOut />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Keluar dari aplikasi?</AlertDialogTitle>
            <AlertDialogDescription>
              Kamu akan keluar dari akunmu. Apakah kamu yakin ingin melanjutkan?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive" onClick={logout}>
              Keluar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default Header;
