import { Metadata } from "next";
import { ExternalLink, Smartphone, Laptop, Tablet, Watch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { comparisonCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Comparadores Apple | Woop",
  description:
    "Use os comparadores oficiais da Apple para escolher o produto ideal. Compare iPhones, MacBooks, iPads e Apple Watch.",
};

const iconMap: Record<string, React.ElementType> = {
  "Comparar iPhones": Smartphone,
  "Comparar MacBooks": Laptop,
  "Comparar iPads": Tablet,
  "Comparar Apple Watch": Watch,
};

export default function ComparadoresPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary font-medium mb-3">Ferramentas</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Compare e escolha com clareza
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Use os comparadores oficiais da Apple para entender as diferenças entre
            cada modelo. Depois, fale com a Woop para comprar o seu com as melhores
            condições.
          </p>
        </div>

        {/* Comparison cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {comparisonCategories.map((category, index) => {
            const Icon = iconMap[category.name] || Smartphone;
            return (
              <div
                key={category.id}
                className="group glass-card p-8 hover:bg-secondary/20 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-8 w-8 text-primary" />
                </div>

                {/* Content */}
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {category.name}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* CTA */}
                <Button
                  asChild
                  variant="outline"
                  className="gap-2 group-hover:bg-secondary"
                >
                  <a
                    href={category.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir comparador Apple
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            );
          })}
        </div>

        {/* Help section */}
        <div className="max-w-2xl mx-auto mt-16">
          <div className="glass-card p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Precisa de ajuda para decidir?
            </h3>
            <p className="text-muted-foreground mb-6">
              A Woop pode te ajudar a interpretar as especificações e escolher o
              modelo que faz mais sentido para o seu uso. Sem compromisso, sem
              pressão.
            </p>
            <Button
              asChild
              className="btn-shine bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <a
                href="https://wa.me/5511965853669?text=Ol%C3%A1%2C%20Diego!%20Preciso%20de%20ajuda%20para%20comparar%20alguns%20produtos%20Apple."
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com a Woop
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
