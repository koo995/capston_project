import { useState } from "react";

//if (typeof window === "undefined"이것이 뭐냐?
/*It's to test if the script is being run in a web-browser or not. 
In a webpage, there are several intrinsic objects, such as window,
other environments (like Node.js) won't have window but might have other objects
like console (well, console now exists in most browsers now, but it wasn't originally).
*/

export function getStorageItem(key, initialValue) {
  if (typeof window === "undefined") {
    return initialValue;
  }
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem(key);
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    // If error also return initialValue
    console.log(error);
    return initialValue;
  }
}

export function setStorageItem(key, initialValue) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
    }
  } catch (error) {
    console.log(error);
  }
}

// Hook
export default function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    return getStorageItem(key, initialValue);
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    setStorageItem(key, valueToStore);
  };
  return [storedValue, setValue]; //이런 훅을 만드는 논리가 대단하네...
}
