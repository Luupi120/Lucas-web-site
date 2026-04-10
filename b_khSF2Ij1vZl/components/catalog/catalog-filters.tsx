"use client";

import { X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CatalogFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedStorage: string;
  onStorageChange: (storage: string) => void;
  selectedColor: string;
  onColorChange: (color: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  showOnlyAvailable: boolean;
  onShowOnlyAvailableChange: (show: boolean) => void;
  onClearFilters: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  categories: string[];
  storageOptions: string[];
  colorOptions: string[];
}

const sortOptions = [
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "name-asc", label: "Nome A-Z" },
];

export function CatalogFilters({
  selectedCategory,
  onCategoryChange,
  selectedStorage,
  onStorageChange,
  selectedColor,
  onColorChange,
  sortBy,
  onSortChange,
  showOnlyAvailable,
  onShowOnlyAvailableChange,
  onClearFilters,
  isMobileOpen,
  onMobileClose,
  categories,
  storageOptions,
  colorOptions,
}: CatalogFiltersProps) {
  const hasActiveFilters =
    selectedCategory || selectedStorage || selectedColor || showOnlyAvailable;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-2" />
          Limpar filtros
        </Button>
      )}

      {/* Sort */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Ordenar por
        </h3>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                sortBy === option.value
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Categoria
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange("")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !selectedCategory
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Storage */}
      {storageOptions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Armazenamento
          </h3>
          <div className="flex flex-wrap gap-2">
            {storageOptions.map((storage) => (
              <button
                key={storage}
                onClick={() =>
                  onStorageChange(selectedStorage === storage ? "" : storage)
                }
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedStorage === storage
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {storage}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color */}
      {colorOptions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Cor</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() =>
                  onColorChange(selectedColor === color ? "" : color)
                }
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedColor === color
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Disponibilidade
        </h3>
        <button
          onClick={() => onShowOnlyAvailableChange(!showOnlyAvailable)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
            showOnlyAvailable
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          <span
            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
              showOnlyAvailable
                ? "bg-primary border-primary"
                : "border-muted-foreground"
            }`}
          >
            {showOnlyAvailable && (
              <svg
                className="w-3 h-3 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </span>
          Mostrar apenas disponíveis
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop filters */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="h-5 w-5 text-foreground" />
            <h2 className="font-semibold text-foreground">Filtros</h2>
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile filters overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full glass border-l border-border overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-foreground" />
                  <h2 className="font-semibold text-foreground">Filtros</h2>
                </div>
                <button
                  onClick={onMobileClose}
                  className="p-2 rounded-lg hover:bg-secondary"
                  aria-label="Fechar filtros"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
