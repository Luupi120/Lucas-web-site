"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { SlidersHorizontal, Package, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductModal } from "@/components/catalog/product-modal";
import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { SheetProduct } from "@/lib/data";

interface ProductsResponse {
  products: SheetProduct[];
  categories: string[];
  storageOptions: string[];
  colorOptions: string[];
  lastUpdated: string;
  error?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const { data, error, isLoading } = useSWR<ProductsResponse>(
    "/api/products",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SheetProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update category from URL
  useEffect(() => {
    const category = searchParams.get("category");
    if (category && data?.categories) {
      // Map URL slugs to actual category names
      const categoryMap: Record<string, string> = {
        iphone: "iPhone",
        iphones: "iPhones",
        macbook: "MacBook",
        macbooks: "MacBooks",
        mac: "Mac",
        ipad: "iPad",
        ipads: "iPads",
        "apple-watch": "Apple Watch",
        "apple-watches": "Apple Watches",
        airpods: "AirPods",
        acessorios: "Acessórios",
        accessories: "Acessórios",
      };

      const mappedCategory = categoryMap[category.toLowerCase()];
      if (mappedCategory) {
        // Find matching category in data
        const matchingCategory = data.categories.find(
          (cat) => cat.toLowerCase() === mappedCategory.toLowerCase()
        );
        if (matchingCategory) {
          setSelectedCategory(matchingCategory);
        }
      }
    }
  }, [searchParams, data?.categories]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];

    let result = [...data.products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by storage
    if (selectedStorage) {
      result = result.filter(
        (p) => p.storage.toLowerCase().includes(selectedStorage.toLowerCase())
      );
    }

    // Filter by color
    if (selectedColor) {
      result = result.filter((p) =>
        p.colors.some((c) => c.toLowerCase().includes(selectedColor.toLowerCase()))
      );
    }

    // Filter by availability
    if (showOnlyAvailable) {
      result = result.filter((p) => p.available);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => {
          if (a.priceNumber === 0) return 1;
          if (b.priceNumber === 0) return -1;
          return a.priceNumber - b.priceNumber;
        });
        break;
      case "price-desc":
        result.sort((a, b) => {
          if (a.priceNumber === 0) return 1;
          if (b.priceNumber === 0) return -1;
          return b.priceNumber - a.priceNumber;
        });
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [data?.products, selectedCategory, selectedStorage, selectedColor, showOnlyAvailable, sortBy]);

  const handleViewDetails = (product: SheetProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedStorage("");
    setSelectedColor("");
    setShowOnlyAvailable(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  if (error || data?.error) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center glass-card p-8 max-w-md">
          <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Erro ao carregar produtos
          </h2>
          <p className="text-muted-foreground mb-4">
            Não foi possível carregar o catálogo. Por favor, tente novamente mais tarde.
          </p>
          <Button onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Catálogo
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Produtos Apple originais importados dos EUA. Escolha o seu e converse
            com a gente pelo WhatsApp.
          </p>
        </div>

        {/* Mobile filter button */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
            {(selectedCategory || selectedStorage || selectedColor || showOnlyAvailable) && (
              <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {
                  [selectedCategory, selectedStorage, selectedColor, showOnlyAvailable].filter(
                    Boolean
                  ).length
                }
              </span>
            )}
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Filters */}
          <CatalogFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedStorage={selectedStorage}
            onStorageChange={setSelectedStorage}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
            sortBy={sortBy}
            onSortChange={setSortBy}
            showOnlyAvailable={showOnlyAvailable}
            onShowOnlyAvailableChange={setShowOnlyAvailable}
            onClearFilters={handleClearFilters}
            isMobileOpen={isMobileFiltersOpen}
            onMobileClose={() => setIsMobileFiltersOpen(false)}
            categories={data?.categories || []}
            storageOptions={data?.storageOptions || []}
            colorOptions={data?.colorOptions || []}
          />

          {/* Products grid */}
          <div className="flex-1">
            {/* Results count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground text-sm">
                {filteredProducts.length} produto
                {filteredProducts.length !== 1 ? "s" : ""} encontrado
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-muted-foreground mb-4">
                  Tente ajustar os filtros ou limpar a busca.
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
