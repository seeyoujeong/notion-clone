import { createHTMLElement, removeAllClassName } from "@/services";

export const removeAllCurrentClassName = () => {
  removeAllClassName({
    parentNode: document.querySelector("#content")!,
    selector: ".block",
    className: "current",
  });
};

export const addCurrentClassName = (targetEl: HTMLElement) => {
  removeAllCurrentClassName();
  targetEl.classList.add("current");
};

export const createBlockElement = (
  tag: keyof HTMLElementTagNameMap = "div"
) => {
  const element = createHTMLElement(tag, {
    placeholder: "내용을 입력하세요.",
  });
  element.className = "block";
  element.style.padding = "3px 2px";
  element.style.minHeight = "1em";
  addCurrentClassName(element);

  return element;
};

const tagInfo = {
  "#": {
    tag: "h2",
    placeholder: "제목 1",
    fontSize: "1.875em",
  },

  "##": {
    tag: "h3",
    placeholder: "제목 2",
    fontSize: "1.5em",
  },
  "###": {
    tag: "h4",
    placeholder: "제목 3",
    fontSize: "1.25em",
  },
} as const;

type TagInfoKeys = keyof typeof tagInfo;

const createElementWithCommand = (command: TagInfoKeys) => {
  const { tag, placeholder, fontSize } = tagInfo[command];
  const element = createBlockElement(tag);
  element.setAttribute("placeholder", placeholder);

  element.style.fontSize = fontSize;
  element.style.margin = "0";
  element.style.fontWeight = "600";
  element.style.lineHeight = "1.3";

  return element;
};

export const isCommand = (text: string): text is TagInfoKeys => {
  return Object.keys(tagInfo).includes(text);
};

export const replaceElementWithPosition = (
  parentEl: HTMLElement,
  targetEl: HTMLElement
) => {
  const selection = getSelection();

  parentEl.replaceWith(targetEl);
  selection?.setPosition(targetEl, 0);
};

export const handleCommand = () => {
  const node = getSelection()?.focusNode;
  const parentElement = node?.parentElement;

  if (node && parentElement?.classList.contains("block")) {
    const text = node.textContent;

    if (text && isCommand(text)) {
      const element = createElementWithCommand(text);
      addCurrentClassName(element);

      replaceElementWithPosition(parentElement, element);
    }
  }
};
