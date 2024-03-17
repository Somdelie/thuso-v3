import AdminNavbar from "@/components/admin/AdminNavbar";
import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin@Thuso.com",
  description: "This content is for admin only",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <Sidebar />{" "}
      <div className="w-full">
        <AdminNavbar />
        <main className="py-6 px-4 w-full">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
