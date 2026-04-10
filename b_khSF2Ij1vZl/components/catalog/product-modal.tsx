"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, MessageCircle, Package, Cpu, HardDrive, Monitor, MemoryStick, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetProduct, getWhatsAppLinkWithMessage, getWhatsAppLink } from "@/lib/data";

interface ProductModalProps {
  product: SheetProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const whatsappLink = product.whatsappMessage
    ? getWhatsAppLinkWithMessage(product.whatsappMessage)
    : getWhatsAppLink(product.name);

  const isUnavailable = !product.available;

  const specs = [
    { icon: HardDrive, label: "Armazenamento", value: product.storage },
    { icon: MemoryStick, label: "RAM", value: product.ram },
    { icon: Monitor, label: "Tela", value: product.screenSize },
    { icon: Cpu, label: "Chip", value: product.chip },
  ].filter((spec) => spec.value);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-4 md:inset-8 lg:inset-16 overflow-hidden">
        <div className="h-full glass-card overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-foreground">
                {product.name}
              </h2>
              {isUnavailable && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-destructive/10 text-destructive text-xs font-medium">
                  <XCircle className="h-3 w-3" />
                  Indisponível
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Fechar"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image */}
              <div
                className={`aspect-square bg-secondary/50 rounded-xl relative overflow-hidden ${
                  isUnavailable ? "opacity-70" : ""
                }`}
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`object-cover ${isUnavailable ? "grayscale" : ""}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-3xl bg-background/50 flex items-center justify-center">
                      <Package className="w-16 h-16 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-6">
                {/* Category & Price */}
                <div>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-md">
                    {product.category}
                  </span>
                  <p
                    className={`text-2xl font-bold mt-4 ${
                      isUnavailable ? "text-muted-foreground line-through" : "text-foreground"
                    }`}
                  >
                    {product.price}
                  </p>
                  {isUnavailable && (
                    <p className="text-sm text-destructive mt-1">
                      Este produto está temporariamente indisponível.
                    </p>
                  )}
                </div>

                {/* Variant */}
                {product.variant && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Variante
                    </h3>
                    <span className="px-4 py-2 rounded-lg bg-secondary text-foreground text-sm font-medium">
                      {product.variant}
                    </span>
                  </div>
                )}

                {/* Colors */}
                {product.colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Cores disponíveis
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground text-sm"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specs */}
                {specs.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Especificações
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {specs.map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                        >
                          <spec.icon className="h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {spec.label}
                            </p>
                            <p className="text-sm font-medium text-foreground">
                              {spec.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Diferenciais Woop
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Importado dos EUA com garantia
                      </span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Produto original lacrado
                      </span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Suporte técnico incluso
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            {!isUnavailable ? (
              <Button
                asChild
                size="lg"
                className="btn-shine w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Tenho interesse neste produto
                </a>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full gap-2"
              >
                <a
                  href={getWhatsAppLink(`${product.name} (consultar disponibilidade)`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Consultar disponibilidade
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
