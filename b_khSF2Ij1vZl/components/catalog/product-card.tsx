"use client";

import Image from "next/image";
import { MessageCircle, Eye, Package, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetProduct, WHATSAPP_BASE_URL, getWhatsAppLinkWithMessage, getWhatsAppLink } from "@/lib/data";

interface ProductCardProps {
  product: SheetProduct;
  onViewDetails: (product: SheetProduct) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const whatsappLink = product.whatsappMessage
    ? getWhatsAppLinkWithMessage(product.whatsappMessage)
    : getWhatsAppLink(product.name);

  const isUnavailable = !product.available;

  return (
    <div
      className={`group glass-card overflow-hidden transition-all duration-300 ${
        isUnavailable ? "opacity-70" : "hover:bg-secondary/20"
      }`}
    >
      {/* Image */}
      <div className="aspect-square bg-secondary/50 relative overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
              isUnavailable ? "grayscale" : ""
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-background/50 flex items-center justify-center">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Unavailable badge */}
        {isUnavailable && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <div className="bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              <span className="font-medium text-sm">Indisponível</span>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        {!isUnavailable && (
          <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onViewDetails(product)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              Detalhes
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Category badge */}
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="text-lg font-semibold text-foreground line-clamp-2">
          {product.name}
        </h3>

        {/* Specs */}
        <div className="space-y-1">
          {product.storage && (
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded mr-1">
              {product.storage}
            </span>
          )}
          {product.ram && (
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded mr-1">
              {product.ram}
            </span>
          )}
          {product.screenSize && (
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
              {product.screenSize}
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.colors.slice(0, 2).map((color) => (
              <span key={color} className="text-xs text-muted-foreground">
                {color}
              </span>
            ))}
            {product.colors.length > 2 && (
              <span className="text-xs text-muted-foreground">
                , +{product.colors.length - 2} cores
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <p
          className={`text-lg font-semibold ${
            isUnavailable ? "text-muted-foreground line-through" : "text-foreground"
          }`}
        >
          {product.price}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(product)}
            className="w-full gap-2"
          >
            <Eye className="h-4 w-4" />
            Ver detalhes
          </Button>
          {!isUnavailable && (
            <Button
              asChild
              size="sm"
              className="btn-shine w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Chamar no WhatsApp
              </a>
            </Button>
          )}
          {isUnavailable && (
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="w-full gap-2"
            >
              <a
                href={getWhatsAppLink(`${product.name} (consultar disponibilidade)`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Consultar disponibilidade
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
