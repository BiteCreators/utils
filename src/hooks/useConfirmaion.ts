import { useState } from "react";

export const useConfirmation = () => {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [resolver, setResolver] = useState<(value: boolean) => void>(() => {});

  const requestConfirmation = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmOpen(true);
      setResolver(() => resolve);
    });
  };

  const handleConfirm = () => {
    resolver(true);
    setConfirmOpen(false);
  };

  const handleReject = () => {
    resolver(false);
    setConfirmOpen(false);
  };

  return {
    confirmOpen,
    handleConfirm,
    handleReject,
    requestConfirmation,
    setConfirmOpen,
  };
};
