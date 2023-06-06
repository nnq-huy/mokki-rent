import { useEffect } from "react";

const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
  	if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      if (scrollHeight > 140) {
        textAreaRef.style.height = 140 + "px";
      } else {textAreaRef.style.height = scrollHeight + "px";}
      
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
