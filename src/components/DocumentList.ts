import { Component } from "@/core";
import { documentListStore, toggledStorage } from "@/domain";
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
                      <button class="toggleBtn">ㅅ</button>
                      <span>${title}</span>
                      <button class="addBtn">추가</button>
                      <button class="deleteBtn">삭제</button>
                    </span>
                    ${
                      toggledStorage.has(id)
                        ? documents.length > 0
                          ? createDocumentList(documents)
                          : "<ul><li>하위 페이지 없음</li></ul>"
                        : ""
                    }
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
        toggledStorage.addId(documentId);
        addDocument(documentId);

        return;
      }

      if (element.className === "deleteBtn") {
        toggledStorage.deleteId(documentId);
        deleteDocument(documentId);
        return;
      }

      if (element.className === "toggleBtn") {
        if (toggledStorage.has(documentId)) {
          toggledStorage.deleteId(documentId);
        } else {
          toggledStorage.addId(documentId);
        }

        this.render();
        return;
      }

      if (liEl) {
        moveDetailPage(documentId);
      }
    });
  }
}

export default DocumentList;
