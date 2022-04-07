import type { NextPage } from "next";
import toast from "react-hot-toast";
import { firestore, postToJSON, fromMillis } from "../lib/firebase";
import styles from "../styles/Home.module.scss";
import { useState } from "react";
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { query as queryFirestore } from "firebase/firestore";
import PostFeed from "../components/PostFeed";
import Skeleton from "react-loading-skeleton";

const LIMIT = 1;

export async function getServerSideProps(context: any) {
  const postsQuery = query(
    collectionGroup(firestore, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts }, //will be passed to the page component as props
  };
}

const Home: NextPage = ({ posts }: any) => {
  const [postsm, setPosts] = useState(posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor =
      typeof last.createdAt == "number"
        ? fromMillis(last.createAt)
        : last.createdAt;

    const query = queryFirestore(
      collectionGroup(firestore, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(LIMIT)
    );

    const newPosts = (await getDocs(query)).docs.map((doc) => doc.data());
    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };
  return (
    <div className={styles.container}>
      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load More </button>
      )}
      {loading && <Skeleton />}
      {postsEnd && "You have reached the end!"}
    </div>
  );
};

export default Home;
