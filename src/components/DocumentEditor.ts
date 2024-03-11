import { Component } from "@/core";
import { documentEditorStore, notionRouter, notionService } from "@/domain";
import { debounce } from "@/utils";

class DocumentEditor extends Component {
  init(): void {
    documentEditorStore.subscribe(() => this.render());
  }

  template(): string {
    const { title, content } = documentEditorStore.getState();

    return `
      <div class="editor-title">
        <textarea id="title" placeholder="제목 없음">${title || ""}</textarea>
      </div>
      <div class="editor-content">
        <textarea id="content" placeholder="내용을 입력하세요.">${
          content || ""
        }</textarea>
      </div>
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

export default DocumentEditor;
