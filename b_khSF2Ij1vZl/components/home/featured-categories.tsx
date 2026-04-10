"use client";

import Link from "next/link";
import { ChevronRight, Smartphone, Laptop, Tablet, Watch, Headphones, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  iphone: Smartphone,
  macbook: Laptop,
  ipad: Tablet,
  "apple-watch": Watch,
  airpods: Headphones,
  acessorios: Box,
};

export function FeaturedCategories() {
  return (
    <section className="py-24 bg-navy-deep relative">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Explore nosso catálogo
          </h2>
          <p className="text-muted-foreground text-lg">
            Produtos Apple originais, importados dos EUA com toda a orientação
            que você precisa.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = iconMap[category.slug] || Box;
            return (
              <Link
                key={category.id}
                href={`/catalogo?category=${category.slug}`}
                className="group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="glass-card p-6 h-full flex flex-col items-center text-center hover:bg-secondary/30 transition-all duration-300 hover:-translate-y-1">
                  {/* Image placeholder */}
                  <div className="w-full aspect-square rounded-lg bg-secondary/50 mb-4 flex items-center justify-center group-hover:bg-secondary transition-colors overflow-hidden">
                    <Icon className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-border hover:bg-secondary gap-2"
          >
            <Link href="/catalogo">
              Explorar catálogo
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
