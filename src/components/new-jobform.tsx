"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { draftToMarkdown } from "markdown-draft-js";

import { createJobPosting } from "../../actions/create-job";
import { CreateJobSchema, ICreateJobSchema } from "@/lib/schemas/validation";
import { JOB_TYPES, LOCATION_TYPES } from "@/lib/constants/job-types";

import { X } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RichTextEditor from "@/components/rich-text-editor";
import CustomSelect from "@/components/ui/custom-select";
import LoadingButtonText from "@/components/ui/loading-button-text";
import LocationInput from "@/components/location-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const NewJobForm = () => {
  const [error, setError] = useState<string>();

  const form = useForm<ICreateJobSchema>({
    resolver: zodResolver(CreateJobSchema),
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: ICreateJobSchema) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createJobPosting(formData);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    }
  }
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
          <Form {...form}>
            <form
              className="space-y-4"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a Job Type" />
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
                control={control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="companyLogoUrl"
                render={({ field: { value, ...fieldValues } }) => (
                  <FormItem>
                    <FormLabel>Company Logo</FormLabel>
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="locationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={(e) => {
                        field.onChange(e)
                        if (e === "Remote") {
                          trigger("location");
                        }
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Remote / OnSite / Hybrid" />
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
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Office Location</FormLabel>
                    <FormControl>
                      <LocationInput
                        onLocationSelected={field.onChange}
                        ref={field.ref}
                      />
                    </FormControl>

                    {watch("location") && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setValue("location", "", {
                              shouldValidate: true, // if remote is true then validation error will show
                            });
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
                    control={control}
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
                      <FormItem className="grow">
                        <FormControl>
                          <Input
                            placeholder="Website"
                            type="url"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              trigger("applicationEmail"); // will trigger the email validation when the url input is typed in
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
                control={control}
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
              <FormField
                control={control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="default" className="w-full">
                <LoadingButtonText isPending={isSubmitting}>
                  Submit
                </LoadingButtonText>
              </Button>
              <FormError message={error} />
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default NewJobForm;
