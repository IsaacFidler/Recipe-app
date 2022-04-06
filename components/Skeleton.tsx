import React from "react";

type Props = { show: boolean };

const Skeleton = ({ show }: Props) => {
  return show && <></>;
};

export default Skeleton;
