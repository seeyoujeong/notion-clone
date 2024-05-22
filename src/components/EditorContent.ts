import { Component } from "@/core";
import {
  addCurrentClassName,
  createBlockElement,
  handleCommand,
  isCommand,
} from "@/domain";
import { createHTMLElement } from "@/services";

class EditorContent extends Component {
  template(): string {
    return `<div id="content" contenteditable="true">${this.state}</div>`;
  }

  mounted(): void {
    const contentEl = document.querySelector("#content")!;

    if (!contentEl.innerHTML) {
      const blockEl = createBlockElement();
      contentEl.append(blockEl);
    }
  }

  setEvent(): void {
    this.targetEl.addEventListener("mouseup", () => {
      const selection = getSelection();
      if (!selection) return;

      const node = selection.focusNode;
      if (!node) return;

      if (node.nodeType === Node.ELEMENT_NODE) {
        const currentEl = node as HTMLElement;

        addCurrentClassName(currentEl);
      }

      if (node.nodeType === Node.TEXT_NODE) {
        const parentEl = node.parentElement;

        parentEl && addCurrentClassName(parentEl);
      }
    });

    this.targetEl.addEventListener("keyup", (e) => {
      const selection = getSelection();
      if (!selection) return;

      const node = selection.focusNode;
      if (!node) return;

      if (e.key === "Backspace") {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const currentEl = node as HTMLElement;

          currentEl.innerHTML = "";
          addCurrentClassName(currentEl);
        }

        if (node.nodeType === Node.TEXT_NODE) {
          const parentEl = node.parentElement;

          parentEl && addCurrentClassName(parentEl);
        }

        const contentEl = document.querySelector("#content")!;

        if (!contentEl.innerHTML) {
          const blockEl = createBlockElement();
          contentEl.append(blockEl);
          selection.setPosition(blockEl);
        }
      }

      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const currentEl = node as HTMLElement;

          addCurrentClassName(currentEl);
        }

        if (node.nodeType === Node.TEXT_NODE) {
          const parentEl = node.parentElement;

          parentEl && addCurrentClassName(parentEl);
        }
      }
    });

    this.targetEl.addEventListener("keydown", (e) => {
      const selection = getSelection();
      if (!selection) return;

      const node = selection.focusNode;
      if (!node) return;

      const text = node.textContent;

      if (text && isCommand(text) && e.key === " ") {
        handleCommand();

        e.preventDefault();
      }

      if (e.key === "Enter") {
        const blockEl = createBlockElement();

        if (node.nodeType === Node.ELEMENT_NODE) {
          const currentEl = node as HTMLElement;

          if (currentEl.innerHTML) {
            blockEl.innerHTML = currentEl.innerHTML;
            currentEl.innerHTML = "";
          }

          if (blockEl.innerHTML === "<br>") {
            blockEl.innerHTML = "";
          }

          currentEl.insertAdjacentElement("afterend", blockEl);

          e.preventDefault();
        }

        if (node.nodeType === Node.TEXT_NODE) {
          const range = selection.getRangeAt(0);

          range.deleteContents();
          range.insertNode(createHTMLElement("span", { id: "temp" }));

          const parentEl = node.parentElement;
          if (!parentEl) return;

          const [beforeText, afterText] = parentEl.innerHTML.split(
            '<span id="temp"></span>'
          );
          parentEl.innerHTML = beforeText;
          blockEl.innerHTML = afterText;
          parentEl.insertAdjacentElement("afterend", blockEl);

          e.preventDefault();
        }

        selection.setPosition(blockEl);
      }

      if (e.key === "ArrowUp") {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const currentEl = node as HTMLElement;
          const previousEl = currentEl.previousElementSibling as HTMLElement;
          if (!previousEl) return;

          if (previousEl.innerHTML === "<br>") previousEl.innerHTML = "";
          addCurrentClassName(previousEl);
        }
      }

      if (node && e.key === "ArrowDown") {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const currentEl = node as HTMLElement;
          const nextEl = currentEl.nextElementSibling as HTMLElement;
          if (!nextEl) return;

          addCurrentClassName(nextEl);
        }
      }
    });
  }
}

export default EditorContent;