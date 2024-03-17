/* eslint-disable react/no-unescaped-entities */
"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditUserSchema, SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { $Enums } from "@prisma/client";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

//

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { editUser } from "@/actions/edit-user";
import Select from "../ui/select";
import { Switch } from "../ui/switch";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import toast from "react-hot-toast";
import axios from "axios";

type User = {
  id: string;
  status: $Enums.UserStatus;
  userType: $Enums.UserType;
  isAproved: boolean;
  role: $Enums.UserRole;
};

export function DialogForm({ userId, user }: { userId: string; user: User }) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      isAproved: user.isAproved,
      role: user.role,
      status: user.status,
    },
  });

  const onSubmit = (values: z.infer<typeof EditUserSchema>) => {
    console.log(values);
    setError("");
    startTransition(async () => {
      try {
        const response = await axios.post(
          `/api/users/update/${userId}`,
          values
        ); // Update the endpoint with the user ID
        const data = response.data;

        if (data.error) {
          toast.error(data.message);
        } else {
          console.log("User updated");
          toast.success(data.message);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access (user not logged in)
          // console.log("log in first");
          toast.error("You need to log in to continue.");
        } else {
          console.error("Error creating job:", error);
          toast.error("An error occurred while creating the job.");
        }
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Edit />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Info</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full gap-2 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Role</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        disabled={isPending}
                        className="border-2 dark:border-gray-500 rounded"
                      >
                        <option value="USER">USER</option>
                        <option value="EDITOR">EDITOR</option>
                        <option value="ADMIN">ADMIN</option>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Status</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        disabled={isPending}
                        className="border-2 dark:border-gray-500 rounded"
                      >
                        <option value="ACTIVE">ACTIVATE</option>
                        <option value="BLOCKED">BLOCK</option>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAproved"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-1 shadow">
                    <FormLabel>Is Approved</FormLabel>
                    <FormControl>
                      <Switch
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="dark:bg-white text-gray-900"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="flex items-center">
              <Button
                type="submit"
                disabled={isPending}
                className=" bg-gray-950 text-white rounded hover:bg-gray-900"
              >
                {isPending ? (
                  <span>Please wait...</span>
                ) : (
                  <span>Save Changes</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
