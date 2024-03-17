import React from "react";

export const metadata = {
  desc: "Jobs",
};

const jobsPage = () => {
  return (
    <div>
      <h2 className="font-semibold dark:text-gray-300 px-2">
        {metadata?.desc}
      </h2>
    </div>
  );
};

export default jobsPage;
