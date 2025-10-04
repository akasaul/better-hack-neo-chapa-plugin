import type { SearchParams } from "./types";

interface ParseResult {
  response: string;
  searchParams?: SearchParams;
}

export function parseUserQuery(
  query: string,
  currentParams: SearchParams
): ParseResult {
  const lowerQuery = query.toLowerCase();

  // Extract locations
  const fromMatch = lowerQuery.match(/from\s+([a-z\s,]+?)(?:\s+to|\s+going)/i);
  const toMatch = lowerQuery.match(/to\s+([a-z\s,]+?)(?:\s|$|for|on|next)/i);

  // Extract passenger count
  const adultsMatch = lowerQuery.match(/(\d+)\s*adult/i);
  const childrenMatch = lowerQuery.match(/(\d+)\s*child/i);

  // Extract time preferences
  const isMorning = lowerQuery.includes("morning");
  const isAfternoon = lowerQuery.includes("afternoon");
  const isEvening = lowerQuery.includes("evening");

  // Extract price preferences
  const isCheap =
    lowerQuery.includes("cheap") ||
    lowerQuery.includes("budget") ||
    lowerQuery.includes("affordable");
  const isExpensive =
    lowerQuery.includes("expensive") ||
    lowerQuery.includes("premium") ||
    lowerQuery.includes("luxury");

  // Extract facility preferences
  const needsWifi =
    lowerQuery.includes("wifi") ||
    lowerQuery.includes("wi-fi") ||
    lowerQuery.includes("internet");
  const needsMeal = lowerQuery.includes("meal") || lowerQuery.includes("food");
  const needsEntertainment =
    lowerQuery.includes("entertainment") || lowerQuery.includes("movie");

  // Check if this is a search query
  const isSearchQuery =
    fromMatch ||
    toMatch ||
    adultsMatch ||
    childrenMatch ||
    isMorning ||
    isAfternoon ||
    isEvening ||
    isCheap ||
    needsWifi ||
    needsMeal;

  if (!isSearchQuery) {
    // General conversation
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
      return {
        response:
          "Hello! I'm here to help you find the perfect flight. Where would you like to go?",
      };
    }
    if (lowerQuery.includes("help")) {
      return {
        response:
          "I can help you search for flights! Just tell me where you want to go, when, and any preferences you have. For example: 'Find me a cheap flight from New York to London next week for 2 adults with WiFi'",
      };
    }
    return {
      response:
        "I understand you're looking for flight information. Could you tell me more about your travel plans? Where would you like to go and when?",
    };
  }

  // Build search params
  const searchParams: SearchParams = {
    from: fromMatch ? fromMatch[1].trim() : currentParams.from,
    to: toMatch ? toMatch[1].trim() : currentParams.to,
    departureDate: currentParams.departureDate,
    returnDate: currentParams.returnDate,
    passengers: {
      adults: adultsMatch
        ? Number.parseInt(adultsMatch[1])
        : currentParams.passengers.adults,
      children: childrenMatch
        ? Number.parseInt(childrenMatch[1])
        : currentParams.passengers.children,
    },
    seatClass: currentParams.seatClass,
  };

  // Build response
  let response = `Great! I'm searching for flights `;

  if (fromMatch) response += `from ${searchParams.from} `;
  if (toMatch) response += `to ${searchParams.to} `;

  if (adultsMatch || childrenMatch) {
    response += `for ${searchParams.passengers.adults} adult${
      searchParams.passengers.adults > 1 ? "s" : ""
    }`;
    if (searchParams.passengers.children > 0) {
      response += ` and ${searchParams.passengers.children} child${
        searchParams.passengers.children > 1 ? "ren" : ""
      }`;
    }
    response += ". ";
  }

  if (isCheap) response += `I'll prioritize budget-friendly options. `;
  if (isMorning) response += `Looking for morning departures. `;
  if (isAfternoon) response += `Looking for afternoon departures. `;
  if (isEvening) response += `Looking for evening departures. `;
  if (needsWifi) response += `Filtering for flights with WiFi. `;
  if (needsMeal) response += `Filtering for flights with meals included. `;
  if (needsEntertainment)
    response += `Filtering for flights with entertainment. `;

  response += `Let me show you the best options!`;

  return {
    response,
    searchParams,
  };
}
