"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
import { ShoppingBag, ArrowNarrowLeft } from "tabler-icons-react";

// store
import { removeFromCart } from "../GlobalRedux/slices/cartSlice";
import type { RootState } from "../GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";

export default function Product() {
  const cart = useSelector((state: RootState) => state.cart.value);
  const products = useSelector((state: RootState) => state.products.value);
  const currency = useSelector((state: RootState) => state.currency);
  const dispatch = useDispatch();

  function countOccurrences(arr: Array<number>, num: number) {
    return arr.reduce((acc, curr) => {
      if (curr === num) {
        acc++;
      }
      return acc;
    }, 0);
  }

  return (
    <main>
      <section className={styles.title}>
        <h1>
          <ShoppingBag size={34} strokeWidth={1} /> Shopping Cart
        </h1>
        <Link href="/">
          <button className={styles.button}>
            <ArrowNarrowLeft size={20} strokeWidth={1} /> Back to Products
          </button>
        </Link>
      </section>
      {products.length > 0 && cart.length > 0 ? (
        products.map((item, index) => {
          if (cart.includes(item.id)) {
            return (
              <section key={item.title + index} className={styles.grid}>
                <Image
                  src={item.image}
                  alt={item.description}
                  width={50}
                  height={50}
                />
                <h3>{item.title}</h3>
                <p>{item.category}</p>
                <p
                  className={`${styles.price} ${
                    currency.loading ? styles.loading : null
                  }`}
                >
                  {currency.current} {item.price}
                </p>
                <p>QTY: {countOccurrences(cart, item.id)}</p>
                <button
                  className={styles.button}
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  X
                </button>
              </section>
            );
          }
        })
      ) : (
        <p className={styles.alert}>Your shopping cart is empty</p>
      )}
    </main>
  );
}
