import { describe, it, expect } from "vitest";
import { getProducts, getProductById } from "./product";

describe("getProducts", () => {
  it("returns an array of products", () => {
    const products = getProducts();
    expect(Array.isArray(products)).toBe(true);
  });

  it("returns 8 products", () => {
    const products = getProducts();
    expect(products).toHaveLength(8);
  });

  it("each product has required fields: id, name, price, image, description", () => {
    const products = getProducts();
    products.forEach((product) => {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("image");
      expect(product).toHaveProperty("description");
    });
  });

  it("product ids are unique", () => {
    const products = getProducts();
    const ids = products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("all prices are positive numbers", () => {
    const products = getProducts();
    products.forEach((product) => {
      expect(typeof product.price).toBe("number");
      expect(product.price).toBeGreaterThan(0);
    });
  });

  it("returns the same reference each call (data integrity)", () => {
    const first = getProducts();
    const second = getProducts();
    expect(first).toEqual(second);
  });

  it("first product is Wireless Headphones with id 1", () => {
    const products = getProducts();
    expect(products[0].id).toBe(1);
    expect(products[0].name).toBe("Wireless Headphones");
  });
});

describe("getProductById", () => {
  it("returns the correct product for a numeric id", () => {
    const product = getProductById(1);
    expect(product).toBeDefined();
    expect(product.id).toBe(1);
    expect(product.name).toBe("Wireless Headphones");
  });

  it("returns the correct product when id is a string (coerces to Number)", () => {
    const product = getProductById("2");
    expect(product).toBeDefined();
    expect(product.id).toBe(2);
    expect(product.name).toBe("Smart Watch");
  });

  it("returns undefined for a non-existent id", () => {
    const product = getProductById(9999);
    expect(product).toBeUndefined();
  });

  it("returns undefined for id 0", () => {
    const product = getProductById(0);
    expect(product).toBeUndefined();
  });

  it("returns undefined for a negative id", () => {
    const product = getProductById(-1);
    expect(product).toBeUndefined();
  });

  it("returns undefined for a non-numeric string id", () => {
    const product = getProductById("abc");
    expect(product).toBeUndefined();
  });

  it("returns the correct product for the last product (id 8)", () => {
    const product = getProductById(8);
    expect(product).toBeDefined();
    expect(product.id).toBe(8);
    expect(product.name).toBe("Webcam HD");
  });

  it("returns a product with all required fields", () => {
    const product = getProductById(3);
    expect(product).toHaveProperty("id", 3);
    expect(product).toHaveProperty("name", "Laptop Stand");
    expect(product).toHaveProperty("price", 49.99);
    expect(product).toHaveProperty("image");
    expect(product).toHaveProperty("description");
  });
});