/*
 * useModalContext.ts
 * author: evan kirkiles
 * created on Mon Dec 26 2022
 * 2022 the nobot space,
 */

import React, { createContext, useContext } from "react";

interface ModalContextState {
  ref: HTMLDivElement | null;
}
const ModalContext = createContext<ModalContextState>({ ref: null });

const useModalContext = () => useContext(ModalContext);
export default useModalContext;

export function ModalContextProvider({
  nodeRef,
  children,
}: {
  nodeRef: HTMLDivElement | null;
  children?: React.ReactNode;
}) {
  return (
    <ModalContext.Provider value={{ ref: nodeRef }}>
      {children}
    </ModalContext.Provider>
  )
}
