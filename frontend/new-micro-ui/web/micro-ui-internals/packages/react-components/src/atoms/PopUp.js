import React from "react";

const PopUp = ({ className, ...props }) => {
  console.log("props", props.children);
  return <div className={`popup-wrap ${className}`}>{props.children}</div>;
};

export default PopUp;
