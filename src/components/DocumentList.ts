import { Component } from "@/core";
import { documentListStore, notionRouter, notionService } from "@/domain";
import { removeAllClassName } from "@/services";
import { DocumentListContent } from "@/types";

class DocumentList extends Component<{}, DocumentListContent[]> {
  init(): void {
    documentListStore.subscribe(() => this.render());
  }

  template(): string {
    return `
        ${(function createDocumentList(
          content: DocumentListContent[],
          depth: number
        ): string {
          return `
              <ul>
              ${content
                ?.map(
                  ({ id, title, isToggled, documents }) => `
                  <li id="${id}">
                    <div class="document-item ${
                      notionRouter.params.id === String(id) ? "selected" : ""
                    }" style="--depth: ${depth}">
                      <div class="title-box">
                        <button class="toggleBtn">
                          <span class="material-symbols-outlined">
                            ${isToggled ? "expand_more" : "chevron_right"}
                          </span>
                        </button>
                        <div class="title">
                          <span>${
                            title.trim().length > 0 ? title : "제목 없음"
                          }</span>
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
                      isToggled
                        ? documents.length > 0
                          ? createDocumentList(documents, depth + 1)
                          : `<div class="empty" style="--depth: ${depth}">하위 페이지 없음</div>`
                        : ""
                    }
                  </li>`
                )
                .join("")}
              </ul>
            `;
        })(documentListStore.getState(), 0)}
    `;
  }

  setEvent(): void {
    this.addEvent("click", (element) => {
      const liEl = element.closest("li");
      const documentId = Number(liEl?.id);
      const buttonEl = element.closest("button");

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

      if (element.closest("div")?.className === "title") {
        notionService.moveDetailPage(documentId);
        removeAllClassName({
          parentNode: this.targetEl,
          selector: ".document-item",
          className: "selected",
        });

        liEl?.querySelector(".document-item")?.classList.add("selected");
      }
    });
  }
}

export default DocumentList;
