"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import { increment, decrement } from "../GlobalRedux/slices/counterSlice";
import type { RootState } from "../GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";

import { SingleProduct } from "@/types";
import Loading from "../Components/Loading";
import { ShoppingBag } from "tabler-icons-react";

async function fetchProductById(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
  return data;
}

interface Params {
  params: {
    slug: string[];
  };
}

export default function Product({ params }: Params) {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const [product, setProducts] = useState<SingleProduct>();

  useEffect(() => {
    async function getProducts() {
      const data = await fetchProductById(params.slug[1]);
      setProducts(data);
    }

    getProducts();
  }, [params.slug]);

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
          <section className={styles.productDetails}>
            <h1>{product.title}</h1>
            <p className={styles.productDescription}>{product.description}</p>

            <button
              className={styles.button}
              onClick={() => dispatch(increment())}
            >
              <ShoppingBag size={20} strokeWidth={1} color={"white"} /> Add to
              cart
            </button>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
}
