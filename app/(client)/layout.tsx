import { signOut } from "@/auth";
import Link from "next/link";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className="w-full p-3 flex items-center gap-4 bg-gray-800 text-white">
        <Link
          href="/auth/login"
          className="rounded border px-2 py-1 hover:bg-gray-500"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="bg-gray-400 hover:bg-gray-500 px-2 py-1 rounded"
        >
          Register
        </Link>

        <form
          action={async () => {
            "use server";

            await signOut();
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </nav>
      {children}
    </div>
  );
};

export default DashboardLayout;
