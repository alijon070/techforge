import mongoose from "mongoose";
import ProductModel from "../schema/Product.model";
import {
  ProductCategory,
  ProductBrand,
  ProductStatus,
} from "../libs/enums/product.enum";

const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://albert:RdU0Ly56SnkQc9A3@cluster0.hyvwx8u.mongodb.net/Techforge";

// yarn seed        -> 100
// yarn seed 200     -> 200
const PRODUCT_COUNT = Number(process.argv[2]) || 100;

const MIN_PRICE = 0;
const MAX_PRICE = 5_000_000;

// -----------------------------------------------------
// Helpers
// -----------------------------------------------------

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomBoolean(): boolean {
  return Math.random() > 0.5;
}

// Fisher-Yates shuffle - used to pick exactly half the products for "on sale"
function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// -----------------------------------------------------
// Names per category
// -----------------------------------------------------

const laptopNames = [
  "ROG Strix G16",
  "ROG Zephyrus G14",
  "TUF Gaming A15",
  "TUF Gaming F15",
  "Legion 5",
  "Legion Pro 5",
  "IdeaPad Gaming 3",
  "Nitro V",
  "Predator Helios Neo",
  "Katana 15",
];

const cpuNames = [
  "Ryzen 5 7600",
  "Ryzen 7 7700",
  "Ryzen 7 7800X3D",
  "Ryzen 7 9800X3D",
  "Ryzen 9 7900X",
  "Ryzen 9 7950X3D",
  "Core i5-14600K",
  "Core i7-14700K",
  "Core i9-14900K",
];

const gpuNames = [
  "GeForce RTX 4060",
  "GeForce RTX 4060 Ti",
  "GeForce RTX 4070",
  "GeForce RTX 4070 SUPER",
  "GeForce RTX 4070 Ti SUPER",
  "GeForce RTX 4080 SUPER",
  "GeForce RTX 4090",
  "Radeon RX 7600",
  "Radeon RX 7800 XT",
  "Radeon RX 7900 XTX",
];

const motherboardNames = [
  "ROG STRIX B650",
  "ROG STRIX B650E-F",
  "TUF GAMING B650-PLUS",
  "MAG B650 TOMAHAWK",
  "PRO B760-P",
  "Z790 GAMING X",
  "B650M DS3H",
];

const ramNames = [
  "Vengeance RGB",
  "Vengeance",
  "Fury Beast",
  "Fury Renegade",
  "Trident Z5",
  "Ripjaws S5",
];

const psuNames = [
  "RM750e",
  "RM850e",
  "RM1000e",
  "Focus GX-750",
  "Focus GX-850",
  "Pure Power 12 M 850W",
  "Straight Power 12 1000W",
];

const caseNames = [
  "H5 Flow",
  "H6 Flow",
  "H7 Flow",
  "O11 Dynamic",
  "Lancool 216",
  "Meshify 2",
  "North",
  "4000D Airflow",
];

// -----------------------------------------------------
// Category -> brand list (every brand in each list WILL be used)
// -----------------------------------------------------

const laptopBrands = [
  ProductBrand.ASUS,
  ProductBrand.LENOVO,
  ProductBrand.ACER,
  ProductBrand.MSI,
];

const cpuBrands = [ProductBrand.AMD, ProductBrand.INTEL];

const gpuBrands = [ProductBrand.ASUS, ProductBrand.MSI, ProductBrand.GIGABYTE];

const motherboardBrands = [
  ProductBrand.ASUS,
  ProductBrand.MSI,
  ProductBrand.GIGABYTE,
];

const ramBrands = [
  ProductBrand.CORSAIR,
  ProductBrand.KINGSTON,
  ProductBrand.GSKILL,
];

const psuBrands = [
  ProductBrand.CORSAIR,
  ProductBrand.SEASONIC,
  ProductBrand.BE_QUIET,
];

const caseBrands = [
  ProductBrand.NZXT,
  ProductBrand.CORSAIR,
  ProductBrand.LIAN_LI,
  ProductBrand.FRACTAL,
];

// -----------------------------------------------------
// Spec/description generators per category
// (photo + price + oldPrice are added later, uniformly, in buildProduct)
// -----------------------------------------------------

interface BaseProductFields {
  productName: string;
  productBrand: ProductBrand;
  productCategory: ProductCategory;
  productDesc: string;
  productSpecifications: Record<string, any>;
}

function laptopFields(brand: ProductBrand): BaseProductFields {
  return {
    productName: `${brand} ${randomItem(laptopNames)}`,
    productBrand: brand,
    productCategory: ProductCategory.LAPTOP,
    productDesc:
      "High-performance gaming laptop designed for gaming, productivity and demanding applications.",
    productSpecifications: {
      cpu: randomItem([
        "Intel Core i5",
        "Intel Core i7",
        "Intel Core i9",
        "AMD Ryzen 5",
        "AMD Ryzen 7",
        "AMD Ryzen 9",
      ]),
      ram: randomItem(["16GB", "32GB", "64GB"]),
      storage: randomItem(["512GB SSD", "1TB SSD", "2TB SSD"]),
      display: randomItem(["15.6 FHD", "16 FHD+", "16 QHD"]),
      gpu: randomItem(["RTX 4060", "RTX 4070", "RTX 4080"]),
    },
  };
}

function cpuFields(brand: ProductBrand): BaseProductFields {
  return {
    productName: `${brand} ${randomItem(cpuNames)}`,
    productBrand: brand,
    productCategory: ProductCategory.CPU,
    productDesc:
      "High-performance desktop processor designed for gaming and demanding workloads.",
    productSpecifications: {
      socket: randomItem(["AM5", "LGA1700"]),
      cores: randomItem(["6", "8", "12", "16"]),
      threads: randomItem(["12", "16", "24", "32"]),
      wattage: randomItem(["65W", "105W", "120W", "170W"]),
    },
  };
}

function gpuFields(brand: ProductBrand): BaseProductFields {
  return {
    productName: `${brand} ${randomItem(gpuNames)}`,
    productBrand: brand,
    productCategory: ProductCategory.GPU,
    productDesc:
      "Powerful graphics card delivering high frame rates and excellent visual performance.",
    productSpecifications: {
      memory: randomItem([
        "8GB GDDR6",
        "12GB GDDR6X",
        "16GB GDDR6",
        "24GB GDDR6X",
      ]),
      interface: "PCIe 4.0",
      cooling: randomItem(["Dual Fan", "Triple Fan"]),
      wattage: randomItem(["170W", "220W", "285W", "320W"]),
    },
  };
}

function motherboardFields(brand: ProductBrand): BaseProductFields {
  return {
    productName: `${brand} ${randomItem(motherboardNames)}`,
    productBrand: brand,
    productCategory: ProductCategory.MOTHERBOARD,
    productDesc:
      "Reliable gaming motherboard with modern connectivity and high-speed memory support.",
    productSpecifications: {
      socket: randomItem(["AM5", "LGA1700"]),
      memory: "DDR5",
      formFactor: randomItem(["ATX", "Micro ATX"]),
      wifi: randomBoolean() ? "Wi-Fi 6E" : "No",
    },
  };
}

function ramFields(brand: ProductBrand): BaseProductFields {
  return {
    productName: `${brand} ${randomItem(ramNames)}`,
    productBrand: brand,
    productCategory: ProductCategory.RAM,
    productDesc:
      "High-speed DDR5 memory designed for gaming and high-performance systems.",
    productSpecifications: {
      capacity: randomItem(["16GB", "32GB", "64GB"]),
      speed: randomItem(["5200MHz", "5600MHz", "6000MHz", "6400MHz"]),
      type: "DDR5",
    },
  };
}

function psuFields(brand: ProductBrand): BaseProductFields {
  return {
    productName: `${brand} ${randomItem(psuNames)}`,
    productBrand: brand,
    productCategory: ProductCategory.PSU,
    productDesc:
      "Reliable power supply designed for modern gaming and workstation PCs.",
    productSpecifications: {
      wattage: randomItem(["650W", "750W", "850W", "1000W", "1200W"]),
      efficiency: randomItem(["80+ Gold", "80+ Platinum"]),
      modular: "Fully Modular",
    },
  };
}

function caseFields(brand: ProductBrand): BaseProductFields {
  return {
    productName: `${brand} ${randomItem(caseNames)}`,
    productBrand: brand,
    productCategory: ProductCategory.CASE,
    productDesc:
      "Modern PC case with excellent airflow, cable management and component compatibility.",
    productSpecifications: {
      formFactor: randomItem(["ATX", "Micro ATX", "Mini ITX"]),
      cooling: randomItem(["Air Cooling", "AIO Compatible"]),
      sidePanel: "Tempered Glass",
    },
  };
}

// -----------------------------------------------------
// Build the full list of (category, brand) combinations.
// Every category AND every brand within it appears at least once.
// -----------------------------------------------------

type FieldGenerator = (brand: ProductBrand) => BaseProductFields;

const categoryBrandPairs: { brand: ProductBrand; generate: FieldGenerator }[] =
  [
    ...laptopBrands.map((brand) => ({ brand, generate: laptopFields })),
    ...cpuBrands.map((brand) => ({ brand, generate: cpuFields })),
    ...gpuBrands.map((brand) => ({ brand, generate: gpuFields })),
    ...motherboardBrands.map((brand) => ({
      brand,
      generate: motherboardFields,
    })),
    ...ramBrands.map((brand) => ({ brand, generate: ramFields })),
    ...psuBrands.map((brand) => ({ brand, generate: psuFields })),
    ...caseBrands.map((brand) => ({ brand, generate: caseFields })),
  ];

// -----------------------------------------------------
// Photos - styled placeholder cards, not real photos.
//
// Keyword-based free photo services (Picsum = fully random,
// LoremFlickr = loose/unreliable tag matching) both failed to
// reliably return correct, on-topic images without manual curation.
// Rather than risk showing a random or bizarre photo next to a real
// product name, this generates a clean placeholder card with the
// product's own name and category rendered as text, styled to match
// TechForge's dark navy / blue accent theme. It won't look like a
// real product photo, but it will always be correct and on-brand.
// Swap this for real product photography once you have actual assets.
// -----------------------------------------------------

function photoUrl(category: ProductCategory, productName: string): string {
  const label = encodeURIComponent(`${category}\n${productName}`);
  // dark navy background (#0e1b2d), blue accent text (#2f80c9)
  return `https://placehold.co/600x400/0e1b2d/2f80c9?text=${label}&font=roboto`;
}

// -----------------------------------------------------
// Assemble final product list
// -----------------------------------------------------

function buildProducts(count: number) {
  const products: any[] = [];

  // Cycle through every category/brand combo repeatedly until we hit `count`,
  // so every category and every brand is guaranteed to appear, with extras
  // filled in round-robin for variety.
  for (let i = 0; i < count; i++) {
    const pair = categoryBrandPairs[i % categoryBrandPairs.length];
    const base = pair.generate(pair.brand);

    products.push({
      ...base,
      productPrice: randomNumber(MIN_PRICE, MAX_PRICE),
      productStock: randomNumber(3, 100),
      productStatus: ProductStatus.PROCESS,
      productImages: [photoUrl(base.productCategory, base.productName)],
      // productOldPrice assigned afterward, for exactly half the array
    });
  }

  // Pick exactly half the products (rounded down) to be "on sale"
  const indices = shuffle(products.map((_, i) => i));
  const onSaleCount = Math.floor(products.length / 2);
  const onSaleIndices = new Set(indices.slice(0, onSaleCount));

  products.forEach((product, i) => {
    if (onSaleIndices.has(i)) {
      // old price must be higher than the current price to be a valid discount
      product.productOldPrice = randomNumber(
        product.productPrice + 1,
        Math.round(product.productPrice * 1.5) + 10
      );
    }
  });

  return products;
}

// -----------------------------------------------------
// Seed
// -----------------------------------------------------

async function seed() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    await ProductModel.deleteMany({});
    console.log("Cleared existing products");

    const products = buildProducts(PRODUCT_COUNT);

    await ProductModel.insertMany(products);

    const onSaleCount = products.filter((p) => p.productOldPrice).length;
    console.log(`Successfully seeded ${products.length} products`);
    console.log(`  - ${onSaleCount} on sale (with productOldPrice)`);
    console.log(`  - ${products.length - onSaleCount} regular price`);
    console.log(
      `  - covering ${categoryBrandPairs.length} category/brand combinations`
    );

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Seed failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
