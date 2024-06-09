import React from "react";
import { PuffLoader } from "react-spinners";

const Loading = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div>
      <PuffLoader style={style} color="#36d7b7" />
    </div>
  );
};

export default Loading;
