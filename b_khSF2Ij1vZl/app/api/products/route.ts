import { NextResponse } from "next/server";

const SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdNhYLgAKmLP0SL_LB5KNGccMG5ySjInIzfGHVHvlhItgQpnmQiZR569MBygTzPm9JNm9U0unAFVIR/pub?gid=178251846&single=true&output=csv";

export interface SheetProduct {
  id: string;
  name: string;
  category: string;
  variant: string;
  storage: string;
  ram: string;
  screenSize: string;
  chip: string;
  colors: string[];
  price: string;
  priceNumber: number;
  available: boolean;
  image: string;
  whatsappMessage: string;
}

function parseCSV(csv: string): string[][] {
  const lines: string[][] = [];
  let currentLine: string[] = [];
  let currentField = "";
  let insideQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      currentLine.push(currentField.trim());
      currentField = "";
    } else if ((char === "\n" || (char === "\r" && nextChar === "\n")) && !insideQuotes) {
      currentLine.push(currentField.trim());
      if (currentLine.some((field) => field !== "")) {
        lines.push(currentLine);
      }
      currentLine = [];
      currentField = "";
      if (char === "\r") i++;
    } else {
      currentField += char;
    }
  }

  // Handle last field and line
  if (currentField || currentLine.length > 0) {
    currentLine.push(currentField.trim());
    if (currentLine.some((field) => field !== "")) {
      lines.push(currentLine);
    }
  }

  return lines;
}

// Column mapping helper - finds column index by header name (case insensitive, partial match)
function findColumnIndex(headers: string[], ...searchTerms: string[]): number {
  for (const term of searchTerms) {
    const index = headers.findIndex(h => 
      h.toLowerCase().includes(term.toLowerCase())
    );
    if (index !== -1) return index;
  }
  return -1;
}

function parseProducts(rows: string[][]): SheetProduct[] {
  if (rows.length < 2) return [];

  // Get headers from first row and create column mapping
  const headers = rows[0].map(h => h.trim());
  
  // Dynamic column mapping based on header names
  const colMap = {
    category: findColumnIndex(headers, "categoria", "category"),
    name: findColumnIndex(headers, "produto", "nome", "product", "name"),
    screenSize: findColumnIndex(headers, "tela", "screen", "tamanho"),
    ram: findColumnIndex(headers, "ram", "memória"),
    storage: findColumnIndex(headers, "armazenamento", "storage", "capacidade"),
    chip: findColumnIndex(headers, "chip", "cpu", "processador"),
    colors: findColumnIndex(headers, "cores", "colors", "cor"),
    price: findColumnIndex(headers, "preço", "price", "valor"),
    image: findColumnIndex(headers, "imagem", "image", "foto", "url"),
    whatsapp: findColumnIndex(headers, "whatsapp", "mensagem", "msg"),
    available: findColumnIndex(headers, "disponível", "disponivel", "available", "estoque"),
  };
  
  console.log("[v0] Column mapping:", JSON.stringify(colMap));

  // Skip header row
  const dataRows = rows.slice(1);
  const products: SheetProduct[] = [];

  dataRows.forEach((row, index) => {
    const getValue = (colIndex: number, defaultVal = "") => 
      colIndex >= 0 && colIndex < row.length ? row[colIndex] || defaultVal : defaultVal;

    const category = getValue(colMap.category);
    const name = getValue(colMap.name);
    const screenSize = getValue(colMap.screenSize);
    const ram = getValue(colMap.ram);
    const variant = getValue(colMap.storage); // Storage
    const chip = getValue(colMap.chip);
    const colorsRaw = getValue(colMap.colors);
    const priceRaw = getValue(colMap.price);
    const imageRaw = getValue(colMap.image);
    const whatsappMessage = getValue(colMap.whatsapp);
    const availableRaw = getValue(colMap.available, "Sim"); // Default to available if not specified

    // Validate image URL - must start with http:// or https://
    const image = imageRaw.startsWith("http://") || imageRaw.startsWith("https://") 
      ? imageRaw 
      : "";

    if (!name) return;

    // Parse colors (comma separated)
    const colors = colorsRaw
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    // Parse price - try to extract from WhatsApp message first if column price seems like placeholder
    let priceNumber = 0;
    let price = "";
    
    // Try to extract real price from WhatsApp message (format: "Preço Pix: R$X.XXX.XX" or "R$X.XXX,XX")
    const whatsappPriceMatch = whatsappMessage.match(/Pre[cç]o\s*(?:Pix)?:?\s*R\$\s*([\d.,]+)/i);
    if (whatsappPriceMatch) {
      // Extract price from WhatsApp message - format is typically R$5.990.00 (dots as thousand separators)
      const priceStr = whatsappPriceMatch[1];
      // Handle format like "5.990.00" or "5.990,00" - last separator is decimal
      const cleanPrice = priceStr.replace(/[^\d.,]/g, "");
      // If has multiple dots/commas, the last one before 2 digits is decimal separator
      const parts = cleanPrice.split(/[.,]/);
      if (parts.length >= 2) {
        const lastPart = parts[parts.length - 1];
        if (lastPart.length === 2) {
          // Last part is cents
          const integerPart = parts.slice(0, -1).join("");
          priceNumber = parseFloat(`${integerPart}.${lastPart}`) || 0;
        } else {
          // No cents, just join everything
          priceNumber = parseFloat(parts.join("")) || 0;
        }
      } else {
        priceNumber = parseFloat(cleanPrice.replace(",", ".")) || 0;
      }
    }
    
    // If no price from WhatsApp or invalid, try column price
    if (priceNumber <= 0 || priceNumber <= 1000) {
      const colPriceRaw = priceRaw.replace(/[^\d.,]/g, "").replace(",", ".");
      const colPriceNumber = parseFloat(colPriceRaw) || 0;
      // Only use column price if it seems valid (not a placeholder like R$ 1 or R$ 1.000)
      if (colPriceNumber > 1000 && colPriceNumber !== 1000) {
        priceNumber = colPriceNumber;
      }
    }
    
    // Handle "A confirmar" and similar
    const isConfirmPrice = priceRaw.toLowerCase().includes("confirmar") || 
                           priceRaw.toLowerCase().includes("consultar") ||
                           (priceRaw.trim() === "" && priceNumber <= 0);
    
    if (isConfirmPrice || priceNumber <= 0) {
      price = "Consultar preço via WhatsApp";
      priceNumber = 0;
    } else {
      price = `R$ ${priceNumber.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; 
    }

    // Parse availability
    const available = availableRaw.toLowerCase() === "sim";

    products.push({
      id: `sheet-${index}`,
      name,
      category,
      variant,
      storage: variant,
      ram,
      screenSize,
      chip,
      colors,
      price,
      priceNumber,
      available,
      image,
      whatsappMessage,
    });
  });

  return products;
}

export async function GET() {
  try {
    const response = await fetch(SHEETS_URL, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error("Failed to fetch sheet data");
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    // Debug: log header and first row to understand column structure
    if (rows.length > 0) {
      console.log("[v0] CSV Header:", JSON.stringify(rows[0]));
      console.log("[v0] Header length:", rows[0].length);
    }
    if (rows.length > 1) {
      console.log("[v0] First data row:", JSON.stringify(rows[1]));
      console.log("[v0] First row length:", rows[1].length);
    }
    
    const products = parseProducts(rows);

    // Group products by name to create product entries with variants
    const productMap = new Map<string, SheetProduct[]>();
    products.forEach((product) => {
      const key = `${product.name}-${product.category}`;
      if (!productMap.has(key)) {
        productMap.set(key, []);
      }
      productMap.get(key)!.push(product);
    });

    // Get unique categories
    const categories = [...new Set(products.map((p) => p.category))].filter(Boolean);

    // Get unique storage options
    const storageOptions = [...new Set(products.map((p) => p.storage))].filter(Boolean);

    // Get unique colors
    const colorOptions = [...new Set(products.flatMap((p) => p.colors))].filter(Boolean);

    return NextResponse.json({
      products,
      categories,
      storageOptions,
      colorOptions,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", products: [], categories: [], storageOptions: [], colorOptions: [] },
      { status: 500 }
    );
  }
}
