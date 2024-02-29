import { storage } from "@/services";

const { getItem, setItem, removeItem } = storage<number[]>({
  _storage: localStorage,
  key: "notion_toggled",
  defaultValue: [],
});

export const toggledStorage = {
  getIdList() {
    return getItem();
  },
  addId(id: number) {
    if (!getItem().includes(id)) {
      setItem([...getItem(), id]);
    }
  },
  deleteId(id: number) {
    setItem(getItem().filter((value) => value !== id));
  },
  has(id: number) {
    return getItem().includes(id);
  },
  reset() {
    removeItem();
  },
};
