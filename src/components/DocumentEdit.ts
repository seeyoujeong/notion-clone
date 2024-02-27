import { Component } from "@/core";
import { notionRouter } from "@/domain";

interface DocumentEditProps {
  writeDocument: (id: number, title: string, content: string) => void;
}

class DocumentEdit extends Component<DocumentEditProps> {
  template(): string {
    return `
      <textarea id="title">${this.state?.title || ""}</textarea>
      <textarea id="content">${this.state?.content || ""}</textarea>
    `;
  }

  setEvent(): void {
    this.addEvent("input", () => {
      const documentId = Number(notionRouter.getParams().id);
      const titleEl =
        this.targetEl.querySelector<HTMLTextAreaElement>("#title")!;
      const contentEl =
        this.targetEl.querySelector<HTMLTextAreaElement>("#content")!;

      this.props?.writeDocument(documentId, titleEl.value, contentEl.value);
    });
  }
}

export default DocumentEdit;
