import filterJobs from "../../actions/filter-jobs";
import findAllJobLocations from '../../actions/find-all-locations';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from '@/components/ui/select';

const JobFilterSidebar = async () => {

  const jobLocations = ( await findAllJobLocations()
    .then((locations) =>
      // takes the location out of each object then 
      // turns it into an array of strings and by using 
      // .filter(Boolean) it removes any null values
      locations.map(({ location }) => location).filter(Boolean)
    )) as string[]; // using type assertion to tell typescript that this is a string array
  
  return (
    // h-fit onlys makes the the height fit the content
    <aside className="sticky top-0 h-fit rounded-lg bg-background md:w-[260px] p-4">
      {/* using the action prop allows to submit a server action which automatically
            will be a POST endpoint
        */}
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

          <div className='flex flex-col gap-2'>
            <Label htmlFor="location">Location</Label>
            <Select
              id='location'
              name='location'
              defaultValue=""
            >
              <option
                value=""
              >
                All Locations
              </option>
            </Select>        
          </div>
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
