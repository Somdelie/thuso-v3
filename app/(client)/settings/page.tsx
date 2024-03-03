import { EditUser } from "@/components/auth/EditUser";
import { UserInfo } from "@/components/userInfo";
import { currentUser } from "@/lib/auth";
import { useSession } from "next-auth/react";

const SettingsPage = async () => {
  const user = await currentUser();
  // console.log(session);

  const { street, city, state, zip } = user?.address || {};

  return (
    <div className="pt-20 min-h-screen dark:text-gray-300">
      {/* <EditUser user={user} label="Edit Your Info" /> */}
      <section className="max-w-[90%] mx-auto">
        <UserInfo label="Settings Component" user={user} />
      </section>
    </div>
  );
};

export default SettingsPage;
