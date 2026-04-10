"use client";

import {
  ClipboardCheck,
  Tag,
  Users,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { valuePropositions } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  "clipboard-check": ClipboardCheck,
  tag: Tag,
  users: Users,
  plane: Plane,
  "shield-check": ShieldCheck,
};

export function TrustIndicators() {
  return (
    <section className="py-24 bg-navy-deep relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Por que comprar com a Woop?
          </h2>
          <p className="text-muted-foreground text-lg">
            Uma experiência de compra pensada para quem valoriza transparência e
            confiança.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {valuePropositions.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.id}
                className="group glass-card p-6 hover:bg-secondary/30 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    {Icon && (
                      <Icon className="h-6 w-6 text-primary" />
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
