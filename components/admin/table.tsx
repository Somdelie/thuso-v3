import { db } from "@/lib/db";
import { formatCreatedAt } from "@/lib/formatDate";
import { $Enums } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { DialogForm } from "./Dailog";

type Person = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  image: string | null;
  status: $Enums.UserStatus;
  userType: $Enums.UserType;
  isAproved: string;
  role: $Enums.UserRole;
  documentPhoto: string | null;
  createdAt: string;
};

const DataTable = ({ users }: { users: Person[] }) => {
  //   console.log(users);

  return (
    <div className="w-full">
      <table className="overflow-x-auto w-full">
        <thead className="bg-sky-600 text-gray-200 text-left dark:text-gray-400 dark:bg-gray-700 ">
          <th className="py-2 px-3 whitespace-nowrap w-[110px]">Full Name</th>
          <th className="py-2 px-3 border-l whitespace-nowrap border-sky-700 dark:border-gray-400 w-[100px]">
            Email
          </th>
          <th className="py-2 px-3 border-l whitespace-nowrap border-sky-700 dark:border-gray-400 w-[110px]">
            Phone
          </th>
          <th className="py-2 px-3 border-l whitespace-nowrap border-sky-700 dark:border-gray-400 w-[110px]">
            Status
          </th>
          <th className="py-2 px-3 border-l whitespace-nowrap border-sky-700 dark:border-gray-400 w-[110px]">
            Approved
          </th>
          <th className="py-2 px-3 border-l whitespace-nowrap border-sky-700 dark:border-gray-400 w-[110px]">
            Created At
          </th>
          <th className="py-2 px-3 border-l whitespace-nowrap border-sky-700 dark:border-gray-400 w-[80px]">
            Action
          </th>
        </thead>
        <tbody className="w-full dark:text-gray-400">
          {users.map((user) => (
            <tr
              key={user.id}
              className="w-full border-b border-gray-400 dark:border-gray-700 text-[14px] hover:bg-gray-600"
            >
              <td className="whitespace-nowrap p-2 w-[110px]">{user?.name}</td>
              <td className="whitespace-nowrap p-2 w-[100px]">{user?.email}</td>
              <td className="whitespace-nowrap p-2 w-[110px]">{user?.phone}</td>
              <td className="whitespace-nowrap p-2 w-[110px]">
                {user?.status}
              </td>
              <td className="w-[60px] whitespace-nowrap p-2">
                {user.isAproved ? (
                  <div className="flex items-center w-full text-green  justify-center">
                    Yes
                  </div>
                ) : (
                  <div className="text-red-600 flex items-center justify-center w-full">
                    No
                  </div>
                )}
              </td>
              <td className="p-2 w-[110px] whitespace-nowrap">
                {formatCreatedAt(user.createdAt)}
              </td>{" "}
              {/* Using the formatCreatedAt function */}
              <td className="p-2 flex items-center justify-center w-[110px] whitespace-nowrap">
                <DialogForm user={user as any} userId={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
