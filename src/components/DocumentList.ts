import { Component } from "@/core";
import { documentListStore, notionService, toggledStorage } from "@/domain";
import { RootDocument } from "@/types";

class DocumentList extends Component<{}, RootDocument[]> {
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
        notionService.addDocument(null);
        return;
      }

      const liEl = element.closest("li")!;
      const documentId = Number(liEl.id);

      if (element.className === "addBtn") {
        notionService.addDocument(documentId);
        return;
      }

      if (element.className === "deleteBtn") {
        notionService.deleteDocument(documentId);
        return;
      }

      if (element.className === "toggleBtn") {
        notionService.toggleDocument(documentId);
        return;
      }

      if (liEl) {
        notionService.moveDetailPage(documentId);
      }
    });
  }
}

export default DocumentList;
