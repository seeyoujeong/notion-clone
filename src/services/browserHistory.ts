const HISTORY_EVENT_NAME = "historyEvent";
const OPTION = {
  PUSH: "push",
  REPLACE: "replace",
} as const;

interface HistoryEventDetail {
  nextUrl: string;
  option: (typeof OPTION)[keyof typeof OPTION];
}

const browserHistory = {
  init(callback: () => void) {
    window.addEventListener("popstate", () => callback());

    window.addEventListener(
      HISTORY_EVENT_NAME,
      (event: CustomEventInit<HistoryEventDetail>) => {
        const { nextUrl, option } = event.detail!;

        if (nextUrl) {
          if (option === OPTION.PUSH) {
            history.pushState(null, "", nextUrl);
            callback();
          }

          if (option === OPTION.REPLACE) {
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
          option: OPTION.PUSH,
        },
      })
    );
  },
  replace(nextUrl: string) {
    window.dispatchEvent(
      new CustomEvent(HISTORY_EVENT_NAME, {
        detail: {
          nextUrl,
          option: OPTION.REPLACE,
        },
      })
    );
  },
};

export default browserHistory;
