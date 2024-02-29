import { storage } from "@/services";

export const toggledStorage = storage<number[]>({
  _storage: localStorage,
  key: "notion_toggled",
  defaultValue: [],
});
