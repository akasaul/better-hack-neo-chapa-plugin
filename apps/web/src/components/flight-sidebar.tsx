import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { FilterParams } from "@/lib/types";

interface FilterSidebarProps {
  filters: FilterParams;
  onFilterChange: (filters: FilterParams) => void;
}

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFacilityToggle = (facility: string) => {
    const newFacilities = localFilters.facilities.includes(facility)
      ? localFilters.facilities.filter((f) => f !== facility)
      : [...localFilters.facilities, facility];

    const newFilters = { ...localFilters, facilities: newFacilities };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterParams = {
      departureTime: { start: 7, end: 19 },
      landingTime: { start: 7, end: 19 },
      priceRange: { min: 100, max: 1000 },
      facilities: [],
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filter</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-blue-500"
        >
          Reset
        </Button>
      </div>

      {/* Time filters */}
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Time</h4>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Departure time
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={localFilters.departureTime.start}
                    onChange={(e) => {
                      const newFilters = {
                        ...localFilters,
                        departureTime: {
                          ...localFilters.departureTime,
                          start: Number.parseInt(e.target.value),
                        },
                      };
                      setLocalFilters(newFilters);
                      onFilterChange(newFilters);
                    }}
                    className="w-16 rounded border px-2 py-1 text-sm"
                    min="0"
                    max="23"
                  />
                  <span className="text-sm">AM</span>
                </div>
                <span className="text-gray-400">→</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={localFilters.departureTime.end}
                    onChange={(e) => {
                      const newFilters = {
                        ...localFilters,
                        departureTime: {
                          ...localFilters.departureTime,
                          end: Number.parseInt(e.target.value),
                        },
                      };
                      setLocalFilters(newFilters);
                      onFilterChange(newFilters);
                    }}
                    className="w-16 rounded border px-2 py-1 text-sm"
                    min="0"
                    max="23"
                  />
                  <span className="text-sm">PM</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Landing time
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={localFilters.landingTime.start}
                    onChange={(e) => {
                      const newFilters = {
                        ...localFilters,
                        landingTime: {
                          ...localFilters.landingTime,
                          start: Number.parseInt(e.target.value),
                        },
                      };
                      setLocalFilters(newFilters);
                      onFilterChange(newFilters);
                    }}
                    className="w-16 rounded border px-2 py-1 text-sm"
                    min="0"
                    max="23"
                  />
                  <span className="text-sm">AM</span>
                </div>
                <span className="text-gray-400">→</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={localFilters.landingTime.end}
                    onChange={(e) => {
                      const newFilters = {
                        ...localFilters,
                        landingTime: {
                          ...localFilters.landingTime,
                          end: Number.parseInt(e.target.value),
                        },
                      };
                      setLocalFilters(newFilters);
                      onFilterChange(newFilters);
                    }}
                    className="w-16 rounded border px-2 py-1 text-sm"
                    min="0"
                    max="23"
                  />
                  <span className="text-sm">PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price range */}
        <div className="pt-6 border-t">
          <h4 className="font-medium mb-3">Price range</h4>
          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs text-gray-500">Min</label>
              <input
                type="number"
                value={localFilters.priceRange.min}
                onChange={(e) => {
                  const newFilters = {
                    ...localFilters,
                    priceRange: {
                      ...localFilters.priceRange,
                      min: Number.parseInt(e.target.value),
                    },
                  };
                  setLocalFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                className="w-20 rounded border px-2 py-1 text-sm"
              />
            </div>
            <span className="text-gray-400 mt-5">→</span>
            <div>
              <label className="text-xs text-gray-500">Max</label>
              <input
                type="number"
                value={localFilters.priceRange.max}
                onChange={(e) => {
                  const newFilters = {
                    ...localFilters,
                    priceRange: {
                      ...localFilters.priceRange,
                      max: Number.parseInt(e.target.value),
                    },
                  };
                  setLocalFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                className="w-20 rounded border px-2 py-1 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="pt-6 border-t">
          <h4 className="font-medium mb-3">Facilities</h4>
          <div className="space-y-3">
            {["baggage", "wifi", "socket", "meal", "television"].map(
              (facility) => (
                <div key={facility} className="flex items-center gap-2">
                  <Checkbox
                    id={facility}
                    checked={localFilters.facilities.includes(facility)}
                    onCheckedChange={() => handleFacilityToggle(facility)}
                  />
                  <label
                    htmlFor={facility}
                    className="text-sm capitalize cursor-pointer"
                  >
                    {facility}
                  </label>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
