import filterJobs from "../../actions/filter-jobs";
import findAllJobLocations from "../../actions/find-all-locations";
import { JOB_TYPES } from "@/lib/constants/job-types";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";

const JobFilterSidebar = async () => {
  const jobLocations = (await findAllJobLocations().then((locations) =>
    // takes the location out of each object then
    // turns it into an array of strings and by using
    // .filter(Boolean) it removes any null values
    locations.map(({ location }) => location).filter(Boolean),
  )) as string[]; // using type assertion to tell typescript that this is a string array

  return (
    // h-fit onlys makes the the height fit the content
    <aside className="sticky top-0 h-fit rounded-lg bg-background p-4 md:w-[260px]">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="query">Search</Label>
            <Input
              id="query"
              name="query"
              placeholder="Title, company, etc..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue="">
              <option value="">All Types</option>
              {JOB_TYPES.map((types) => (
                <option key={types} value={types}>
                  {types}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue="">
              <option value="">All Locations</option>
              {jobLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="remote"
              name="remote"
              className="scale-125 accent-black"
            />
            <Label htmlFor="remote">Remote Jobs</Label>
          </div>
        <Button 
          type="submit"
          variant={"default"}
          size={"icon"}
          className='w-full'
        >
          Apply Filters
        </Button>
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
