"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./component.module.scss";
import { ShoppingBag, BoxModel, CurrencyDollar } from "tabler-icons-react";

// store
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../GlobalRedux/store";
import { setCurrency } from "../../GlobalRedux/slices/currencySlice";
import { addProducts } from "../../GlobalRedux/slices/productsSlice";

const currencySet = ["USD", "EUR", "JPY", "GBP"];

interface RootObject {
  date: string;
  info: Info;
  query: Query;
  result: number;
  success: boolean;
}

interface Query {
  amount: number;
  from: string;
  to: string;
}

interface Info {
  rate: number;
  timestamp: number;
}

function CurrencySelector() {
  const currency = useSelector((state: RootState) => state.currency);
  const dispatch = useDispatch();
  const productsStore = useSelector((state: RootState) => state.products.value);

  async function currencyConversion(value: number) {
    const myHeaders = new Headers();
    myHeaders.append("apikey", "tYbEaPt44FgmaoM4GzckFoRqWbF4EQbU");

    const requestOptions = {
      method: "GET",
      redirect: "follow" as const,
      headers: myHeaders,
    };

    const res = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${currency.current}&from=${currency.old}&amount=${value}`,
      requestOptions
    );
    const data: RootObject = await res.json();
    return data.result;
  }

  const updateProducts = async () => {
    const newProducts = [];
    for (const item of productsStore) {
      const conversion = await currencyConversion(item.price);
      newProducts.push({ ...item, price: conversion.toFixed(2) });
    }
    dispatch(addProducts(newProducts));
    console.log(newProducts);
  };

  useEffect(() => {
    updateProducts();
  }, [currency]);

  return (
    <div className={styles.currencySelector}>
      {currencySet.map((item) => {
        if (item !== currency.current) {
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
  const cart = useSelector((state: RootState) => state.cart.value);
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
          {currency.current}
          <CurrencySelector />
        </section>
      </section>
    </section>
  );
}
