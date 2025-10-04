import { createFileRoute, Link } from "@tanstack/react-router";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { Plane, Sparkles, Globe, Zap } from "lucide-react";
import { AiChatInterface } from "@/components/ai-chat-interface";
import type { FlightOffer } from "@/lib/flight-offer-types";
import { fetchFlight } from "@/utils/fetch-flight";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Hero Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Powered by Advanced AI
                </span>
              </div>

              <h1 className="text-balance text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
                Your AI Travel
                <span className="text-primary"> Assistant</span>
              </h1>

              <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                Just speak or type naturally. Our AI understands your travel
                needs and finds the perfect flights instantly.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    Smart Search
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    AI understands natural language
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    Instant Results
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get flights in seconds
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    500+ Airlines
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Worldwide coverage
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    Voice Enabled
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Speak your destination
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - AI Chat Interface */}
          <div className="flex items-center">
            <AiChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
}
