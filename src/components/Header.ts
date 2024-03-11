import { Component } from "@/core";
import { API_HEADER_X_USERNAME } from "@/constants";
import profile from "@/assets/profile.png";
import { browserHistory, removeAllClassName } from "@/services";
import { notionService } from "@/domain";

class Header extends Component {
  template(): string {
    return `
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
    `;
  }

  setEvent(): void {
    this.addEvent("click", (element) => {
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
    });
  }
}

export default Header;
