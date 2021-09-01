import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  // To get each code cell to use each other's code we have to bundle the currentCell with the
  // previous code cell
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var show = (value) => {
          const root = document.querySelector('#root');
          if(typeof value === 'object'){
            if(value.$$typeof && value.props){
              _ReactDOM.render(value, root);
            }
            else{
              root.innerHTML = JSON.stringify(value);
            }
          }
          else{
            root.innerHTML = value;
          }
        }
      `;
    const showFuncNoop = `var show = () => {}`;
    const cumulativeCode = [];
    for (let currentCell of orderedCells) {
      if (currentCell.type === "code") {
        if (currentCell.id === cellId) {
          // This is the currentcell where we want to show
          cumulativeCode.push(showFunc);
        } else {
          // then we are in cell where we don't want to have the previous content in our
          // showfunc
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(currentCell.content);
      }
      // if the current cell has the id of the cell in ordered cells, we stop
      if (currentCell.id === cellId) {
        break;
      }
    } // end of for
    return cumulativeCode;
  }).join("\n");
};
