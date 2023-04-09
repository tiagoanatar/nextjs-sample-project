"use client";

import styles from "./component.module.scss";
import { BoxModel } from "tabler-icons-react";

export default function Footer() {
  return (
    <section className={styles.container}>
      <BoxModel size={28} strokeWidth={1} color={"white"} />
    </section>
  );
}
