import { createContext, useContext, useState, type ReactNode } from "react";

const LoadingBarContext = createContext<{
  loading: boolean;
  setLoading: (v: boolean) => void;
}>({ loading: false, setLoading: () => {} });

export function LoadingBarProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingBarContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingBarContext.Provider>
  );
}

export const useLoadingBar = () => useContext(LoadingBarContext);
