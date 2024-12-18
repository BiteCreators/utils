import React, { useCallback, useEffect, useId, useRef } from "react";

export const useTextArea = ({
  autoResize,
  onChange,
}: {
  autoResize?: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const textAreaId = useId();

  const calcHeight = useCallback(() => {
    if (textAreaRef.current && autoResize) {
      textAreaRef.current.style.height = "inherit";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [textAreaRef, autoResize]);

  useEffect(() => {
    calcHeight();
  }, [textAreaRef, calcHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    calcHeight();
    onChange?.(e);
  };

  return {
    handleChange,
    textAreaId,
    textAreaRef,
  };
};
