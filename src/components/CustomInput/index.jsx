import { Input } from "antd";
import React from "react";

export default function CustomInput(props) {
  const disabledClass = (disabled) => {
    return disabled && "disabled";
  };
  return (
    <Input className={`input ${disabledClass(props.disabled)}`} {...props} />
  );
}
