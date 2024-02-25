import { Component } from "@/core";
import { RootDocument } from "@/types";

interface DocumentListProps {
  addDocument: (parentId: number | null) => void;
  deleteDocument: (id: number) => void;
}

class DocumentList extends Component<DocumentListProps, RootDocument[]> {
  template(): string {
    return `
      <nav>
        ${(function createList(content: RootDocument[]): string {
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
                    ${documents.length > 0 ? createList(documents) : ""}
                  </li>`
                )
                .join("")}
              </ul>
            `;
        })(this.state!)}
      </nav>
    `;
  }

  setEvent(): void {
    this.addEvent("click", (element) => {
      const liEl = element.closest("li")!;

      if (element.className === "addBtn") {
        this.props?.addDocument(Number(liEl.id));
        return;
      }

      if (element.className === "deleteBtn") {
        this.props?.deleteDocument(Number(liEl.id));
        return;
      }
    });
  }
}

export default DocumentList;
