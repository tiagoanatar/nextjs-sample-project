import Link from "next/link";
import styles from "./component.module.scss";
import { SingleProduct } from "@/types";
import Image from "next/image";

export default function Product(data: SingleProduct) {
  return (
    <article className={styles.productContainer}>
      <Link href={`/products/${data.id}/${data.title.replaceAll(" ", "-").toLowerCase()}`}><h2>{data.title}</h2>
        <section className={styles.productImageContainer}>
          <Image
            src={data.image}
            alt={data.description}
            width={300}
            height={300}
          />
        </section>
        <section>
          <data value="50">$ {data.price}</data>
        </section>
      </Link>
    </article>
  );
}
