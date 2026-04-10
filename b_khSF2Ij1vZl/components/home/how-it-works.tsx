"use client";

import { howItWorksSteps } from "@/lib/data";

export function HowItWorks() {
  return (
    <section className="py-24 bg-navy-deep relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-30" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium mb-3">Como funciona</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Simples, direto e sem complicação
          </h2>
          <p className="text-muted-foreground text-lg">
            Em três passos, você compra seu Apple com toda a confiança.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {howItWorksSteps.map((item, index) => (
            <div key={item.step} className="relative">
              {/* Connector line */}
              {index < howItWorksSteps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[calc(100%-20%)] h-px bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="glass-card p-8 h-full hover:bg-secondary/20 transition-colors duration-300">
                {/* Step number */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <span className="text-xl font-bold text-primary">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
