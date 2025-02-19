export const useCalculateHeight = (textLength: number, postSize: number) => {
  const maxTextLength = 500;
  let k1 = -50;
  let k2 = 15;

  if (postSize > 300 && postSize <= 350) {
    k1 = -40;
    k2 = 10;
  }
  if (postSize > 350) {
    k1 = -30;
    k2 = 5;
  }

  const calculateTextHeight = (length: number) => {
    const ratio = length / maxTextLength;

    if (ratio < 0.5) {
      return k1 - 10;
    }
    if (ratio < 0.6) {
      return 2 * k1 - 10;
    }
    if (ratio < 0.7) {
      return 3 * k1 - 10;
    }
    if (ratio < 0.9) {
      return 4 * k1;
    }

    return 4 * k1 - 35;
  };

  const calculateImageHeight = (length: number) => {
    const ratio = length / maxTextLength;

    if (ratio < 0.5) {
      return `${k2}%`;
    }
    if (ratio < 0.6) {
      return `${2.6 * k2}%`;
    }
    if (ratio < 0.7) {
      return `${4 * k2}%`;
    }
    if (ratio < 0.9) {
      return `${5 * k2}%`;
    }

    return `${6 * k2}%`;
  };

  return {
    calculateImageHeight,
    calculateTextHeight,
  };
};
