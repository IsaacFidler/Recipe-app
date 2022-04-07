import type { NextPage } from "next";
import { getUserWithUsername, postToJSON } from "../../lib/firebase";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import { collection, getDocs, limit, orderBy, where } from "firebase/firestore";
import { query as queryFirestore } from "firebase/firestore";

export async function getServerSideProps({ query }: any) {
  //get from url
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = queryFirestore(
      collection(userDoc.ref, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

type Props = {
  user: any;
  posts: any;
};

const UserProfilePage = ({ user, posts }: Props) => {
  return (
    <>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </>
  );
};

export default UserProfilePage;
