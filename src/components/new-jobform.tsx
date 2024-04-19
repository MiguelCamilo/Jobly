"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateJobSchema } from "@/lib/schemas/validation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { JOB_TYPES, LOCATION_TYPES } from "@/lib/constants/job-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import LocationInput from "./location-input";
import { X } from "lucide-react";
import { Label } from "./ui/label";
import RichTextEditor from './rich-text-editor';

const NewJobForm = () => {
  const { watch, ...form } = useForm<z.infer<typeof CreateJobSchema>>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: {
      title: "",
      type: "",
      companyName: "",
      // companyLogoUrl: "",
      description: "",
      salary: "",
      applicationEmail: "",
      applicationUrl: "",
    },
  });

  // const {
  //   handleSubmit,
  //   watch,
  //   trigger,
  //   control,
  //   setValue,
  //   setFocus,
  //   formState: { isSubmitting },
  // } = form;

  const onJobPostSubmit = (values: z.infer<typeof CreateJobSchema>) => {
    console.log(JSON.stringify(values, null, 2));
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
                        placeholder="Ex: Senior Software Engineer"
                        {...field}
                        // disabled={isSubmitting}
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
                      // disabled={isPending}
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
                        placeholder="Ex: Google / Apple / Microsoft"
                        // disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        // disabled={isPending}
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
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldValues}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          // since our schema validation expects a "File" type and not a file list
                          // we grab the first file and let react-hook-form handle the change
                          const file = e.target.files?.[0];
                          fieldValues.onChange(file);
                        }}
                        // disabled={isPending}
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
                    <FormLabel>Location</FormLabel>
                    <Select
                      // disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
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
                        onLocationSelected={field.onChange}
                        // disabled={isPending}
                      />
                    </FormControl>

                    {watch("location") && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            form.setValue("location", "", {
                              shouldValidate: true, // if remote is true then validation error will show
                            })
                          }
                        >
                          <X className="size-4" />
                        </button>
                        <span className="text-sm text-foreground">
                          {watch("location")}
                        </span>
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
                          <Input placeholder="Website" type="url" {...field} onChange={(e) => {
                            field.onChange(e)
                            form.trigger("applicationEmail") // will trigger the email validation when the url input is written in
                          }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label>Job Description</Label>
                    <FormControl>
                      <RichTextEditor  />                      
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="default" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default NewJobForm;
