"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { SingleProduct } from "@/types";
import Loading from "./Components/Loading";
import Product from "./Components/Product";

// store
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./GlobalRedux/store";
import { fetchProducts } from "./GlobalRedux/slices/productsSlice";

export default function Home() {
  const dispatch = useDispatch<any>();
  const productsStore = useSelector((state: RootState) => state.products.value);

  useEffect(() => {
    if (productsStore.length === 0){
      dispatch(fetchProducts());
      console.log("initial state")
    }
  }, [dispatch, productsStore]);
  return (
    <main className={styles.main}>
      <h1>Products</h1>
      {productsStore.length > 0 ? (
        <section className={styles.productGrid}>
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
