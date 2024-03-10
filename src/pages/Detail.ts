import { DocumentEditor } from "@/components";
import { Component } from "@/core";
import { notionRouter, notionService } from "@/domain";

class Detail extends Component {
  template(): string {
    return `
      <div class="detail"></div>
    `;
  }

  mounted(): void {
    const documentId = Number(notionRouter.params.id);

    new DocumentEditor({
      targetEl: document.querySelector(".detail")!,
    });

    notionService.getDocumentContent(documentId);
  }
}

export default Detail;
