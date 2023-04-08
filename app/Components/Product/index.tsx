import Link from "next/link";
import styles from "./component.module.scss";
import { SingleProduct } from "@/types";
import Image from "next/image";

export default function Product(data: SingleProduct) {
  const productSlug = data.title.trim().replace(/[.,-]/g, ' ').replace(/\s+/g, '-').toLowerCase()
  return (
    <article className={styles.productContainer}>
      <Link href={`/products/${data.id}/${productSlug}`}><h2>{data.title}</h2>
        <section className={styles.productImageContainer}>
          <Image
            src={data.image}
            alt={data.description}
            width={300}
            height={300}
          />
        </section>
        <section className={styles.productPrice}>
          $ {data.price}
        </section>
      </Link>
    </article>
  );
}
