import { Component } from "@/core";
import { documentEditorStore, notionRouter, notionService } from "@/domain";
import { resizeTextarea } from "@/services";
import { debounce } from "@/utils";
import RichEditor from "./RichEditor";

class DocumentEditor extends Component {
  init(): void {
    documentEditorStore.subscribe(() => this.render());
  }

  template(): string {
    const { title } = documentEditorStore.getState();

    return `
      <div class="editor-title">
        <textarea id="title" placeholder="제목 없음" rows="1">${
          title || ""
        }</textarea>
      </div>
      <div class="editor-content"></div>
    `;
  }

  mounted(): void {
    resizeTextarea("#title");

    const { content } = documentEditorStore.getState();

    new RichEditor({
      targetEl: document.querySelector(".editor-content")!,
      state: content || "",
    });
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
        this.targetEl.querySelector<HTMLDivElement>("#content")!;

      resizeTextarea("#title");

      updateDocumentWithDebounce(
        documentId,
        titleEl.value,
        contentEl.innerHTML
      );
    });
  }
}

export default DocumentEditor;
