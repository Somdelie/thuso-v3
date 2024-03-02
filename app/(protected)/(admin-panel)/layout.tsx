export const metadata = {
  title: "Admin@Thuso.com",
  description: "This content is for admin only",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default DashboardLayout;
