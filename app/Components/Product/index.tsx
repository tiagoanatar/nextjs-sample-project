import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./component.module.scss";
import { SingleProduct } from "@/types";
import Image from "next/image";

// store
import { useSelector } from "react-redux";
import type { RootState } from "../../GlobalRedux/store";

export default function Product(data: SingleProduct) {
  const productSlug = data.title
    .trim()
    .replace(/[.,-]/g, " ")
    .replace(/\s+/g, "-")
    .toLowerCase();

  // currency conversion
  const currency = useSelector((state: RootState) => state.currency.value);
  const [price, setPrice] = useState({
    currentExchange: currency,
    value: data.price,
  });

  const currencyConversion = useCallback(async () => {
    const myHeaders = new Headers();
    myHeaders.append("apikey", "P2VuvnnIwkfB5GiRu4mpF4kTJITXEoY3");

    const requestOptions = {
      method: "GET",
      redirect: "follow" as const,
      headers: myHeaders,
    };

    const res = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${currency}&from=${price.currentExchange}&amount=${price.value}`,
      requestOptions
    );
    const data = await res.json();
    setPrice({
      currentExchange: currency,
      value: data.result,
    })
  }, [currency, price]);

  useEffect(() => {
    if (currency !== price.currentExchange) {
      currencyConversion()
    }
  }, [currency, price.currentExchange, currencyConversion]);

  return (
    <article className={styles.productContainer}>
      <Link href={`/products/${data.id}/${productSlug}`}>
        <h2>{data.title}</h2>
        <section className={styles.productImageContainer}>
          <Image
            src={data.image}
            alt={data.description}
            width={300}
            height={300}
          />
        </section>
        <section className={styles.productPrice}>{currency} {price.value.toFixed(2)}</section>
      </Link>
    </article>
  );
}
