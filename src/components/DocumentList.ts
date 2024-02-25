import { Component } from "@/core";
import { RootDocument } from "@/types";

interface DocumentListProps {
  addDocument: (parentId: number | null) => void;
}

class DocumentList extends Component<DocumentListProps, RootDocument[]> {
  template(): string {
    const createList = (content: RootDocument[]): string => {
      return `
          <ul>
          ${content
            ?.map(
              ({ id, title, documents }) => `
              <li id="${id}">
                <span>
                  <span>${title}</span>
                  <button class="add">추가</button>
                  <button>삭제</button>
                </span>
                ${documents.length > 0 ? createList(documents) : ""}
              </li>`
            )
            .join("")}
          </ul>
        `;
    };

    return `
      <nav>
        ${createList(this.state || [])}
      </nav>
    `;
  }

  setEvent(): void {
    this.addEvent("click", (element) => {
      const liEl = element.closest("li")!;

      if (element.className === "add") {
        this.props?.addDocument(Number(liEl.id));
      }
    });
  }
}

export default DocumentList;
