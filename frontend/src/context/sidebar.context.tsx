import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type SidebarContextProps = {
  openSidebarState: boolean;
  toggleSidebarState: () => void;
};
const SidebarContext = createContext<SidebarContextProps>(
  {} as SidebarContextProps
);

type SidebarProviderProps = PropsWithChildren;

export default function SidebarProvider({ children }: SidebarProviderProps) {
  const [openSidebarState, setSidebarState] = useState<boolean>(false);
  const toggleSidebarState = () => {
    setSidebarState((prevState) => !prevState);
  };
  return (
    <SidebarContext.Provider value={{ openSidebarState, toggleSidebarState }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error("useSidebarContext must be used within an SidebarProvider");
  }

  return context;
};
