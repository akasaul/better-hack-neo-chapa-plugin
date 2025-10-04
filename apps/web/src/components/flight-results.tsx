import { Clock, Luggage, Utensils, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Flight } from "@/lib/types";

interface FlightResultsProps {
  flights: Flight[];
}

export function FlightResults({ flights }: FlightResultsProps) {
  return (
    <div className="space-y-4">
      {/* Flash sale banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 p-8">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white text-center">
            ⚡ FLASH SALE <span className="text-yellow-400">50%</span> ⚡
          </h2>
        </div>
        <img
          src="/airplane-in-flight.png"
          alt="Airplane"
          className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20"
        />
      </div>

      {/* Flight cards */}
      {flights.map((flight) => (
        <div
          key={flight.id}
          className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={`/.jpg?height=40&width=40&query=${flight.airline} logo`}
                alt={flight.airline}
                className="h-10 w-10 rounded"
              />
              <span className="font-medium">{flight.airline}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{flight.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-3xl font-bold">{flight.departureTime}</div>
              <div className="text-sm text-gray-600">{flight.from}</div>
              <div className="text-xs text-gray-500">
                {flight.departureDate}
              </div>
            </div>

            <div className="flex-1 px-8">
              <div className="relative">
                <div className="h-px bg-gray-300" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-500" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-500" />
                {flight.stops > 0 && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-3 w-3 rounded-full bg-gray-400" />
                    <div className="mt-2 text-xs text-gray-500 whitespace-nowrap">
                      {flight.stops} Transfer{flight.stops > 1 ? "s" : ""}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold">{flight.arrivalTime}</div>
              <div className="text-sm text-gray-600">{flight.to}</div>
              <div className="text-xs text-gray-500">{flight.arrivalDate}</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Luggage className="h-4 w-4" />
                <span>{flight.baggage}</span>
              </div>
              {flight.facilities.includes("food") && (
                <div className="flex items-center gap-1">
                  <Utensils className="h-4 w-4" />
                  <span>Food</span>
                </div>
              )}
              {flight.facilities.includes("entertainment") && (
                <div className="flex items-center gap-1">
                  <Tv className="h-4 w-4" />
                  <span>Entertainment</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  ${flight.price}
                </div>
                <div className="text-xs text-gray-500">
                  / included tax & fees
                </div>
              </div>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-8">
                Select
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
