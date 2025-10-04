export interface SearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: {
    adults: number;
    children: number;
  };
  seatClass: "economy" | "business" | "first";
}

export interface FilterParams {
  departureTime: {
    start: number;
    end: number;
  };
  landingTime: {
    start: number;
    end: number;
  };
  priceRange: {
    min: number;
    max: number;
  };
  facilities: string[];
}

export interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  arrivalDate: string;
  duration: string;
  stops: number;
  price: number;
  baggage: string;
  facilities: string[];
}

export type FlightParam = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  adults: string;
  currencyCode: string;
  max: string;
};
