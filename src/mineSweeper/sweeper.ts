export class MineSweeper {
  public grid: any[] = [];

  constructor(private nOfColumns: number = 10, private nOfRows: number = 10, private nOfMines: number = 10) {
    this.createGrid();
  }

  private createGrid() {
    let mineCount = this.nOfMines;
    let cellsLeft = this.nOfRows * this.nOfColumns;
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
      this.grid.push(row);
    }
  }
}