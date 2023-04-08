"use client";

import { useSelector } from "react-redux";
import type { RootState } from "../../GlobalRedux/store";
import styles from "./component.module.scss";
import { ShoppingBag, BoxModel } from "tabler-icons-react";

export default function Header() {
  const count = useSelector((state: RootState) => state.counter.value);
  return (
    <section className={styles.headerContainer}>
        <section className={styles.headerCompanyLogo}>
          <BoxModel size={48} strokeWidth={1} color={"white"} />
          <section>
            <span>COMPANY</span>NAME
          </section>
        </section>
        <section className={styles.headerShoppingBag}>
          <ShoppingBag size={28} strokeWidth={1} color={"white"} /> {count}
        </section>
    </section>
  );
}
