import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { useEffect, useState } from "react";
import "./resizable.css";

interface ResizableProps {
  direction: "horizontal" | "verticle";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          // this fixed the bug for sec13: 158
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);
    return () => {
      // clean up the event listener
      window.removeEventListener("resize", listener);
    };
  }, []);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width: width,
      resizeHandles: ["e"],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 24],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
export default Resizable;
