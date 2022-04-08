import React from "react";

import Link from "next/link";
import styles from "../styles/PostFeed.module.scss";
import { xor } from "lodash";
import { AiOutlineCheck } from "react-icons/ai";
type Props2 = {
  posts: any;
  admin?: any;
};
export default function PostFeed({ posts, admin }: Props2) {
  return (
    <div className={styles.postListContainer}>
      {posts
        ? posts.map((post: any) => (
            <>
              <PostItem post={post} key={post.slug} admin={admin} />
              <hr className={styles.breakLine}></hr>
            </>
          ))
        : null}
    </div>
  );
}

type Props = { post: any; admin: any };

function PostItem({ post, admin = false }: Props) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  const date =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();
  const str = String(date);
  const x = str.split(" ");
  const date2 = x.slice(1, 3).join(" ");
  return (
    <div className={styles.card}>
      <Link href={`/${post.username}`}>
        <a className={styles.username}>
          <strong>
            {post.username} - {date2}
          </strong>
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <h2 className={styles.title}>
          <a>
            <strong />
            {post.title}
            <strong />
          </a>
        </h2>
      </Link>

      <footer className={styles.footer}>
        <span className={styles.wordCount}>
          {wordCount} words - {minutesToRead} min read -
        </span>
        <span className={styles.heart}> {post.heartCount || 0} 🤍 </span>
      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <div className={styles.adminSection}>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className={styles.editButton}>Edit</button>
            </h3>
          </Link>

          {post.published ? (
            <button className={styles.tickButton}>
              <AiOutlineCheck />
            </button>
          ) : (
            <p className="text-danger">Unpublished</p>
          )}
        </div>
      )}
    </div>
  );
}
