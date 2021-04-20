import { ResizeSensor as BPResizeSensor } from "@blueprintjs/core";
import { useCallback, useState } from "react";

const ResizeSensor = ({ children, observeParents }) => {
  const [rect, setRect] = useState({
    height: 0,
    width: 0
  });
  const handleResize = useCallback((entries) => {
    entries.forEach((e) => {
      setRect({
        height: e.contentRect.height,
        width: e.contentRect.width
      })
    })
  }, []);
  return (
    <BPResizeSensor observeParents={observeParents} onResize={handleResize}>
      {children({ ...rect })}
    </BPResizeSensor>
  )
}

export default ResizeSensor;