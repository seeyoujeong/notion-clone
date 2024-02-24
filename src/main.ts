import App from "./App";
import { generateElement } from "./services";

new App({
  elements: {
    parent: document.querySelector<HTMLDivElement>("#app")!,
    target: generateElement("main"),
  },
});
