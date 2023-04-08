"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { SingleProduct } from "@/types";
import Loading from "./Components/Loading";
import Product from "./Components/Product";

async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
}

export default function Home() {
  const [products, setProducts] = useState<SingleProduct[]>([]);

  useEffect(() => {
    async function getProducts() {
      const data = await fetchProducts();
      setProducts(data);
    }

    getProducts();
  }, []);

  return (
    <main className={styles.main}>
      <h1>Products</h1>
      {products.length > 0 ? (
        <section className={styles.productGrid}>
          {products.map((item: SingleProduct) => (
            <Product {...item} key={item.id} />
          ))}
        </section>
      ) : (
        <Loading />
      )}
    </main>
  );
}
