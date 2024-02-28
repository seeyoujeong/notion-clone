import { Component } from "@/core";
import { notionRouter } from "@/domain";
import { debounce } from "@/utils";

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
    const writeDocumentWithDebounce = debounce(this.props?.writeDocument!, 300);

    this.addEvent("input", () => {
      const documentId = Number(notionRouter.params.id);
      const titleEl =
        this.targetEl.querySelector<HTMLTextAreaElement>("#title")!;
      const contentEl =
        this.targetEl.querySelector<HTMLTextAreaElement>("#content")!;

      writeDocumentWithDebounce(documentId, titleEl.value, contentEl.value);
    });
  }
}

export default DocumentEdit;
