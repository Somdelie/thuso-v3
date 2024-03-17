"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createJobSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/job-types";
import LocationInput from "@/components/ui/LocationInput";
import React, { useEffect, useRef, useState, useTransition } from "react";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import toast from "react-hot-toast";
import { ToastContainer } from "react-toastify";

export const NewJobForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const isMounted = useRef(true);
  const form = useForm<z.infer<typeof createJobSchema>>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      type: "",
      locationType: "",
      salary: "",
    },
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const { setFocus } = form;

  const onSubmit = async (values: z.infer<typeof createJobSchema>) => {
    if (form.watch("locationType") === "On-site" && !values.location) {
      // Display an error message or handle it as needed
      setErrorMessage("Location is required");
      return;
    }
    setErrorMessage(null);
    startTransition(async () => {
      try {
        const response = await axios.post("/api/jobs", values);
        const data = response.data;

        if (data.error) {
          toast.error(data.message);
        } else {
          console.log("Job created");
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
    <main className="max-w-3xl m-auto my-16 space-y-10">
      <ToastContainer />
      <div className="space-y-5 text-center mt-6">
        <h1 className="text-2xl dark:text-gray-300 font-semibold sm:text-4xl">
          Find your perfect candidate
        </h1>
        <p className="text-gray-400 ">
          Get your job posting seen by thousands of job seekers
        </p>
      </div>
      <div className="space-y-6 border border-gray-400 rounded p-4">
        <div>
          <h2 className="font-semibold text-lg dark:text-gray-300">
            Job details
          </h2>
          <p className="text-gray-400 text-sm ">
            Provide a job description and details
          </p>
        </div>
        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid mb-2 sm: grid-cols-2 gap-4">
              {/* <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job type</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. full-time"
                        className="dark:border-gray-500 border-gray-400 rounded dark:text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. painter"
                        disabled={isPending}
                        className="dark:border-gray-500 border-gray-400 rounded dark:text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job type</FormLabel>
                    <FormControl className="w-full">
                      <Select {...field} disabled={isPending}>
                        <option value="" hidden>
                          Select an option
                        </option>

                        {jobTypes.map((jobType) => (
                          <option
                            key={jobType}
                            value={jobType}
                            className="dark:bg-gray-900 py-1 hover:bg-sky-600"
                          >
                            {jobType}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl className="w-full">
                      <Select {...field} disabled={isPending}>
                        <option value="" hidden>
                          Select an option
                        </option>

                        {locationTypes.map((locationType) => (
                          <option
                            key={locationType}
                            value={locationType}
                            className="dark:bg-gray-900 py-1 hover:bg-sky-600"
                          >
                            {locationType}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("locationType") === "On-site" && (
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office location</FormLabel>
                      <FormControl>
                        <LocationInput
                          onLocationSelected={field.onChange}
                          ref={field.ref}
                          disabled={isPending}
                        />
                      </FormControl>
                      {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                      )}
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="4000"
                        type="number"
                        disabled={isPending}
                        className="dark:border-gray-500 border-gray-400 rounded dark:text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label onClick={() => setFocus("description")}>
                      Description
                    </Label>
                    <FormControl>
                      <RichTextEditor
                        onChange={(draft) =>
                          field.onChange(draftToMarkdown(draft))
                        }
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="mt-6 bg-gray-950 rounded hover:bg-gray-900"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <CircularProgress size={16} /> Please wait...
                </span>
              ) : (
                "Submit"
              )}
            </Button>

            {/* <Button
              type="submit"
              className="mt-6 text-gray-300 bg-gray-950 dark:bg-sky-600 dark:hover:bg-sky-700 rounded hover:bg-gray-900"
            >
              Submit your form
            </Button> */}
          </form>
        </Form>
      </div>
    </main>
  );
};
