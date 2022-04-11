import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Papa from "papaparse";
import { UserContext } from "../lib/context";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore } from "../lib/firebase";
import toast from "react-hot-toast";
import { kebabCase } from "lodash";

type Props = { user: any; posts: any };

const UploadCsv = ({ user, posts }: Props) => {
  const { username } = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const [uploadData, setUploadData] = useState<any>([]);

  const onSubmit = () => {
    uploadData.forEach((element: any) => {
      createPost(element);
    });
    setUploadData([]);
  };

  const createPost = async (post: any) => {
    const slug = encodeURI(kebabCase(post.title));
    const uid = auth.currentUser!.uid;
    const ref = doc(doc(firestore, "users", uid), "posts", slug);
    // Tip: give all fields a default value here
    const data = {
      title: post.title,
      slug,
      uid,
      username,
      published: true,
      content: post.title,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };
    await setDoc(ref, data);
    toast.success("Post created!");
    // Imperative navigation after doc is set
  };

  return (
    <form className="uploadForm" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="buttonBlue"
        {...register("articleCsv")}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            Papa.parse(files[0], {
              complete: function (results) {
                setUploadData(results.data);
                console.log("Finished:", results.data);
              },
              header: true,
            });
          }
        }}
      />
      <button className="button2">Upload</button>
    </form>
  );
};

export default UploadCsv;
