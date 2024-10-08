import { User } from "@/util/localStorage";
import { Button } from "../../components/Button";

interface IProps {
  user?: User;
  logOut?: () => void;
  highScore: string;
}
export const SettingsModalContent = ({ user, highScore, logOut }: IProps) => {
  return (
    <div className="flex p-4 flex-col space-y-4 text-center">
      <h2 className=" underline">Settings</h2>
      <div>
        Current User :{" "}
        {user?.firstName && user?.lastName
          ? (user?.firstName ?? "") + " " + (user?.lastName ?? "")
          : user?.email}
      </div>
      {highScore && <div>High Score : {highScore}</div>}
      <Button onClick={logOut}>Log Out</Button>
    </div>
  );
};
