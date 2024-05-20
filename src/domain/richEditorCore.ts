import { createHTMLElement } from "@/services";

export const createBlockElement = (
  tag: keyof HTMLElementTagNameMap = "div"
) => {
  const element = createHTMLElement(tag, {
    placeholder: "내용을 입력하세요.",
  });
  element.className = "block";

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
  element.style.padding = "3px 2px";
  element.style.margin = "0";
  element.style.fontWeight = "600";
  element.style.lineHeight = "1.3";
  element.style.minHeight = "1em";

  return element;
};

export const handleCommand = () => {
  const selection = getSelection();
  const node = selection?.focusNode;

  if (node) {
    for (const command of Object.keys(tagInfo)) {
      if (node.textContent === command) {
        const element = createElementWithCommand(command as TagInfoKeys);

        node.parentElement?.replaceWith(element);
        selection.setPosition(element, 0);
      }
    }
  }
};
