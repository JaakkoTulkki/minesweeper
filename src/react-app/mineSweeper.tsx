import * as React from "react";
import {MineSweeper, Cell, ViewRow} from '../mineSweeper/sweeper';
import * as styles from '../scss/main.scss';

function RCell(props) {
  const cell: Cell = props.cell;
  if(cell.hasBomb) {
    return <div className={`${styles.cell}`} onClick={props.onClick}>m</div>
  } else {
    return <span className={`${styles.cell}`}>{cell.visited ? cell.bombCount : null}</span>
  }
}

export const App = () => {
  const game = new MineSweeper();
  return <>{game.view.view.map((row: ViewRow, rowIndex: number) => {
    return <>{row.map((cell: Cell, columnIndex: number) => {
      return <RCell cell={cell} onClick={() => {
        game.click(rowIndex, columnIndex);
      }}/>;
    })}<br>
    </br></>
  })}</>
};