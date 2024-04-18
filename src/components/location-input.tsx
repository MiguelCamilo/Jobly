import { forwardRef, useMemo, useState } from "react";

import citiesList from "../../scripts/data/cities-list";

import { Input } from "@/components/ui/input";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

const LocationInput = forwardRef<HTMLInputElement, LocationInputProps>(
  ({ ...props }, ref) => {
    const [locationSearchInput, setLocationSearchInput] = useState<string>("");

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
        <Input
          ref={ref}
          {...props}
          type='search'
        //   onBlur={() => setLocationSearchInput("")}
          placeholder="Search for a location"
          value={locationSearchInput}
          onChange={(e) => setLocationSearchInput(e.target.value)}
        />
        {locationSearchInput.trim() && (
          <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-background p-1 shadow-xl ">
            {!cities.length && (
              <p className="p-3 text-muted-foreground">No results found</p>
            )}
            {cities.map((city) => (
              <button
                key={city}
                className="flex w-full cursor-pointer hover:bg-accent items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
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
