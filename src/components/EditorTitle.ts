import { Component } from "@/core";
import { removeAllCurrentClassName } from "@/domain";
import { resizeTextarea } from "@/services";

class EditorTitle extends Component {
  template(): string {
    return `
      <textarea id="title" placeholder="제목 없음" rows="1">${this.state}</textarea>
    `;
  }

  mounted(): void {
    resizeTextarea("#title");
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
