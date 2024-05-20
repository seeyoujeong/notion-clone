const createHTMLElement = (
  tagName: keyof HTMLElementTagNameMap,
  attributes: Record<string, string> = {}
) => {
  const element = document.createElement(tagName);

  Object.entries(attributes).forEach(([qualifiedName, value]) => {
    element.setAttribute(qualifiedName, value);
  });

  return element;
};

export default createHTMLElement;
