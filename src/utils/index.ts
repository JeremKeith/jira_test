import { useState, useEffect, useRef } from "react";
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
export const useArray = <T>(param: T[]) => {
  // hello，请把作业写在这里吧，写完记得再对照作业要求检查一下
  const [value, setValue] = useState(param);
  const add = (item: T) => {
    setValue([...value, item]);
  };
  const removeIndex = (num: number) => {
    const tmp = [...value];
    tmp.splice(num, 1);
    setValue(tmp);
  };
  const clear = () => {
    setValue([]);
  };
  return { value, setValue, add, clear, removeIndex };
};
export const useDocumentTitle = (title: string, keepOnUnmount: boolean) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
export const resetRoute = () => {
  window.location.href = window.location.origin;
};
