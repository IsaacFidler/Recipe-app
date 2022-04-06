import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <button onClick={() => toast.success("hello isaac")}>Toast Me</button>
      <Skeleton count={5} style={{ width: 50 }} />
      <h1>home</h1>
    </div>
  );
};

export default Home;
