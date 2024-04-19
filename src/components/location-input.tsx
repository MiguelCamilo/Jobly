import { forwardRef, useMemo, useState } from "react";

import citiesList from "../../scripts/data/cities-list";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface LocationInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

const LocationInput = forwardRef<HTMLInputElement, LocationInputProps>(
  ({ onLocationSelected, ...props }, ref) => {
    const [locationSearchInput, setLocationSearchInput] = useState<string>("");
    const [hasFocus, setHasFocus] = useState<boolean>(false);

    const cities = useMemo(() => {
      if (!locationSearchInput.trim()) return [];

      const searchWords = locationSearchInput.split(" ");

      return citiesList
        .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLowerCase().includes(word.toLocaleLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [locationSearchInput]);

    return (
      <div className="relative">
        {/* TODO: find shadcn docs for proper way */}
        <div className="absolute left-1 top-2.5">
          <Search className="size-4 text-gray-400" />
        </div>
        <Input
          ref={ref}
          {...props}
          type="search"
          onBlur={() => setHasFocus(false)}
          onFocus={() => setHasFocus(true)}
          value={locationSearchInput}
          onChange={(e) => setLocationSearchInput(e.target.value)}
          placeholder="Search location"
          className="pl-6 text-left"       
        />
        {locationSearchInput.trim() && hasFocus && (
          <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-background p-1 shadow-xl ">
            {!cities.length && (
              <p className="p-3 text-muted-foreground">No results found</p>
            )}
            {cities.map((city) => (
              <button
                key={city}
                onMouseDown={(e) => {
                    e.preventDefault()                    
                    onLocationSelected(city)  
                    setLocationSearchInput("")
                }}
                className="flex w-full cursor-pointer items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);

LocationInput.displayName = "LocationInput";

export default LocationInput;
