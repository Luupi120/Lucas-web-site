"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/data";

export function FinalCTA() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 50% 50%,
              oklch(0.20 0.04 250 / 0.5) 0%,
              transparent 60%
            )
          `,
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Content */}
          <div className="glass-card p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Pronto para comprar seu Apple com confiança?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed max-w-xl mx-auto">
              Fale com o Diego e descubra como a Woop pode te ajudar a fazer a
              escolha certa, sem pressa e sem pressão.
            </p>

            <Button
              asChild
              size="lg"
              className="btn-shine bg-primary hover:bg-primary/90 text-primary-foreground gap-3 px-10 h-16 text-lg"
            >
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-6 w-6" />
                Falar com Diego no WhatsApp
              </a>
            </Button>

            <p className="mt-6 text-muted-foreground text-sm">
              Atendimento de segunda a sexta, das 9h às 18h
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
