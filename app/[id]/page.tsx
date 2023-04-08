"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";

import type { RootState } from "../GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";

import { SingleProduct } from "@/types";
import Loading from "../Components/Loading";

async function fetchProductById(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
  return data;
}

interface Params {
  params: {
    id: string
  }
}

export default function Product({ params }: Params) {
  const count = useSelector((state: RootState) => state.counter.value);

  const [product, setProducts] = useState<SingleProduct>();

  useEffect(() => {
    async function getProducts() {
      const data = await fetchProductById(params.id);
      setProducts(data);
    }

    getProducts();
  }, [params.id]);

  return (
    <main className={styles.main}>
      {product ? (
        <>
      <section className={styles.productImage}>
      <Image
            src={product.image}
            alt={product.description}
            width={300}
            height={300}
          />
      </section>
      <section className={styles.productDescription}>
      <h1>{product.title} <span>{count}</span></h1>
      <p>{product.description}</p>
    </section>
        </>
        ) : <Loading />}
    </main>
  );
}
