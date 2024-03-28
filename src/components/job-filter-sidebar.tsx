"use client";

import * as z from "zod";
import * as React from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import filterJobs from "../../actions/filter-jobs";
import findAllJobLocations from "../../actions/find-all-locations";
import { JOB_TYPES } from "@/lib/constants/job-types";
import { JobFilterValues, JobFilterSchema } from "@/lib/schemas/validation";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
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
  defaultValues: JobFilterValues;
}

const JobFilterSidebar = ({ defaultValues }: JobFilterSidebarProps) => {
  const [isPending, startTransition] = React.useTransition();
  const [jobLocations, setJobLocations] = React.useState<string[]>([]);
  const [error, setError] = React.useState<ZodError>();

  const router = useRouter();

  const form = useForm<z.infer<typeof JobFilterSchema>>({
    resolver: zodResolver(JobFilterSchema),
    defaultValues: {
      query: defaultValues?.query || '',
      type: defaultValues?.type,
      location: defaultValues?.location,
      remote: defaultValues?.remote, // TODO: fix: value is not being passed to the url params
    },
  });

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

  const clearFilters = () => {
    form.reset();
    router.replace("/");
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFilterSubmit)}>
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
                        value={field.value}           
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
                    <FormLabel htmlFor="type">Type</FormLabel>
                    <FormControl>
                      <Select disabled={isPending} id="type" {...field}>
                        <option value="">All Types</option>
                        {JOB_TYPES.map((types) => (
                          <option key={types} value={types}>
                            {types}
                          </option>
                        ))}
                      </Select>
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
                    <FormLabel htmlFor="location">Location</FormLabel>
                    <FormControl>
                      <Select id="location" disabled={isPending} {...field}>
                        <option value="">All Locations</option>
                        {jobLocations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
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
              disabled={isPending}
            >
              <LoadingButtonText isPending={isPending} className="">
                Apply Filters
              </LoadingButtonText>
            </Button>
            <Button
              type="button"
              variant={"destructive"}
              size={"icon"}
              className="w-full"
              disabled={isPending}
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </form>
      </Form>
    </aside>
  );
};

export default JobFilterSidebar;
