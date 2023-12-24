import { Button } from "antd";
import React from "react";
import style from "./CustomButton.module.css";

export default function CustomButton(props) {
  const variantClass = (variant) => {
    if (variant === "primary") {
      return style.primary;
    } else if (variant === "secondary") {
      return style.secondary;
    } else if (variant === "primary-disabled") {
      return style.primaryDisabled;
    } else if (variant === "secondary-disabled") {
      return style.secondaryDisabled;
    }
  };
  return (
    <Button
      className={`${style.btn} ${variantClass(props.variant)}`}
      {...props}>
      {props.children}
    </Button>
  );
}
