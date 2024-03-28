import React, { useRef, useEffect } from "react";


export function useAlerter(callback = (event:any)=>{}, outsideClick = true, keypresses = ["Escape"] ,value = null) {
  const wrapRef = useRef<any>(value)

  useEffect(() => {

    function handleClickOutside(event:MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target) && outsideClick) {
        callback(event);
      }
    }

    function handleKeydown(event:KeyboardEvent){
      if (wrapRef.current && wrapRef.current.contains(event.target) && keypresses.findIndex(k=>k===event.key) >= 0) {
        callback(event);
      }
    }

    document.addEventListener("keydown", handleKeydown)
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
    
  }, [wrapRef]);
  return wrapRef;
}