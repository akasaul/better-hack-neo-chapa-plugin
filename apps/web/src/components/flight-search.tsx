"use client";

import { useState } from "react";
import { ArrowLeftRight, Calendar, Users, Plane, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SearchParams } from "../lib/types";

interface FlightSearchProps {
  initialParams: SearchParams;
  onSearch: (params: SearchParams) => void;
}

export function FlightSearch({ initialParams, onSearch }: FlightSearchProps) {
  const [params, setParams] = useState(initialParams);

  const handleSwap = () => {
    setParams((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* From */}
        <div className="md:col-span-1">
          <label className="text-xs text-gray-500 mb-1 block">From</label>
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={params.from}
              onChange={(e) => setParams({ ...params, from: e.target.value })}
              className="w-full text-sm font-medium focus:outline-none"
            />
          </div>
        </div>

        {/* Swap button */}
        <div className="flex items-end justify-center md:col-span-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwap}
            className="h-10 w-10 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>

        {/* To */}
        <div className="md:col-span-1">
          <label className="text-xs text-gray-500 mb-1 block">To</label>
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-gray-400 rotate-90" />
            <input
              type="text"
              value={params.to}
              onChange={(e) => setParams({ ...params, to: e.target.value })}
              className="w-full text-sm font-medium focus:outline-none"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="md:col-span-1">
          <label className="text-xs text-gray-500 mb-1 block">
            Departure date
          </label>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={params.departureDate}
              onChange={(e) =>
                setParams({ ...params, departureDate: e.target.value })
              }
              className="w-full text-sm font-medium focus:outline-none"
            />
          </div>
        </div>

        {/* Passengers */}
        <div className="md:col-span-1">
          <label className="text-xs text-gray-500 mb-1 block">Passenger</label>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium">
              {params.passengers.adults} Adult
              {params.passengers.adults > 1 ? "s" : ""}
              {params.passengers.children > 0 &&
                `; ${params.passengers.children} Child${
                  params.passengers.children > 1 ? "ren" : ""
                }`}
            </span>
          </div>
        </div>

        {/* Search button */}
        <div className="flex items-end md:col-span-1">
          <Button
            onClick={() => onSearch(params)}
            className="w-full h-10 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
