import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import type { NextPage } from "next";
import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase";

export async function getStaticProps({ params }: any) {
  //grab username slug from url, get the user document from username if it exists make a reference to the post itself with the slug as the id.
  //we can then fetch the post data and then convert thet post data to json data.
  //also setting the prop for path which makes it easier to refetch the data on the client side when we want to hydrate it to real time data.
  //revalidate tells next to refetch this data on the server when new requests come in but on to do so in 5000 ms.
  const { username, slug } = params;

  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = doc(userDoc.ref, "posts", slug);
    post = postToJSON(await getDoc(postRef));

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

//Determine which pages we need to render. They're all being rendered in advance so next has no way to know which slugs or ids to render.

export async function getStaticPaths() {
  const snapshot = await getDocs(collectionGroup(firestore, "posts"));

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    //when a page hasn't been rendered yet fallback:blocking tells next to go back to traditional server side rendering.
    fallback: "blocking",
  };
}

const PostPage: NextPage = ({}) => {
  return (
    <>
      <h1>Post Page</h1>
    </>
  );
};

export default PostPage;
