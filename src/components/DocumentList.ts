import { Component } from "@/core";
import { documentListStore } from "@/domain";
import { RootDocument } from "@/types";

interface DocumentListProps {
  addDocument: (parentId: number | null) => void;
  deleteDocument: (id: number) => void;
  moveDetailPage: (id: number) => void;
}

class DocumentList extends Component<DocumentListProps, RootDocument[]> {
  init(): void {
    documentListStore.subscribe(() => this.render());
  }

  template(): string {
    return `
      <button id="addRootBtn">새 문서 추가</button>
      <nav>
        ${(function createDocumentList(content: RootDocument[]): string {
          return `
              <ul>
              ${content
                ?.map(
                  ({ id, title, documents }) => `
                  <li id="${id}">
                    <span>
                      <span>${title}</span>
                      <button class="addBtn">추가</button>
                      <button class="deleteBtn">삭제</button>
                    </span>
                    ${documents.length > 0 ? createDocumentList(documents) : ""}
                  </li>`
                )
                .join("")}
              </ul>
            `;
        })(documentListStore.getState())}
      </nav>
    `;
  }

  setEvent(): void {
    this.addEvent("click", (element) => {
      if (element.id === "addRootBtn") {
        this.props?.addDocument(null);
        return;
      }

      const liEl = element.closest("li")!;
      const documentId = Number(liEl.id);
      const { addDocument, deleteDocument, moveDetailPage } = this.props!;

      if (element.className === "addBtn") {
        addDocument(documentId);
        return;
      }

      if (element.className === "deleteBtn") {
        deleteDocument(documentId);
        return;
      }

      if (liEl) {
        moveDetailPage(documentId);
      }
    });
  }
}

export default DocumentList;
