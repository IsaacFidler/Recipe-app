import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Link
        prefetch={true}
        href={{
          pathname: "/[username]",
          query: { username: "isaacf147" },
        }}
      />
    </div>
  );
};

export default Home;
