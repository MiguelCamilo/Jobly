"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";

import filterJobs from "../../actions/filter-jobs";
import findAllJobLocations from "../../actions/find-all-locations";
import { JOB_TYPES } from "@/lib/constants/job-types";
import { IJobFilterSchema, JobFilterSchema } from "@/lib/schemas/validation";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import LoadingButtonText from "@/components/ui/loading-button-text";

interface JobFilterSidebarProps {
  defaultValues: IJobFilterSchema;
}

const JobFilterSidebar = ({ defaultValues }: JobFilterSidebarProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [jobLocations, setJobLocations] = useState<string[]>([]);
  const [error, setError] = useState<z.ZodError>();

  const { watch, ...form } = useForm<z.infer<typeof JobFilterSchema>>({
    resolver: zodResolver(JobFilterSchema),
    defaultValues: {
      query: defaultValues?.query || "",
      type: defaultValues?.type || "",
      location: defaultValues?.location || "",
      remote: defaultValues?.remote, // TODO: fix: value is not being passed to the url params
    },
  });

  const formValues = watch();
  const hasValues = Object.values(formValues).some((value) => value);

  const onFilterSubmit = (values: z.infer<typeof JobFilterSchema>) => {     
    startTransition(() => {
      filterJobs(values)
        .then((response) => {
          if (response?.error) {
            setError(response?.error);
          }
        })
        .catch((error) => console.error(`Filter Error: ${error}`));
    });
  };

  React.useEffect(() => {
    const fetchJobLocations = async () => {
      const locations = await findAllJobLocations();
      // takes the location out of each object then turns it into an array of strings and by using .filter(Boolean) it removes any null values
      setJobLocations(
        locations.map(({ location }) => location).filter(Boolean) as string[],
      );
    };
    fetchJobLocations();
  }, []);

  return (
    // h-fit onlys makes the the height fit the content
    <aside className="sticky top-0 h-fit rounded-lg bg-background p-4 md:w-[260px]">
      {/* TODO: fix: select components dont reset when form.reset is called */}
      <Form {...form} watch={watch}>
        {/* key attribute updates react anytime defaultValue changes and re-renders this component with the new data */}
        <form
          onSubmit={form.handleSubmit(onFilterSubmit)}
          key={JSON.stringify(defaultValues)}
        >
          <FormError message={error?.message} />
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="query">Search</FormLabel>
                    <FormControl>
                      <Input
                        id="query"
                        placeholder="Title, company, etc..."
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a job type" />
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
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="location">Location</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {jobLocations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="remote"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        id="remote"
                        className="mr-2 scale-125 accent-black"
                        {...field}
                        value={String(field.value)}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormLabel htmlFor="remote">Remote Jobs</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              variant={"default"}
              size={"icon"}
              className="w-full"
              disabled={isPending || !hasValues}
            >
              <LoadingButtonText isPending={isPending}>
                Apply Filters
              </LoadingButtonText>
            </Button>
            {hasValues && (
              <Button
                type="button"
                variant={"destructive"}
                size={"icon"}
                className="w-full"
                disabled={isPending}
                onClick={() => {
                  form.reset();
                  router.replace("/");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </form>
      </Form>
    </aside>
  );
};

export default JobFilterSidebar;
