export type FlightOffer = {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  isUpsellOffer: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
};

export type Itinerary = {
  duration: string;
  segments: Segment[];
};

export type Segment = {
  departure: LocationInfo;
  arrival: LocationInfo;
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating: {
    carrierCode: string;
  };
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
};

export type LocationInfo = {
  iataCode: string;
  terminal?: string;
  at: string;
};

export type Price = {
  currency: string;
  total: string;
  base: string;
  fees?: Fee[];
  grandTotal?: string;
};

export type Fee = {
  amount: string;
  type: string;
};

export type PricingOptions = {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
};

export type TravelerPricing = {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: Price;
  fareDetailsBySegment: FareDetailsBySegment[];
};

export type FareDetailsBySegment = {
  segmentId: string;
  // You can extend below fields if your full JSON includes more
  // e.g., cabin, class, includedCheckedBags, etc.
};
