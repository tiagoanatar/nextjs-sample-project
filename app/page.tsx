"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { SingleProduct } from "@/types";
import Loading from "./Components/Loading";
import Product from "./Components/Product";

// store
import { useSelector } from "react-redux";
import type { RootState } from "./GlobalRedux/store";

export default function Home() {
  const productsStore = useSelector((state: RootState) => state.products.value);
  return (
    <main className={styles.main}>
      <h1>Products</h1>
      {productsStore.length > 0 ? (
        <section className={styles.grid}>
          {productsStore.map((item: SingleProduct) => (
            <Product {...item} key={item.id} />
          ))}
        </section>
      ) : (
        <Loading />
      )}
    </main>
  );
}
