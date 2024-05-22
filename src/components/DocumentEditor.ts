import { Component } from "@/core";
import { documentEditorStore, notionRouter, notionService } from "@/domain";
import { resizeTextarea } from "@/services";
import { debounce } from "@/utils";
import EditorTitle from "./EditorTitle";
import EditorContent from "./EditorContent";

class DocumentEditor extends Component {
  init(): void {
    documentEditorStore.subscribe(() => this.render());
  }

  template(): string {
    return `
      <div class="editor-title"></div>
      <div class="editor-content"></div>
    `;
  }

  mounted(): void {
    const { title, content } = documentEditorStore.getState();

    new EditorTitle({
      targetEl: document.querySelector(".editor-title")!,
      state: title || "",
    });

    new EditorContent({
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
