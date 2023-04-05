import { SpInput } from "@/components/RewriteUI";
import { useAppStore } from "@/hooks";
import React, { useCallback, useEffect, useRef } from "react";
type PropsChangePositionDataNameInput = {
  pos: string;
  isDir?: boolean;
  onFull: (value: string) => any;
};

function ChangePositionDataNameInput({
  pos,
  onFull = () => void 0,
}: PropsChangePositionDataNameInput) {
  const app = useAppStore();
  const ref: any = useRef(null);
  let _tmp = 0;
  const onBlur = useCallback(
    (e: any) => {
      if (_tmp == 1) return (_tmp = 0);
      _tmp++;
      if (e.target.value.trim().length == 0) {
        app.TreeStore.deletePositionData(pos);
      } else {
        onFull(e.target.value);
      }
    },
    [ref.current]
  );

  const onPressEnter = (v: string, target: any) => {
    target.blur({ target: { value: v } });
  };
  useEffect(() => {
    ref.current.select();
  }, []);
  return (
    <SpInput
      style={{ width: 99 }}
      ref={ref}
      onBlur={onBlur}
      onPressEnter={onPressEnter}
    />
  );
}

export { ChangePositionDataNameInput };
