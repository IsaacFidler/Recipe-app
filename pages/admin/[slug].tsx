import styles from "../../styles/Admin.module.scss";
import AuthCheck from "../../components/AuthCheck";
import { firestore, auth } from "../../lib/firebase";
import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/router";
import ImageUploader from "../../components/ImageUploader";

import { useDocumentData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminPostEdit(props: any) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(true);

  const router = useRouter();
  const { slug } = router.query;
  const uid = auth.currentUser!.uid;

  const postRef = doc(firestore, `users/${uid}/posts/${slug}`);
  const [post] = useDocumentData(postRef);

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>
              {preview ? "Edit" : "Preview"}
            </button>
            <Link href={`/${post.username}/${post.slug}`} passHref>
              <button className="createNewPost">Live view</button>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef, preview }: any) {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const updatePost = async ({ content, published }: any) => {
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success("Post updated successfully!");
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(updatePost)}>
      <div className={preview ? styles.hidden : styles.controls}>
        <div className={styles.textContainer}>
          <textarea
            className={styles.inputBlock}
            {...register("content")}
          ></textarea>
          {preview && (
            <div className="card2">
              <ReactMarkdown>{watch("content")}</ReactMarkdown>
            </div>
          )}

          <ImageUploader />
        </div>
        <fieldset>
          <input
            className="checkbox"
            type="checkbox"
            {...register("published")}
          />
          <label>Published</label>
        </fieldset>

        <button type="submit" className="createNewPost">
          Save Changes
        </button>
      </div>
    </form>
  );
}
