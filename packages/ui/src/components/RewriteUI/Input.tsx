import React, { Ref, forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import AdapterReact from "@sparrowend/ui/es/_utils/adapterReact";
/** sp-input => SpInput */

interface ISpInputProps {
  placeholder?: string;
  children?: any;
  value?: string;
  style?: any;
  onBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  onClick?: (e: Event) => void;
  onChange?: (e: Event) => void;
}

const SpInput = forwardRef((props: ISpInputProps, ref: Ref<any>) => {
  const inputRef: any = ref ?? useRef(null);
  useLayoutEffect(() => {
    inputRef.current.onChange = props?.onChange
    const Input = inputRef.current.getElementsByClassName('input-core')[0]
    Input.onclick = (e:Event) => {
        e.stopPropagation();
        props?.onClick?.(e);
    }
    Input.onblur = (e:Event) => {
        props?.onBlur?.(e);
    }
    Input.onfocus = (e:Event) => {
        props?.onFocus?.(e);
    }
  }, []);
  return AdapterReact.createElement("sp-input", { ...props, ref: inputRef });
});

export { SpInput };
