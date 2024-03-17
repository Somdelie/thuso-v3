import DateTimeDisplay from "@/components/ui/DateTimeDisplay";

export const metadata = {
  desc: "Dashboard",
};

const AdminPage = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold dark:text-gray-300 px-2">
          {metadata?.desc}
        </h2>
        <DateTimeDisplay />
      </div>
      <div className="grid"></div>
      {/* <Cards /> */}
    </div>
  );
};

export default AdminPage;
