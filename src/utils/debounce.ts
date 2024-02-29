import { ArgsType } from "@/types";

const debounce = (callback: (...args: any[]) => void, delay: number) => {
  let timeId: ReturnType<typeof setTimeout>;

  return (...args: ArgsType<typeof callback>) => {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => callback(...args), delay);
  };
};

export default debounce;
