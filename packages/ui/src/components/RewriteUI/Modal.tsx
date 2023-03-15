import React, { useEffect, useRef, useState } from "react";
import AdapterReact from "@sparrowend/ui/es/_utils/adapterReact";
/** sp-modal => SpModal */
interface ISpModalProps {
  title?: string;
  closable?: boolean;
  appendbody?: boolean;
  canceltext?: string;
  onOk?: () => void;
  onClose?: () => void;
  children?: JSX.Element;
  visible: boolean;
  footer?: null | undefined;
  center?: boolean;
  class?: string;
  className?: string;
}

const SpModal = (props: ISpModalProps & { ref?: any }) => {
  const modalRef: any = useRef(null);
  const localParams = {} as ISpModalProps;
  if (props.className && !props.class) {
    localParams.class = props.className;
  }
  if(props.footer == null) {
    localParams.footer = 'null' as any
  }
  useEffect(() => {
    modalRef.current.onClose = () => {
      if (props.onClose) {
        return props.onClose();
      }
    };
    modalRef.current.onOk = () => {
      if (props.onOk) {
        return props.onOk();
      }
    };
  }, []);

  return AdapterReact.createElement("sp-modal", { ...props,...localParams, ref: modalRef });
};
export { SpModal };
