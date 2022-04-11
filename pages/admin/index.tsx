import styles from "../../styles/Admin.module.scss";
import AuthCheck from "../../components/AuthCheck";
import PostFeed from "../../components/PostFeed";
import { UserContext } from "../../lib/context";
import { firestore, auth } from "../../lib/firebase";
import {
  collection,
  doc,
  serverTimestamp,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { query as queryFirestore } from "firebase/firestore";

import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { useCollection } from "react-firebase-hooks/firestore";
import { kebabCase } from "lodash";
import toast from "react-hot-toast";

export default function AdminPostsPage(props: any) {
  return (
    <main>
      <AuthCheck>
        <CreateNewPost />
        <hr></hr>
        <PostList />
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const ref1 = collection(
    doc(firestore, "users", auth.currentUser!.uid),
    "posts"
  );

  const query = queryFirestore(ref1, orderBy("createdAt"));
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());
  return (
    <div className={styles.postList}>
      <PostFeed posts={posts} admin />
    </div>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e: any) => {
    e.preventDefault();

    const uid = auth.currentUser!.uid;

    const ref = doc(doc(firestore, "users", uid), "posts", slug);

    // Tip: give all fields a default value here

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await setDoc(ref, data);

    toast.success("Post created!");

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form className={styles.createForm} onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
        className={styles.input}
        type={"text"}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button
        type="submit"
        disabled={!isValid}
        className={styles.createNewPost}
      >
        Create New Post
      </button>
    </form>
  );
}
