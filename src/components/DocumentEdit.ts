import { Component } from "@/core";
import { documentEditStore, notionRouter, notionService } from "@/domain";
import { debounce } from "@/utils";

class DocumentEdit extends Component {
  init(): void {
    documentEditStore.subscribe(() => this.render());
  }

  template(): string {
    const { title, content } = documentEditStore.getState();

    return `
      <textarea id="title">${title || ""}</textarea>
      <textarea id="content">${content || ""}</textarea>
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
