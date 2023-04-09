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
  const currency = useSelector((state: RootState) => state.currency);

  return (
    <article className={styles.container}>
      <Link href={`/products/${data.id}/${productSlug}`}>
        <section className={styles.spacer}>
          <section className={styles.title}>
            <h2>{data.title}</h2>
          </section>
        </section>
        <section className={styles.image}>
          <Image
            src={data.image}
            alt={data.description}
            width={300}
            height={300}
            priority={true}
          />
        </section>
        <section className={styles.amount}>
          <span className={styles.currency}>{currency.current}</span>
          <span className={`${styles.price} ${currency.loading ? styles.loading : null}`}>{data.price}</span>
        </section>
      </Link>
    </article>
  );
}
