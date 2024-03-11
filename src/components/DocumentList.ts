import { API_HEADER_X_USERNAME } from "@/constants";
import { Component } from "@/core";
import {
  documentListStore,
  notionRouter,
  notionService,
  toggledStorage,
} from "@/domain";
import { browserHistory, removeAllClassName } from "@/services";
import { RootDocument } from "@/types";
import profile from "@/assets/profile.png";

class DocumentList extends Component<{}, RootDocument[]> {
  init(): void {
    documentListStore.subscribe(() => this.render());
  }

  template(): string {
    return `
      <header>
        <button id="homeBtn">
          <img class="profile-image" src="${profile}" alt="user profile image" />
          <span>${API_HEADER_X_USERNAME}'s notion</span>
        </button>
        <button id="addRootBtn">
          <span class="material-symbols-outlined">
            add_circle
          </span>
          <span>새 페이지</span>
        </button>
      </header>
      <nav>
        ${(function createDocumentList(
          content: RootDocument[],
          depth: number
        ): string {
          return `
              <ul>
              ${content
                ?.map(
                  ({ id, title, documents }) => `
                  <li id="${id}">
                    <div class="document-item ${
                      notionRouter.params.id === String(id) ? "selected" : ""
                    }" style="--depth: ${depth}">
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
                      toggledStorage.has(id)
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
      </nav>
    `;
  }

  setEvent(): void {
    this.addEvent("click", (element) => {
      const liEl = element.closest("li");
      const documentId = Number(liEl?.id);
      const buttonEl = element.closest("button");

      if (buttonEl?.id === "homeBtn") {
        browserHistory.push("/");
        removeAllClassName({
          parentNode: this.targetEl,
          selector: ".document-item",
          className: "selected",
        });
        return;
      }

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
