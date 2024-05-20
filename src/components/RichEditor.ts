import { Component } from "@/core";
import { handleCommand } from "@/domain";

class RichEditor extends Component {
  template(): string {
    return `<div id="content" contenteditable="true">${this.state}</div>`;
  }

  setEvent(): void {
    this.targetEl.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        handleCommand();

        e.preventDefault();
      }
    });
  }
}

export default RichEditor;
