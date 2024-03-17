import filterJobs from "../../actions/filter-jobs";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from '@/components/ui/select';

const JobFilterSidebar = () => {
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
            >

            </Select>        
          </div>
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
