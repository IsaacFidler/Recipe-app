import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Skeleton count={5} style={{ width: 50 }} />
    </div>
  );
};

export default Home;
