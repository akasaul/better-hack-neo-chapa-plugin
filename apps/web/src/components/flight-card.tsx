import type { Flight } from "../lib/types";
import type { FlightOffer } from "@/lib/flight-offer-types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plane, Luggage, Utensils, Tv, Wifi } from "lucide-react";
// import Image from "next/image";
import { Image } from "lucide-react";

interface FlightCardProps {
  flight: FlightOffer;
  featured?: boolean;
}

export function FlightCard({ flight, featured = false }: FlightCardProps) {
  return (
    <Card
      className={`overflow-hidden border transition-all hover:shadow-2xl hover:shadow-blue-500/20 ${
        featured
          ? "border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm"
          : "border-white/20 bg-white/10 backdrop-blur-sm"
      }`}
    >
      {featured && (
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">
              ⚡ FLASH SALE 50% ⚡
            </span>
            <img
              src="/airplane-flying.jpg"
              alt="Airplane"
              width={120}
              height={60}
              className="absolute right-4 top-0 opacity-20"
            />
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Airline Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <Plane className="h-5 w-5 text-blue-400" />
            </div>
            <span className="font-semibold text-white">{flight.airline}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-white/70">
            <Clock className="h-4 w-4" />
            <span>{flight.duration}</span>
          </div>
        </div>

        {/* Flight Timeline */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {/* Departure */}
            <div className="flex-1">
              <div className="mb-1 text-2xl font-bold text-white">
                {flight.departureTime}
              </div>
              <div className="text-sm text-white/80">
                {flight.departureLocation}
              </div>
              <div className="text-xs text-white/60">
                {flight.departureDate}
              </div>
            </div>

            {/* Timeline */}
            <div className="relative mx-4 flex flex-1 items-center">
              <div className="h-0.5 w-full bg-white/20">
                <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
                {flight.hasTransfer && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-2 w-2 rounded-full bg-white" />
                    <div className="mt-1 whitespace-nowrap text-xs text-white/70">
                      Transfer
                    </div>
                  </div>
                )}
                <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
              </div>
              <Plane className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-blue-400" />
            </div>

            {/* Arrival */}
            <div className="flex-1 text-right">
              <div className="mb-1 text-2xl font-bold text-white">
                {flight.arrivalTime}
              </div>
              <div className="text-sm text-white/80">
                {flight.arrivalLocation}
              </div>
              <div className="text-xs text-white/60">{flight.arrivalDate}</div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6 flex flex-wrap items-center gap-4 border-t border-white/20 pt-4">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Luggage className="h-4 w-4" />
            <span>{flight.baggage}</span>
          </div>
          {flight.amenities.food && (
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Utensils className="h-4 w-4" />
              <span>Food</span>
            </div>
          )}
          {flight.amenities.entertainment && (
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Tv className="h-4 w-4" />
              <span>Entertainment</span>
            </div>
          )}
          {flight.amenities.wifi && (
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Wifi className="h-4 w-4" />
              <span>Wifi</span>
            </div>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
              ${flight.price}
            </div>
            <div className="text-xs text-white/60">/ included tax & fees</div>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 text-white shadow-lg shadow-blue-500/50 hover:from-blue-600 hover:to-purple-700">
            Select
          </Button>
        </div>
      </div>
    </Card>
  );
}
