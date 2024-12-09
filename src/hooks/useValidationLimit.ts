import React, { useState } from "react";

type ValidationLimit = {
  limit: number;
  startText: string;
};

export const useValidationLimit = <
  T extends HTMLInputElement | HTMLTextAreaElement,
>({
  limit,
  startText,
}: ValidationLimit) => {
  const [correct, setCorrect] = useState<boolean>(true);
  const [value, setValue] = useState(startText);
  const handleChange = (e: React.ChangeEvent<T>) => {
    setValue(e.target.value);
    if (e.target.value.length > limit) {
      setCorrect(false);
    } else {
      setCorrect(true);
    }
  };

  return { correct, handleChange, limit, setValue, value };
};
