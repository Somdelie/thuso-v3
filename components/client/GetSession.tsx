import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import Link from "next/link";
import { auth } from "@/auth";
import { Badge } from "@mui/material";
import { Mail } from "lucide-react";
import { GrChat } from "react-icons/gr";

const GetSession = async () => {
  const session = await auth();
  // console.log(session);
  return (
    <div className="flex items-center gap-6">
      <div className="icons hidden sm:block">
        <ThemeSwitcher />
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          href="/projects/create"
          className="px-2 py-1 hidden sm:block bg-roseRed hover:bg-rose-800 rounded text-gray-200"
        >
          Post a Project
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <button>
              {" "}
              <Badge badgeContent={4} color="error">
                <Mail />
              </Badge>
            </button>
            <button>
              <Badge badgeContent={4} color="error">
                <GrChat />
              </Badge>
            </button>
          </div>
          {/* <UserMenu session={session} />  */}
        </div>

        {/* <div className="flex items-center gap-4">
        <Link href="/api/auth/signin" className="font-semibold">
          Log In
        </Link>
        <Link
          href="/register"
          className="px-2 py-1 bg-roseRed hover:bg-rose-800 rounded text-gray-200"
        >
          Sign Up
        </Link>
      </div> */}
      </div>
    </div>
  );
};

export default GetSession;
