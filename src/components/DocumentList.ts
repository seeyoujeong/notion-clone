import { Component } from "@/core";
import { documentListStore, notionService, toggledStorage } from "@/domain";
import { RootDocument } from "@/types";

class DocumentList extends Component<{}, RootDocument[]> {
  init(): void {
    documentListStore.subscribe(() => this.render());
  }

  template(): string {
    return `
      <button id="addRootBtn">
        <span class="material-symbols-outlined">
          add_circle
        </span>
        <span>새 페이지</span>
      </button>
      <nav>
        ${(function createDocumentList(content: RootDocument[]): string {
          return `
              <ul>
              ${content
                ?.map(
                  ({ id, title, documents }) => `
                  <li id="${id}">
                    <div>
                      <button class="toggleBtn">
                        <span class="material-symbols-outlined">
                          chevron_right
                        </span>
                      </button>
                      <span>${title}</span>
                    </div>
                    <div>
                      <button class="addBtn">
                        <span class="material-symbols-outlined">
                          add
                        </span>
                      </button>
                      <button class="deleteBtn">
                        <span class="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
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
