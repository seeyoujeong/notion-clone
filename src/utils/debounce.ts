const debounce = (callback: (...args: any[]) => void, delay: number) => {
  let timeId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => callback(...args), delay);
  };
};

export default debounce;
