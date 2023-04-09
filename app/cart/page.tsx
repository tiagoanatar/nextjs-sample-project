"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import { ShoppingBag } from "tabler-icons-react";

// store
import { removeFromCart } from "../GlobalRedux/slices/cartSlice";
import type { RootState } from "../GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";

export default function Product() {
  const cart = useSelector((state: RootState) => state.cart.value);
  const products = useSelector((state: RootState) => state.products.value);
  const dispatch = useDispatch();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        <ShoppingBag size={34} strokeWidth={1} /> Shopping Cart
      </h1>
      {products.length > 0 && cart.length > 0 ? (
        products.map((item, index) => {
          if (cart.includes(item.id)){
            return (
              <section key={item.title + index} className={styles.grid}>
                <Image
                  src={item.image}
                  alt={item.description}
                  width={50}
                  height={50}
                />
                <h3>{item.title}</h3>
                <h3>{item.category}</h3>
                <h3>{item.price}</h3>
                <button
                  className={styles.button}
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  X
                </button>
              </section>
            )
        };
        })
      ) : (
        <p className={styles.alert}>Your shopping cart is empty</p>
      )}
    </main>
  );
}
