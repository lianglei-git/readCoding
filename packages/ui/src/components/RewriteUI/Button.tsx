import React, { useEffect, useRef, useState } from "react";
import AdapterReact from "@sparrowend/ui/es/_utils/adapterReact";
/** sp-button2 => SpButton*/

interface ISpButtonProps {
  ripplecenter?: boolean;
  shape?: "circle" | "default" | "round";
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  size?: "middle" | "small" | "mini";
  type?: "default" | "primary" | "dashed" | "text" | "link" | "danger";
  children?:any
}

const SpButton = (props: ISpButtonProps) => {
  return AdapterReact.createElement("sp-button2", props);
};

export { SpButton };
