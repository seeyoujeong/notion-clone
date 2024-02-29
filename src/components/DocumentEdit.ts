import { Component } from "@/core";
import { notionRouter, notionService } from "@/domain";
import { debounce } from "@/utils";

class DocumentEdit extends Component {
  template(): string {
    return `
      <textarea id="title">${this.state?.title || ""}</textarea>
      <textarea id="content">${this.state?.content || ""}</textarea>
    `;
  }

  setEvent(): void {
    const updateDocumentWithDebounce = debounce(
      notionService.updateDocument,
      300
    );

    this.addEvent("input", () => {
      const documentId = Number(notionRouter.params.id);
      const titleEl =
        this.targetEl.querySelector<HTMLTextAreaElement>("#title")!;
      const contentEl =
        this.targetEl.querySelector<HTMLTextAreaElement>("#content")!;

      updateDocumentWithDebounce(documentId, titleEl.value, contentEl.value);
    });
  }
}

export default DocumentEdit;
