"use client";

import * as z from "zod";
import * as React from "react";
import { useRouter } from 'next/navigation';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import filterJobs from "../../actions/filter-jobs";
import findAllJobLocations from "../../actions/find-all-locations";
import { JOB_TYPES } from "@/lib/constants/job-types";
import { JobFilterSchema } from "@/lib/schemas/validation";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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

const JobFilterSidebar = () => {
  const [isPending, startTransition] = React.useTransition();
  const [jobLocations, setJobLocations] = React.useState<string[]>([]);

  const router = useRouter();

  const form = useForm<z.infer<typeof JobFilterSchema>>({
    resolver: zodResolver(JobFilterSchema),
    defaultValues: {
      query: "",
      type: "",
      location: "",
      remote: false,
    },
  });

  const onFilterSubmit = (values: z.infer<typeof JobFilterSchema>) => {
    // TODO: create better error handling
    startTransition(() => {
      filterJobs(values)
        .then((response) => {
          if (response.error) {
            console.error(response.error);
          }
        })
        .catch((error) => console.error(`Filter Error: ${error}`));
    });
  };

  const clearFilters = () => {
    form.reset();  
    router.replace("/")
  }


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
                        {...field}
                        id="query"
                        placeholder="Title, company, etc..."
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
                      <Select id="type" {...field}>
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
                      <Select id="location" {...field}>
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
                        className="scale-125 accent-black mr-2"
                        // {...field}
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
            >
              Apply Filters
            </Button>
            <Button
              type="button"
              variant={"destructive"}
              size={"icon"}
              className="w-full"
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
