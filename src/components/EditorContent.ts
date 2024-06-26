import { Component } from "@/core";
import {
  addCurrentClassName,
  createBlockElement,
  getFocusElement,
  handleCommand,
  isCommand,
} from "@/domain";
import { createHTMLElement } from "@/services";

class EditorContent extends Component<{}, string> {
  template(): string {
    return `<div id="content" contenteditable="true">${this.state || ""}</div>`;
  }

  mounted(): void {
    const contentEl = document.querySelector("#content")!;

    if (!contentEl.innerHTML) {
      const blockEl = createBlockElement();
      contentEl.append(blockEl);
    }

    const selection = getSelection();
    if (!selection) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (!contentEl.innerHTML) {
          const blockEl = createBlockElement();
          contentEl.append(blockEl);
          selection.setPosition(blockEl);
        }
      });
    });

    observer.observe(contentEl, {
      childList: true,
    });
  }

  setEvent(): void {
    this.targetEl.addEventListener("mouseup", () => {
      const currentEl = getFocusElement();
      if (!currentEl) return;

      addCurrentClassName(currentEl);
    });

    this.targetEl.addEventListener("keyup", (e) => {
      const currentEl = getFocusElement();
      if (!currentEl) return;

      if (e.key === "Backspace") {
        addCurrentClassName(currentEl);
      }

      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        addCurrentClassName(currentEl);
      }
    });

    this.targetEl.addEventListener("keydown", (e) => {
      const selection = getSelection();
      if (!selection) return;

      const node = selection.focusNode;
      if (!node) return;

      const text = node.textContent;

      if (e.key === " " && isCommand(text)) {
        handleCommand(text);

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
          if (e.isComposing) return;
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

      if (e.key === "Backspace") {
        if (node.nodeType === Node.TEXT_NODE) {
          const parentEl = node.parentElement;
          if (!parentEl) return;

          addCurrentClassName(parentEl);

          if (selection.focusOffset === 0 && selection.anchorOffset === 0) {
            if (parentEl.tagName !== "DIV") {
              const blockEl = createBlockElement();
              blockEl.innerHTML = parentEl.innerHTML;
              parentEl.replaceWith(blockEl);
              e.preventDefault();
            } else {
              const previousEl = parentEl.previousElementSibling as HTMLElement;

              if (previousEl) {
                addCurrentClassName(previousEl);
              }
            }
          }
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
          const currentEl = node as HTMLElement;

          if (currentEl.tagName !== "DIV") {
            const blockEl = createBlockElement();
            currentEl.replaceWith(blockEl);
            e.preventDefault();
          } else {
            const previousEl = currentEl.previousElementSibling as HTMLElement;

            if (previousEl) {
              addCurrentClassName(previousEl);

              if (!previousEl.innerHTML && !currentEl.innerHTML) {
                selection.setPosition(previousEl);
                currentEl.remove();
                e.preventDefault();
              }
            }
          }
        }
      }

      if (e.key === "ArrowUp") {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const currentEl = node as HTMLElement;
          const previousEl = currentEl.previousElementSibling as HTMLElement;
          if (!previousEl) return;

          addCurrentClassName(previousEl);
        }
      }

      if (e.key === "ArrowDown") {
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
