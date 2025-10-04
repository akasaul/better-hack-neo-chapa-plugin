import { betterFetch } from "@better-fetch/fetch";
import type { FlightParam } from "@/lib/types";
import type { FlightOffer } from "@/lib/flight-offer-types";

type AmadasAccessToken = {
  type: string;
  username: string;
  application_name: string;
  client_id: string;
  token_type: string;
  server: string;
  access_token: string;
  expires_in: string;
  state: string;
};

async function generateAccessToken(): Promise<AmadasAccessToken | null> {
  try {
    const formBody = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: import.meta.env.VITE_AMADUES_ID,
      client_secret: import.meta.env.VITE_AMADUES_SECRET,
    });

    const { data, error } = await betterFetch<AmadasAccessToken | null>(
      import.meta.env.VITE_FLIGHT_ACCESS_KEY_GENERATE_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      }
    );

    if (error) {
      console.error("Amadeus token generation error:", error);
      return null;
    }

    return data;
  } catch (e) {
    console.error("error generating amadas access token:", e);
    return null;
  }
}

export async function fetchFlight(
  queryParams: FlightParam
): Promise<FlightOffer[] | null> {
  try {
    const accessToken = await generateAccessToken();
    if (!accessToken) {
      console.log("unable to generate access token");
      return null;
    }
    const params = new URLSearchParams(queryParams);
    const { data, error } = await betterFetch<FlightOffer[]>(
      import.meta.env.VITE_FLIGHTS_API_URL,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken.access_token}`,
        },
        body: params.toString(),
      }
    );
    if (!data) {
      return null;
    }
    return data;
  } catch (e) {
    console.error("Error fetching flight data:", e);
    return null;
  }
}
