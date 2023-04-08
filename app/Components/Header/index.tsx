"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "../../GlobalRedux/store";
import styles from "./component.module.scss";
import { ShoppingBag, BoxModel } from "tabler-icons-react";

export default function Header() {
  const cart = useSelector((state: RootState) => state.cart.products);
  return (
    <section className={styles.headerContainer}>
      <section className={styles.headerCompanyLogo}>
        <Link href="/">
          <BoxModel size={48} strokeWidth={1} color={"white"} />
          <section>
            <span>COMPANY</span>NAME
          </section>
        </Link>
      </section>
      <section className={styles.headerShoppingBag}>
        <Link href="/cart">
          <ShoppingBag size={28} strokeWidth={1} color={"white"} />{" "}
          {cart.length}
        </Link>
      </section>
    </section>
  );
}
