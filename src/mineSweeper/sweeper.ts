export class MineSweeper {
  public grid: Grid = [];
  public view: MinesweeperView;

  constructor(private nOfColumns: number = 10, private nOfRows: number = 10, private nOfMines: number = 10) {
    this.grid = this.createGrid();
    this.view = new MinesweeperView(this.grid);
  }

  private createGrid() {
    let mineCount = this.nOfMines;
    let cellsLeft = this.nOfRows * this.nOfColumns;
    const grid: Grid = [];
    for (let r = 0; r < this.nOfRows; r++) {
      const row = [];
      for (let c = 0; c < this.nOfColumns; c++) {
        const probabilty = mineCount / cellsLeft;
        if (probabilty >= Math.random()) {
          row.push(true);
          mineCount -= 1;
        } else {
          row.push(false);
        }
        cellsLeft -= 1;
      }
      grid.push(row);
    }
    return grid;
  }

  public click(row: number, column: number) {
    this.view.click(row, column);
  }

  public isFinished() {
    let isFinished = false;
    const flattened  = this.view.view.reduce((acc: any[], value: ViewRow) => {
      return acc.concat(value);
    }, []);
    const bombCount = flattened.reduce((acc: number, cell: Cell) => {
      return cell.hasBomb ? acc + 1 : acc;
    }, 0);
    const cellsVisible = flattened.filter((cell: Cell) => {
      if(cell.hasBomb && cell.visited) {
        isFinished = true;
      }
      return cell.visited;
    });
    return isFinished || cellsVisible.length === (flattened.length  - bombCount);
  }
}

export type Grid = boolean[][];
export type ViewRow = Cell[];
export type View = ViewRow[];

export class Cell {
  constructor(public bombCount: number, public visited: boolean, public hasBomb: boolean) {
  }
}

export class MinesweeperView {
  public view: View;
  constructor(private grid: Grid) {
    this.view = this.getInitialView();
  }

  protected getInitialView(): View {
    const rLength = this.grid.length;
    const cLength = this.grid[0].length;

    const view: View = [];
    for (let r = 0; r < rLength; r++) {
      const row: ViewRow = [];
      for (let c = 0; c < cLength; c++) {
        const neighbours = getNeighbours(r, c, rLength, cLength);
        // get number of bombs
        const isBomb = this.grid[r][c];

        let bombCount = 0;
        for (let neighbour of neighbours) {
          const nR = neighbour[0];
          const nC = neighbour[1];
          const val = this.grid[nR][nC];

          if (val) bombCount++;
        }
        const cell: Cell = new Cell(bombCount, false, isBomb);
        row.push(cell);
      }
      view.push(row);
    }
    return view;
  }

  public click(row: number, column: number) {
    let cell = this.view[row][column];
    const hadBeenVisited = cell.visited;
    cell.visited = true;
    // if this is zero get neighbours and visit them
    if (!hadBeenVisited && cell.bombCount === 0) {
      const neighbours = getNeighbours(row, column, this.grid.length, this.grid[0].length);
      for(const neighbour of neighbours) {
        const [r, c] = neighbour;
        this.click(r, c);
      }
    }
  }
}

export function getNeighbours(currentRow, currentColumn, maxRow, maxColumn) {
    const neighbourRow = [currentRow - 1, currentRow, currentRow + 1].filter(r => r >= 0 && r < maxRow);
    const neighbourColumns = [currentColumn - 1, currentColumn, currentColumn + 1].filter(c => c >= 0 && c < maxColumn);

    const neighbourCells = [];
    for (const r of neighbourRow) {
      for (const c of neighbourColumns) {
        if (`${r}-${c}` !== `${currentRow}-${currentColumn}`) {
          const cell = [r, c];
          neighbourCells.push(cell);
        }
      }
    }
    return neighbourCells;
  }