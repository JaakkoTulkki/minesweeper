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
    const cellsVisible = flattened.filter((v) => {
      if(v[0] === -1 && v[1]) {
        isFinished = true;
      }
      return v[1];
    });
    return isFinished || cellsVisible.length === flattened.length;
  }
}

type Grid = boolean[][];
type ViewRow = Cell[];
type View = ViewRow[];

export class Cell {
  constructor(public bombCount: number, public visited: boolean, public hasBomb: boolean, public displayBombCount: boolean) {
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
        const cell: Cell = new Cell(bombCount, false, isBomb, false);//[bombCount, false, isBomb, false];
        row.push(cell);
      }
      view.push(row);
    }
    return view;
  }

  public click(row: number, column: number) {
    const neighbours = getNeighbours(row, column, this.grid.length, this.grid[0].length);
    for(const n of neighbours) {
      const [r, c] = n;
      this.view[r][c].displayBombCount = true;
    }
    this.view[row][column].visited = true;
    this.view[row][column].displayBombCount = true;
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