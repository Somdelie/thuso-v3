import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { EditUser } from "./auth/EditUser";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <div className=" grid gap-4 items-start sm:grid-cols-2 ">
      <div className="bg-white shadow p-4 dark:bg-gray-700 w-full">
        <div className="flex items-center justify-between w-full border-b py-2">
          <span>Name</span>
          <p>{user?.name}</p>
        </div>
        <div className="flex items-center justify-between w-full border-b py-2">
          <span>Email</span>
          <p>{user?.email}</p>
        </div>
        <div className="flex items-center justify-between w-full border-b py-2">
          <span>Phone</span>
          <p>{user?.phone}</p>
        </div>
        <div className="flex items-center justify-between w-full border-b py-2">
          <span>Account Type</span>
          <p>{user?.jobType}</p>
        </div>
        <div className="flex items-center justify-between w-full border-b py-2">
          <span>Address</span>
          <p>
            {user?.address?.city}, {user?.address?.state},{" "}
            {user?.address?.street}
          </p>
          {/* <p className="text-[14px]">{user?.desc.slice(0, 65)}...</p> */}
        </div>
        <div className="flex items-center justify-between w-full border-b py-2">
          <span>Two Factor Authentication</span>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </div>
      <EditUser user={user} label="Edit Your Info" />
    </div>
  );
};
