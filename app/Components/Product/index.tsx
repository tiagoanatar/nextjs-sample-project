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
  const currency = useSelector((state: RootState) => state.currency.current);

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
        <section className={styles.productPrice}>{currency} {data.price}</section>
      </Link>
    </article>
  );
}
