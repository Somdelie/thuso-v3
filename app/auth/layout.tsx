const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen dark:bg-gray-800 justify-center items-center">
      {children}
    </div>
  );
};

export default DashboardLayout;
