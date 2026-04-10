import { Metadata } from "next";
import {
  MessageCircle,
  Shield,
  Heart,
  Target,
  CheckCircle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sobre a Woop | Sua Consultoria Apple no Brasil",
  description:
    "Conheça a Woop e o Diego, fundador da consultoria Apple que ajuda brasileiros a comprar tecnologia com clareza, preço justo e suporte humano.",
};

export default function SobrePage() {
  const values = [
    {
      icon: Shield,
      title: "Transparência",
      description:
        "Nada de letras miúdas ou surpresas. Você sabe exatamente o que está comprando e quanto vai pagar.",
    },
    {
      icon: Heart,
      title: "Cuidado",
      description:
        "Cada cliente é único. Entendemos seu perfil antes de recomendar qualquer produto.",
    },
    {
      icon: Target,
      title: "Precisão",
      description:
        "Recomendamos o produto certo para você, não o mais caro ou o que dá mais margem.",
    },
  ];

  const differentials = [
    "Produtos Apple originais importados dos EUA",
    "Orientação técnica para escolher o modelo certo",
    "Preço justo e transparente",
    "Suporte humano do início ao fim",
    "Sem pressão para fechar negócio",
    "Acompanhamento após a compra",
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-medium mb-3">Sobre a Woop</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Apple do jeito que deveria ser vendido no Brasil
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A Woop nasceu de uma frustração: por que é tão difícil comprar Apple
              no Brasil sem ser enrolado, pagar caro demais ou ficar sem suporte
              depois? A gente mudou isso.
            </p>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-16 bg-navy-deep">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
                Uma forma diferente de comprar tecnologia
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Quando você compra com a Woop, não está apenas adquirindo um
                  produto. Está tendo acesso a uma consultoria que entende de
                  tecnologia e se importa com a sua decisão.
                </p>
                <p>
                  Nós acreditamos que comprar Apple não precisa ser complicado.
                  Não precisa de vendedor insistente, de comparativos confusos ou
                  de medo de estar pagando mais do que deveria.
                </p>
                <p>
                  Por isso, criamos um processo simples: você conta o que precisa,
                  a gente orienta com clareza, e você decide no seu tempo.
                  Compramos juntos, importamos dos EUA com segurança, e você
                  recebe seu Apple com todo o suporte.
                </p>
              </div>
            </div>

            {/* Values cards */}
            <div className="space-y-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="glass-card p-6 flex gap-4 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Diego section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Photo placeholder */}
              <div className="md:col-span-1">
                <div className="aspect-square rounded-2xl bg-secondary flex items-center justify-center max-w-[200px] mx-auto">
                  <User className="w-20 h-20 text-muted-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">
                    Diego
                  </h2>
                  <p className="text-primary font-medium">Fundador da Woop</p>
                </div>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Apaixonado por tecnologia desde sempre, Diego criou a Woop
                    depois de ajudar amigos e familiares a escolherem seus
                    produtos Apple. O que começou de forma informal virou uma
                    missão: democratizar o acesso a tecnologia de qualidade no
                    Brasil.
                  </p>
                  <p>
                    Especialista em produtos Apple, ele conhece cada detalhe dos
                    aparelhos e sabe orientar de verdade. Nada de script de
                    vendedor: é conversa de quem entende e quer te ajudar a fazer
                    a escolha certa.
                  </p>
                </div>
                <Button
                  asChild
                  className="btn-shine bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Conversar com Diego
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentials section */}
      <section className="py-16 bg-navy-deep">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Por que escolher a Woop?
            </h2>
            <p className="text-muted-foreground text-lg">
              Mais do que vender produtos, entregamos uma experiência de compra
              que você não encontra em outro lugar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {differentials.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 glass-card p-4"
              >
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Vamos conversar?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Conta pra gente o que você precisa. Sem compromisso, sem pressão.
              Só uma conversa pra entender como a Woop pode te ajudar.
            </p>
            <Button
              asChild
              size="lg"
              className="btn-shine bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8 h-14"
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
          </div>
        </div>
      </section>
    </div>
  );
}
