import { Component } from "@/core";
import {
  addCurrentClassName,
  createBlockElement,
  handleCommand,
  isCommand,
} from "@/domain";

class RichEditor extends Component {
  template(): string {
    return `<div id="content" contenteditable="true">${this.state}</div>`;
  }

  mounted(): void {
    if (this.state.length === 0) {
      const contentEl = document.querySelector("#content")!;
      const blockEl = createBlockElement();
      contentEl.append(blockEl);
    }
  }

  setEvent(): void {
    this.targetEl.addEventListener("click", () => {
      const node = getSelection()?.focusNode;

      if (node) {
        const currentEl = node as HTMLElement;

        addCurrentClassName(currentEl);
      }
    });

    this.targetEl.addEventListener("keyup", (e) => {
      const node = getSelection()?.focusNode;

      if (node) {
        const currentEl = node as HTMLElement;

        if (currentEl.innerHTML === "<br>") currentEl.innerHTML = "";
      }

      if (e.key === "Backspace") {
        const currentEl = node as HTMLElement;

        if (currentEl.innerHTML) {
          currentEl.innerHTML = "";
          addCurrentClassName(currentEl);
        }
      }
    });

    this.targetEl.addEventListener("keydown", (e) => {
      const node = getSelection()?.focusNode;
      const text = node?.textContent;

      if (text && isCommand(text) && e.key === " ") {
        handleCommand();

        e.preventDefault();
      }

      if (node && e.key === "Enter") {
        const blockEl = createBlockElement();
        const currentEl = node as HTMLElement;

        if (currentEl.nodeType === Node.ELEMENT_NODE) {
          currentEl.insertAdjacentElement("afterend", blockEl);
        }

        if (currentEl.nodeType === Node.TEXT_NODE) {
          currentEl.parentElement?.insertAdjacentElement("afterend", blockEl);
        }

        getSelection()?.setPosition(blockEl);

        if (blockEl.innerHTML === "") {
          e.preventDefault();
        }
      }

      if (node && e.key === "ArrowUp") {
        const currentEl = node as HTMLElement;
        const previousEl = currentEl.previousElementSibling as HTMLElement;

        if (previousEl) {
          if (previousEl.innerHTML === "<br>") previousEl.innerHTML = "";
          addCurrentClassName(previousEl);
        }
      }

      if (node && e.key === "ArrowDown") {
        const currentEl = node as HTMLElement;
        const nextEl = currentEl.nextElementSibling as HTMLElement;

        if (nextEl) {
          addCurrentClassName(nextEl);
        }
      }
    });
  }
}

export default RichEditor;
