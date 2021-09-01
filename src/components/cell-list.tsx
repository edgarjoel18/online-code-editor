import "./cell-list.css";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment } from "react";

const CellList: React.FC = () => {
  // from our cells state we only want the order array and the data object
  const newCells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = newCells.map((cell: any) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem key={cell.id} cell={cell} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      {renderedCells}
      <AddCell forceVisible={newCells.length === 0} nextCellId={null} />
    </div>
  );
};

export default CellList;
