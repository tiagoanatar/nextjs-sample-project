"use client";

import Link from "next/link";
import styles from "./component.module.scss";
import { ShoppingBag, BoxModel, CurrencyDollar } from "tabler-icons-react";

// Store
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../GlobalRedux/store";
import {
  CounterState,
  setCurrency,
} from "../../GlobalRedux/slices/currencySlice";

const currencySet = ["USD", "EUR", "JPY", "GBP"];

function CurrencySelector(currency: CounterState) {
  const dispatch = useDispatch();
  return (
    <div className={styles.currencySelector}>
      {currencySet.map((item) => {
        if (item !== currency.value) {
          return (
            <button
              key={item}
              className={styles.button}
              onClick={() => dispatch(setCurrency(item))}
            >
              {item}
            </button>
          );
        }
      })}
    </div>
  );
}

export default function Header() {
  const cart = useSelector((state: RootState) => state.cart.products);
  const currency = useSelector((state: RootState) => state.currency);
  return (
    <section className={styles.container}>
      <section className={styles.logo}>
        <Link href="/">
          <BoxModel size={48} strokeWidth={1} color={"white"} />
          <section>
            <span>COMPANY</span>NAME
          </section>
        </Link>
      </section>
      <section>
        <section className={styles.cart}>
          <Link href="/cart">
            <ShoppingBag size={28} strokeWidth={1} color={"white"} />{" "}
            {cart.length}
          </Link>
        </section>
        <section className={styles.currency}>
          <CurrencyDollar size={28} strokeWidth={1} color={"white"} />
          {currency.value}
          <CurrencySelector {...currency} />
        </section>
      </section>
    </section>
  );
}
