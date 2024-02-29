interface StorageProps<V> {
  _storage: Storage;
  key: string;
  defaultValue: V;
}

const storage = <V>({ _storage, key, defaultValue }: StorageProps<V>) => ({
  setItem(value: V) {
    _storage.setItem(key, JSON.stringify(value));
  },
  getItem(): V {
    if (!_storage.getItem(key)) {
      _storage.setItem(key, JSON.stringify(defaultValue));
    }

    return JSON.parse(_storage.getItem(key)!);
  },
  removeItem() {
    _storage.removeItem(key);
  },
});

export default storage;
