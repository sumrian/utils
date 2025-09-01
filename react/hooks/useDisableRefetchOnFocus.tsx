import { useEffect } from "react";
import { focusManager } from "react-query";

// 使用TanStack Query 时，遇见<input type="file" onChange={onChangeHandler} />处理
export function useDisableRefetchOnFocus() {
  useEffect(() => {
    focusManager.setFocused(false);
    return () => focusManager.setFocused(undefined);
  }, []);
}
