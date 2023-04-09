"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import { SingleProduct } from "@/types";
import Loading from "../Components/Loading";
import { ShoppingBag } from "tabler-icons-react";

// store
import { addToCart } from "../GlobalRedux/slices/cartSlice";
import type { RootState } from "../GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";

interface Params {
  params: {
    slug: string[];
  };
}

export default function Product({ params }: Params) {
  const currency = useSelector((state: RootState) => state.currency);
  const productsStore = useSelector((state: RootState) => state.products.value);
  const dispatch = useDispatch();

  const [product, setProduct] = useState<SingleProduct>();

  useEffect(() => {
    async function getProducts() {
      const data = productsStore.filter(
        (item) => item.id === Number(params.slug[1])
      );
      setProduct(data[0]);
    }

    getProducts();
  }, [params.slug, productsStore]);

  return (
    <main className={styles.main}>
      {product ? (
        <>
          <section className={styles.image}>
            <Image
              src={product.image}
              alt={product.description}
              width={300}
              height={300}
              priority={true}
            />
          </section>
          <section className={styles.details}>
            <h1>{product.title}</h1>

            <section className={styles.amount}>
              <span className={styles.currency}>{currency.current}</span>
              <span className={`${styles.price} ${currency.loading ? styles.loading : null}`}>{product.price}</span>
            </section>

            <p className={styles.description}>{product.description}</p>

            <button
              className={styles.button}
              onClick={() => dispatch(addToCart(product.id))}
            >
              <ShoppingBag size={20} strokeWidth={1} /> Add to cart
            </button>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
}
