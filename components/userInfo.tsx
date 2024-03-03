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
    <Card className="shadow w-[600px] bg-white dark:bg-gray-700">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold text-center">{label}</p>
          <EditUser user={user} label="Edit Your Info" />
        </div>
      </CardHeader>

      <CardContent>
        {/* <div className="flex items-center justify-between w-full border-b py-2">
          <span>ID</span>
          <p>{user?.id}</p>
        </div> */}
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
        {/* <div className="flex items-center justify-between w-full border-b py-2">
          <span>Role</span>
          <p>{user?.role}</p>
        </div> */}
        {/* <div className="flex items-center justify-between w-full border-b py-2">
          <span>Status</span>
          <p>{user?.status}</p>
        </div> */}
        <div className="flex items-center justify-between w-full border-b py-2">
          <span>Two Factor Authentication</span>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
