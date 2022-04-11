import React from "react";
import { CSVLink } from "react-csv";
type Props = { posts: any };

const DownloadCsv = ({ posts }: Props) => {
  return (
    <div>
      <CSVLink className="button2" data={posts}>
        Download Posts
      </CSVLink>
    </div>
  );
};

export default DownloadCsv;
