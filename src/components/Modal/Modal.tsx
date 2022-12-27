/*
 * Modal.tsx
 * author: evan kirkiles
 * created on Mon Dec 26 2022
 * 2022 the nobot space, 
 */

import React from "react";
import Window, { WindowProps } from "../Window/Window";
import ReactDOM from "react-dom";
import useModalContext from "../../contexts/useModalContext";

export default function Modal(props: WindowProps) {
  const { ref: desktop } = useModalContext();
  if (!desktop) return null;
  return ReactDOM.createPortal(
    <Window
      {...props}
      zIndex={1000}
      >
        {props.children}
    </Window>,
    desktop
  );
}