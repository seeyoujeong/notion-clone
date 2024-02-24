import App from "./App";

const parentEl = document.querySelector<HTMLDivElement>("#app")!;

new App({
  elements: {
    parent: parentEl,
    target: document.createElement("main"),
  },
});
