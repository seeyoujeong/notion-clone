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
          // TODO depth 추가
          return `
              <ul>
              ${content
                ?.map(
                  ({ id, title, documents }) => `
                  <li id="${id}">
                    <div class="document-item">
                      <div class="title-box">
                        <button class="toggleBtn">
                          <span class="material-symbols-outlined">
                            ${
                              toggledStorage.has(id)
                                ? "expand_more"
                                : "chevron_right"
                            }
                          </span>
                        </button>
                        <div class="title">
                          <span>${title}</span>
                        </div>
                      </div>
                      <div class="button-box">
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
                    </div>
                    ${
                      toggledStorage.has(id)
                        ? documents.length > 0
                          ? createDocumentList(documents)
                          : "<ul><li>하위 페이지 없음</li></ul>" // TODO 개별 스타일 추가
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
      const liEl = element.closest("li");
      const documentId = Number(liEl?.id);
      const buttonEl = element.closest("button");

      if (buttonEl?.id === "addRootBtn") {
        notionService.addDocument(null);
        return;
      }

      if (buttonEl?.className === "addBtn") {
        notionService.addDocument(documentId);
        return;
      }

      if (buttonEl?.className === "deleteBtn") {
        notionService.deleteDocument(documentId);
        return;
      }

      if (buttonEl?.className === "toggleBtn") {
        notionService.toggleDocument(documentId);
        return;
      }

      if (element.closest("div")?.className === "title")
        notionService.moveDetailPage(documentId);
    });
  }
}

export default DocumentList;
