import { Component } from "@/core";
import {
  addCurrentClassName,
  createBlockElement,
  getFocusElement,
  handleCommand,
  isCommand,
  setCaret,
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

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (!contentEl.innerHTML) {
          const blockEl = createBlockElement();
          contentEl.append(blockEl);
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

      const currentEl = getFocusElement();
      if (!currentEl) return;

      const text = currentEl.textContent;

      if (e.key === " " && isCommand(text)) {
        if (currentEl.tagName === "LI") return;

        handleCommand(text);

        e.preventDefault();
      }

      if (e.key === "Enter") {
        let blockEl: HTMLElement;

        if (currentEl.tagName === "LI" && currentEl.innerHTML) {
          blockEl = createBlockElement("li");
        } else {
          blockEl = createBlockElement();
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
          if (currentEl.innerHTML) {
            blockEl.innerHTML = currentEl.innerHTML;
            currentEl.innerHTML = "";
          } else {
            if (currentEl.tagName === "LI") {
              currentEl.parentElement?.insertAdjacentElement(
                "afterend",
                blockEl
              );
              setCaret(blockEl);
              currentEl.remove();
            }
          }

          if (blockEl.innerHTML === "<br>") {
            blockEl.innerHTML = "";
          }
        }

        if (node.nodeType === Node.TEXT_NODE) {
          if (e.isComposing) return;
          const range = selection.getRangeAt(0);

          range.deleteContents();
          range.insertNode(createHTMLElement("span", { id: "temp" }));

          const [beforeText, afterText] = currentEl.innerHTML.split(
            '<span id="temp"></span>'
          );
          currentEl.innerHTML = beforeText;
          blockEl.innerHTML = afterText;
        }

        if (currentEl.tagName === "UL") {
          currentEl.remove();
        } else {
          currentEl.insertAdjacentElement("afterend", blockEl);
        }

        setCaret(blockEl);

        e.preventDefault();
      }

      if (e.key === "Backspace") {
        if (node.nodeType === Node.TEXT_NODE) {
          addCurrentClassName(currentEl);

          if (selection.focusOffset === 0 && selection.anchorOffset === 0) {
            if (currentEl.tagName !== "DIV") {
              const blockEl = createBlockElement();
              blockEl.innerHTML = currentEl.innerHTML;
              currentEl.replaceWith(blockEl);
              e.preventDefault();
            } else {
              const previousEl =
                currentEl.previousElementSibling as HTMLElement;

              if (previousEl) {
                addCurrentClassName(previousEl);
              }
            }
          }
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
          if (currentEl.tagName !== "DIV") {
            const blockEl = createBlockElement();

            if (currentEl.tagName === "LI") {
              const parentEl = currentEl.parentElement;

              parentEl?.insertAdjacentElement("afterend", blockEl);
              setCaret(blockEl);

              if (!parentEl?.innerText) {
                parentEl?.remove();
              }

              currentEl.remove();
            } else {
              currentEl.replaceWith(blockEl);
            }

            e.preventDefault();
          } else {
            const previousEl = currentEl.previousElementSibling as HTMLElement;

            if (previousEl) {
              addCurrentClassName(previousEl);

              if (!previousEl.innerHTML && !currentEl.innerHTML) {
                setCaret(previousEl);
                currentEl.remove();
                e.preventDefault();
              }
            }
          }
        }
      }

      if (e.key === "ArrowUp") {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const previousEl = currentEl.previousElementSibling as HTMLElement;
          if (!previousEl) return;

          addCurrentClassName(previousEl);
        }
      }

      if (e.key === "ArrowDown") {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const nextEl = currentEl.nextElementSibling as HTMLElement;
          if (!nextEl) return;

          addCurrentClassName(nextEl);
        }
      }
    });
  }
}

export default EditorContent;
