"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/data";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--mouse-x", `${x}%`);
      hero.style.setProperty("--mouse-y", `${y}%`);
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        background: `
          radial-gradient(
            ellipse 80% 50% at var(--mouse-x, 50%) var(--mouse-y, 50%),
            oklch(0.22 0.04 250 / 0.4) 0%,
            transparent 50%
          ),
          radial-gradient(
            ellipse 60% 40% at 20% 80%,
            oklch(0.18 0.03 220 / 0.3) 0%,
            transparent 50%
          ),
          radial-gradient(
            ellipse 50% 30% at 80% 20%,
            oklch(0.15 0.025 260 / 0.3) 0%,
            transparent 50%
          ),
          linear-gradient(180deg, var(--background) 0%, oklch(0.08 0.02 250) 100%)
        `,
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Importados dos EUA com garantia
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 animate-fade-up text-balance"
            style={{ animationDelay: "0.1s" }}
          >
            Compre Apple do{" "}
            <span className="text-gradient">jeito certo</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up text-pretty"
            style={{ animationDelay: "0.2s" }}
          >
            Na Woop, você encontra clareza técnica, preço justo e suporte humano
            em cada etapa. Sem pressão, sem complicação. Só a escolha certa pro
            seu Apple.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              asChild
              size="lg"
              className="btn-shine bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8 h-14 text-base"
            >
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Falar no WhatsApp
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border hover:bg-secondary gap-2 px-8 h-14 text-base"
            >
              <Link href="/catalogo">
                Ver catálogo
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Device mockup placeholder */}
          <div
            className="mt-16 relative animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="relative mx-auto max-w-3xl">
              {/* Glow effect */}
              <div className="absolute inset-0 blur-3xl bg-primary/10 rounded-full transform scale-75" />
              
              {/* Device frame */}
              <div className="relative glass-card p-8 md:p-12">
                <div className="aspect-[16/9] bg-secondary/50 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-foreground">W</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Imagem do dispositivo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
