import Preview from "./Preview";
import { useEffect } from "react";
import CodeEditor from "./code-editor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useCumulativeCode } from "../hooks/use-cumulative-code";
import "./code-cell.css";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const resultBundle = useTypedSelector((state: any) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!resultBundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 2000);

    // this called the next time useEffect gets called
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction="verticle">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!resultBundle || resultBundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={resultBundle.code} err={resultBundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};
export default CodeCell;

// <div>
//           <button onClick={handleClick}>Submit</button>
//         </div>
//
//   const handleClick = async () => {
//     // otherwise transform our code
//     const output = await bundler(input);
//     setCode(output);
//   };
