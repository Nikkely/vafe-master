interface Store {
  getObj(key: string): object;
  set<T>(key: string, val: T): T | null;
  rm(key: string): boolean;
  clear(): void;
}

class dummyStorage implements Store {
  getObj(): object {
    return {};
  }
  set(): null {
    return null;
  }
  rm(): boolean {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clear(): void {}
}

class LcStorage implements Store {
  getObj(key: string): object {
    const val = window.localStorage.getItem(key) ?? '{}';
    return JSON.parse(val);
  }
  set<T>(key: string, val: T): T | null {
    if (typeof val === 'object') {
      window.localStorage.setItem(key, JSON.stringify(val));
    } else {
      window.localStorage.setItem(key, String(val));
    }
    return val;
  }
  rm(key: string): boolean {
    if (window.localStorage.getItem(key)) {
      window.localStorage.removeItem(key);
    }
    console.warn(`Warning: Object with key "${key}" does not exist.`);
    return false;
  }
  clear() {
    console.info('All object will be removed.');
    window.localStorage.clear();
  }
}

export function getStorage(): Store {
  if (!window.localStorage) {
    console.log('You can not use localstorage.');
    return new dummyStorage();
  }

  return new LcStorage();
}
