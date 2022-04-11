import React from "react";
import { useForm } from "react-hook-form";
import Papa from "papaparse";

type Props = { user: any; posts: any };

const UploadCsv = ({ user, posts }: Props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("articleCsv")}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            Papa.parse(files[0], {
              complete: function (results) {
                console.log("Finished:", results.data);
              },
              header: true,
            });
          }
        }}
      />
      <button className="button2">Submit</button>
    </form>
  );
};

export default UploadCsv;
