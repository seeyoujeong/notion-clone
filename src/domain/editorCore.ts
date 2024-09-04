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

export const setCaret = (element: HTMLElement) => {
  const selection = getSelection();
  if (!selection) return;

  selection.setPosition(element);
};

export const setFocus = (element: HTMLElement) => {
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement
  ) {
    if (element.value.length !== 0) return;

    element.focus();
  } else {
    element.focus();
  }
};

export const replaceElementWithPosition = (
  targetEl: HTMLElement,
  newEl: HTMLElement
) => {
  targetEl.replaceWith(newEl);
  setCaret(newEl);
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
  "-": {
    tag: "li",
    placeholder: "리스트",
    fontSize: "1em",
  },
} as const;

type TagInfoKeys = keyof typeof tagInfo;

const createBlockWithCommand = (command: TagInfoKeys) => {
  const { tag, placeholder, fontSize } = tagInfo[command];
  let blockEl: HTMLElement;

  if (tag === "li") {
    const ulEl = createBlockElement("ul");
    blockEl = createBlockElement(tag);
    blockEl.setAttribute("placeholder", placeholder);
    ulEl.appendChild(blockEl);

    ulEl.style.margin = "0";
    ulEl.style.paddingLeft = "1.5em";
    ulEl.style.listStyle = "disc";

    blockEl = ulEl;
  } else {
    blockEl = createBlockElement(tag);
    blockEl.setAttribute("placeholder", placeholder);
  }

  const innerEl = tag === "li" ? (blockEl.firstChild as HTMLElement) : blockEl;
  innerEl.style.fontSize = fontSize;
  innerEl.style.minHeight = fontSize;
  innerEl.style.margin = "0";
  innerEl.style.lineHeight = "1.3";

  if (tag.startsWith("h")) {
    innerEl.style.fontWeight = "600";
  }

  return blockEl;
};

export const isCommand = (text: string | null): text is TagInfoKeys => {
  if (!text) return false;
  return Object.keys(tagInfo).includes(text);
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
