import * as React from "react";
import {MineSweeper, Cell, ViewRow} from '../mineSweeper/sweeper';
import * as styles from '../scss/main.scss';

function GameCell(props) {
  const cell: Cell = props.cell;
  if (cell.hasBomb && cell.visited) {
    return <div className={`${styles.cell} ${styles.cellBomb}`} onClick={props.onClick}>m</div>
  } else {
    return <span className={`${styles.cell}`} onClick={props.onClick}>{cell.visited ? cell.bombCount : null}</span>
  }
}

export class App extends React.Component<any, { game: MineSweeper, clicks: number }> {
  constructor(props) {
    super(props);
    this.state = {
      game: new MineSweeper(5, 5, 5),
      clicks: 0,
    };
  }

  render() {
    return <>
      {this.state.game.isFinished() ? <div>Game Finished</div> : null}
      {this.state.game.view.view.map((row: ViewRow, rowIndex: number) => {
        return <>{row.map((cell: Cell, columnIndex: number) => {
          return <GameCell cell={cell} onClick={() => {
            if (!this.state.game.isFinished()) {
              this.state.game.click(rowIndex, columnIndex);
              this.setState({clicks: this.state.clicks + 1})
            }
          }}/>;
        })}<br>
        </br></>
      })}</>
  }
}