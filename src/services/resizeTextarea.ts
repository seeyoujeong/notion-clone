const resizeTextarea = (...selectors: string[]) => {
  for (const selector of selectors) {
    if (!selector) {
      continue;
    }

    const element = document.querySelector<HTMLTextAreaElement>(selector)!;

    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  }
};

export default resizeTextarea;
