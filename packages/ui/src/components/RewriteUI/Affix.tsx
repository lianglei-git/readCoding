import React, { useEffect, useRef, useState } from "react";
import AdapterReact from "@sparrowend/ui/es/_utils/adapterReact";
/** sp-affix => SpAffix*/

interface ISpAffixProps {
  "offset-top"?: number;
  "offset-bottom"?: number;
  onChange?: () => void;
  "origin-elfixed"?: boolean;
  children?:any
  className?: string
}

const SpAffix = (props: ISpAffixProps) => {
  useEffect(() => {
    document.documentElement.scrollTop += 1;
  }, [])
    return AdapterReact.createElement('sp-affix',props)
};

export { SpAffix };
