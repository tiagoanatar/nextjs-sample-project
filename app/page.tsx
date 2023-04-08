"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import type { RootState } from "./GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
} from "./GlobalRedux/slices/counterSlice";
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
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

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
      <button className={styles.button} onClick={() => dispatch(increment())}>
        Increment
      </button>
      <span>{count}</span>
      <button className={styles.button} onClick={() => dispatch(decrement())}>
        Decrement
      </button>
      <Link href="/">Home</Link>

      <section className={styles.productGrid}>
        {products.length > 0 ? (
          products.map((item: SingleProduct) => (
            <Product {...item} key={item.id} />
          ))
        ) : (
          <Loading />
        )}
      </section>
    </main>
  );
}
