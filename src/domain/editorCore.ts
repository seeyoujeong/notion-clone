import { createHTMLElement, removeAllClassName } from "@/services";

export const removeAllCurrentClassName = () => {
  removeAllClassName({
    parentNode: document.querySelector("#content")!,
    selector: ".block",
    className: "current",
  });
};

export const addCurrentClassName = (targetEl: HTMLElement) => {
  if (targetEl.innerHTML === "<br>") targetEl.innerHTML = "";
  if (targetEl.classList.contains("current")) return;

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
  element.style.minHeight = "22px";
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

const createBlockWithCommand = (command: TagInfoKeys) => {
  const { tag, placeholder, fontSize } = tagInfo[command];
  const blockEl = createBlockElement(tag);
  blockEl.setAttribute("placeholder", placeholder);

  blockEl.style.fontSize = fontSize;
  blockEl.style.minHeight = fontSize;
  blockEl.style.margin = "0";
  blockEl.style.fontWeight = "600";
  blockEl.style.lineHeight = "1.3";

  return blockEl;
};

export const isCommand = (text: string | null): text is TagInfoKeys => {
  if (!text) return false;
  return Object.keys(tagInfo).includes(text);
};

export const setCaret = (element: HTMLElement) => {
  const selection = getSelection();
  if (!selection) return;

  selection.setPosition(element);
};

export const replaceElementWithPosition = (
  targetEl: HTMLElement,
  newEl: HTMLElement
) => {
  targetEl.replaceWith(newEl);
  setCaret(newEl);
};

export const getFocusElement = () => {
  const selection = getSelection();
  if (!selection) return;

  const node = selection.focusNode;
  if (!node) return;

  if (node.nodeType === Node.ELEMENT_NODE) {
    const currentEl = node as HTMLElement;
    if (currentEl.id === "content") return;

    return currentEl;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    const parentEl = node.parentElement;
    if (!parentEl) return;

    return parentEl;
  }
};

export const handleCommand = (command: TagInfoKeys) => {
  const currentEl = getFocusElement();
  if (!currentEl) return;

  if (currentEl.classList.contains("block")) {
    const blockEl = createBlockWithCommand(command);
    addCurrentClassName(blockEl);
    replaceElementWithPosition(currentEl, blockEl);
  }
};
