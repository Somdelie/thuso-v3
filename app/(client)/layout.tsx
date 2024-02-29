import Footer from "@/components/client/Footer";
import Navbar from "@/components/client/Navbar";
import Link from "next/link";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
