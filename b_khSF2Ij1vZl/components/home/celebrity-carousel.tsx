"use client";

import { celebrities } from "@/lib/data";
import { User } from "lucide-react";

export function CelebrityCarousel() {
  // Duplicate the array for infinite scroll effect
  const duplicatedCelebrities = [...celebrities, ...celebrities];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Quem já escolheu a Woop
          </h2>
          <p className="text-muted-foreground text-lg">
            Personalidades que confiam na nossa consultoria para suas compras Apple.
          </p>
        </div>
      </div>

      {/* Infinite scroll carousel */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling container */}
        <div className="flex animate-scroll">
          {duplicatedCelebrities.map((celebrity, index) => (
            <div
              key={`${celebrity.id}-${index}`}
              className="flex-shrink-0 w-80 mx-3"
            >
              <div className="glass-card p-6 h-full hover:bg-secondary/20 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  {/* Photo placeholder */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                    <User className="w-7 h-7 text-muted-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {celebrity.name}
                    </h3>
                    <p className="text-primary text-sm font-medium">
                      {celebrity.product}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                  {celebrity.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
