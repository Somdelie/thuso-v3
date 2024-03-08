import { forwardRef, useMemo, useState } from "react";
import { Input } from "./input";
import { townships } from "@/data/places";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [hasFocus, setHasFocus] = useState(false);

    const cities = useMemo(() => {
      if (!locationSearchInput.trim()) return [];

      const searchWords = locationSearchInput.split("");

      return townships
        .map((town) => `${town.name}, ${town.city}, ${town.province}`)
        .filter(
          (town) =>
            town.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              town.toLowerCase().includes(word.toLowerCase())
            )
        )
        .slice(0, 5);
    }, [locationSearchInput]);

    return (
      <div className="relative">
        <Input
          placeholder="Search for a city"
          type="search"
          value={locationSearchInput}
          onChange={(e) => setLocationSearchInput(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          {...props}
          className="rounded border-gray-500 dark:text-gray-400"
        />
        {locationSearchInput.trim() && hasFocus && (
          <div className="absolute bg-white border-x border-b border-gray-400 dark:border-gray-500 w-full dark:bg-gray-900 shadow z-20 divide-y divide-gray-300 dark:divide-gray-800 rounded-b">
            {!cities.length && <p className="p-3 ">No results found</p>}
            {cities?.map((city) => (
              <button
                type="button"
                key={city}
                className="block w-full p-2 text-start"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(city);
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
