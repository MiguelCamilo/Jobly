"use client";

import * as z from "zod";
import { useState, useTransition } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RichTextEditor from "./rich-text-editor";
import { draftToMarkdown } from 'markdown-draft-js';

import createJobPosting from '../../actions/create-job';
import { CreateJobSchema } from "@/lib/schemas/validation";
import { JOB_TYPES, LOCATION_TYPES } from "@/lib/constants/job-types";

import { X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormError } from '@/components/form-error';
import LoadingButtonText from '@/components/ui/loading-button-text';
import LocationInput from "@/components/location-input";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewJobForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  
  const { watch, ...form } = useForm<z.infer<typeof CreateJobSchema>>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: {
      title: "",
      type: "",
      location: "",
      locationType: "",
      companyName: "",
      companyLogoUrl: undefined,
      description: "",
      salary: "",
      applicationEmail: "",
      applicationUrl: "",
    },
  });

  const onJobPostSubmit = (values: z.infer<typeof CreateJobSchema>) => {
    startTransition(async () => {
      await createJobPosting(values)
        .then((response) => {
          
        })
        .catch((error) => {
          console.error(`Unable to Create Job: ${error}`)
          setError(error)
        })
    })
  };
  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Create a Job Posting!
        </h1>
        <p className="text-muted-foreground">
          Please fill out the form below to create a new job posting.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold">Job details</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Provided a job description and details
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form} watch={watch}>
            <form
              onSubmit={form.handleSubmit(onJobPostSubmit)}
              className="space-y-4"
              noValidate
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Ex: Senior Software Engineer"
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
                    <FormLabel>Job Type</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {JOB_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Ex: Google / Apple / Microsoft"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyLogoUrl"
                render={({ field: { value, ...fieldValues } }) => (
                  <FormItem>
                    <FormLabel>Company Logo</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldValues}
                        type="file"
                        accept="image/*"
                        disabled={isPending}
                        onChange={(e) => {
                          // since our schema validation expects a "File" type and not a file list
                          // we grab the first file and let react-hook-form handle the change
                          const file = e.target.files?.[0];
                          fieldValues.onChange(file);
                        }}
                      />
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
                    <FormLabel>Location Type</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Remote / OnSite / Hybrid"  />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {LOCATION_TYPES.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location of Job</FormLabel>
                    <FormControl>
                      <LocationInput
                        ref={field.ref}
                        disabled={isPending}
                        onLocationSelected={field.onChange}
                      />
                    </FormControl>

                    {watch("location") && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            form.setValue("location", "", {
                              shouldValidate: true, // if remote is true then validation error will show
                            })
                          }}
                        >
                          <span className="flex items-center gap-1 rounded-md border p-2 text-sm text-foreground">
                            <X className="size-4" />
                            {watch("location")}
                          </span>
                        </button>
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label htmlFor="applicationEmail">How to apply</Label>

                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="applicationEmail"
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormControl>
                          <div className="flex items-center">
                            <Input
                              id="applicationEmail"
                              placeholder="Email"
                              type="email"
                              {...field}
                            />
                            <span className="mx-2 text-muted-foreground">
                              or
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applicationUrl"
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormControl>
                          <Input
                            placeholder="Website"
                            type="url"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              form.trigger("applicationEmail"); // will trigger the email validation when the url input is written in
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label>Job Description</Label>
                    <FormControl>
                      <RichTextEditor  
                        ref={field.ref}
                        onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                      />   
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="default" className="w-full">
                <LoadingButtonText isPending={false}>
                  Submit
                </LoadingButtonText>
              </Button>
            </form>
            <FormError message={error} />
          </Form>
        </CardContent>
      </Card>
    </main>
  );  
};

export default NewJobForm;
