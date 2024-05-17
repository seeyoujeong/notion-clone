import { Component } from "@/core";

class RichEditor extends Component {
  template(): string {
    return `<div id="content" contenteditable="true">${this.state || ""}</div>`;
  }
}

export default RichEditor;
