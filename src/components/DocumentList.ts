import { Component } from "@/core";
import { RootDocument } from "@/types";

class DocumentList extends Component<{}, RootDocument[]> {
  template(): string {
    const createList = (content: RootDocument[]): string => {
      return `
          <ul>
          ${content
            ?.map(
              ({ id, title, documents }) => `
              <li id="${id}">
                ${title}
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
}

export default DocumentList;
