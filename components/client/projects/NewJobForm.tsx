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
import { create } from "@/actions/create-job";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";

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

  const onSubmit = (values: z.infer<typeof createJobSchema>) => {
    if (form.watch("locationType") === "On-site" && !values.location) {
      // Display an error message or handle it as needed
      setErrorMessage("Location is required");
      return;
    }
    // If no error, proceed with form submission
    setErrorMessage(null);
    startTransition(() => {
      create(values)
        .then((data: any) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });

    console.log(values);
  };

  return (
    <main className="max-w-3xl m-auto my-16 space-y-10">
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
                      <Select {...field}>
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
                      <Select {...field}>
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
                        className="dark:border-gray-500 border-gray-400 rounded dark:text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicationEmail">How to apply</Label>
              <div className="grid sm:grid-cols-2">
                {/* <FormField
                  control={control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="sm:flex items-center">
                          <Input
                            id="applicationEmail"
                            type="email"
                            placeholder="url"
                            className="dark:border-gray-500 border-gray-400 rounded dark:text-gray-400"
                            {...field}
                          />
                          <span className="mx-2">or</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Website"
                          className="dark:border-gray-500 border-gray-400 rounded dark:text-gray-400"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger("applicationEmail");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
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

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              className="mt-6 text-gray-300 bg-gray-950 dark:bg-sky-600 dark:hover:bg-sky-700 rounded hover:bg-gray-900"
            >
              Submit your form
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};
