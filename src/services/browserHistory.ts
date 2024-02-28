interface HistoryEventDetail {
  nextUrl: string;
  option: "push" | "replace";
}

const HISTORY_EVENT_NAME = "historyEvent";
const PUSH = "push";
const REPLACE = "replace";

const browserHistory = {
  init(callback: () => void) {
    window.addEventListener("popstate", () => callback());

    window.addEventListener(
      HISTORY_EVENT_NAME,
      (event: CustomEventInit<HistoryEventDetail>) => {
        const { nextUrl, option } = event.detail!;

        if (nextUrl) {
          if (option === PUSH) {
            history.pushState(null, "", nextUrl);
            callback();
          }

          if (option === REPLACE) {
            history.replaceState(null, "", nextUrl);
            callback();
          }
        }
      }
    );
  },
  push(nextUrl: string) {
    window.dispatchEvent(
      new CustomEvent(HISTORY_EVENT_NAME, {
        detail: {
          nextUrl,
          option: PUSH,
        },
      })
    );
  },
  replace(nextUrl: string) {
    window.dispatchEvent(
      new CustomEvent(HISTORY_EVENT_NAME, {
        detail: {
          nextUrl,
          option: REPLACE,
        },
      })
    );
  },
};

export default browserHistory;
