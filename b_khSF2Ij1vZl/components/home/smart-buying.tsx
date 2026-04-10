"use client";

import Link from "next/link";
import { ArrowRight, Zap, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SmartBuying() {
  const features = [
    {
      icon: Target,
      title: "Análise do seu perfil",
      description:
        "Entendemos como você usa tecnologia para recomendar o produto certo.",
    },
    {
      icon: Zap,
      title: "Comparativo personalizado",
      description:
        "Mostramos as diferenças que importam para o seu caso específico.",
    },
    {
      icon: CheckCircle,
      title: "Decisão consciente",
      description:
        "Você escolhe sabendo exatamente o que está comprando e por quê.",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <p className="text-primary font-medium mb-3">Compra inteligente</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                Escolha o Apple ideal com clareza total
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Na Woop, não vendemos produtos. Ajudamos você a descobrir qual
                Apple faz sentido para sua vida. Sem jargão técnico confuso, sem
                pressão de vendedor.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              asChild
              variant="outline"
              className="border-border hover:bg-secondary gap-2"
            >
              <Link href="/comparadores">
                Ver comparadores Apple
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Visual comparison preview */}
          <div className="relative">
            <div className="glass-card p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-semibold text-foreground">
                  Qual iPhone é pra você?
                </h3>
                <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                  Exemplo
                </span>
              </div>

              {/* Comparison cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "iPhone 17", subtitle: "Para o dia a dia", highlight: false },
                  { name: "iPhone 17 Pro", subtitle: "Para profissionais", highlight: true },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-xl p-5 transition-all ${
                      item.highlight
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-secondary/50"
                    }`}
                  >
                    {/* Image placeholder */}
                    <div className="aspect-square rounded-lg bg-secondary/80 mb-4 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center">
                        <span className="text-lg font-bold text-muted-foreground">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-semibold text-foreground text-sm">
                      {item.name}
                    </h4>
                    <p className="text-muted-foreground text-xs mt-1">
                      {item.subtitle}
                    </p>

                    {item.highlight && (
                      <div className="mt-3 flex items-center gap-1 text-primary text-xs font-medium">
                        <CheckCircle className="h-3 w-3" />
                        Recomendado
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Features comparison hint */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Compare recursos, câmeras, performance...
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
