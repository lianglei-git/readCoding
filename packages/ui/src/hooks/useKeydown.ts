import React, { useEffect } from "react";

function useKeydown(props) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey && event.keyCode === 8) {
        props.CommandDelete?.(event);
        event.preventDefault(); // Prevent the default action (e.g. back navigation)
        console.log("Command+Delete pressed!");
        // Perform your desired operation here
      }
      if (event.metaKey && event.keyCode === 83) {
        props.CommandSave?.(event);
        event.preventDefault(); 
      }
      if (event.ctrlKey && event.keyCode === 83) {
        event.preventDefault(); 
        props.CommandSave?.(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}

export default useKeydown;