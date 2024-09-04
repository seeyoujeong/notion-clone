import { Component } from "@/core";
import { removeAllCurrentClassName, setFocus } from "@/domain";
import { resizeTextarea } from "@/services";

class EditorTitle extends Component<{}, string> {
  template(): string {
    return `
      <textarea id="title" placeholder="제목 없음" rows="1">${
        this.state || ""
      }</textarea>
    `;
  }

  mounted(): void {
    resizeTextarea("#title");

    const titleEl = document.querySelector<HTMLElement>("#title")!;

    setFocus(titleEl);
  }

  setEvent(): void {
    this.addEvent("click", (targetEl) => {
      if (targetEl.id === "title") {
        removeAllCurrentClassName();
      }
    });
  }
}

export default EditorTitle;
