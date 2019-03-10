import {MineSweeper} from "./sweeper";
import {type} from "os";

describe('MineSweeper', () => {
  it('should return 10x10 grid with ten mines in it', () => {
    const sweeper = new MineSweeper();
    let mineCount = 0;

    expect(sweeper.grid.length).toEqual(10);
    sweeper.grid.forEach((row) => {
      expect(row.length).toEqual(10);
      expect(row.filter(r => typeof r === 'boolean').length).toEqual(10);
      mineCount += row.filter(r => r).length;
    });
    expect(mineCount).toEqual(10);
  });
});

function getNeighbours(currentRow, currentColumn, maxRow, maxColumn) {
  const neighbourRow = [currentRow - 1, currentRow, currentRow + 1].filter(r => r >= 0 && r < maxRow);
  const neighbourColumns = [currentColumn - 1, currentColumn, currentColumn + 1].filter(c => c >= 0 && c < maxColumn);

  const neighbourCells = [];
  for(const r of neighbourRow) {
    for (const c of neighbourColumns) {
       if(`${r}-${c}` !== `${currentRow}-${currentColumn}`) {
         const cell = [r, c];
         neighbourCells.push(cell);
       }
    }
  }
  return neighbourCells;


}

function getView(grid:boolean[][]) {
  const rLength = grid.length;
  const cLength = grid[0].length;

  const view = []
  for(let r = 0; r < rLength; r++) {
    const row = [];
    for(let c = 0; c < cLength; c++) {
      const neighbours = getNeighbours(r, c, rLength, cLength);
      // get number of bombs
      if(grid[r][c] === true) {
        row.push(-1)
      } else {
        let bombCount = 0;
        for (let neighbour of neighbours) {
          const nR = neighbour[0];
          const nC = neighbour[1];
          const val = grid[nR][nC];

          if (val) bombCount++;
        }
        row.push(bombCount);
      }
    }
    view.push(row);
  }
  return view;
}

describe('MinesweeperView', () => {
  it('should get correct neighboring rows and columns', () => {
    const numberofRows = 3;
    const numberOfColumns = 3;
    expect(getNeighbours(0, 0, numberofRows, numberOfColumns)).toEqual([
      [0, 1], [1, 0], [1, 1]
    ]);

    expect(getNeighbours(1, 1, 3, 3)).toEqual([
      [0, 0], [0, 1], [0, 2],
      [1, 0], [1, 2],
      [2, 0], [2, 1], [2, 2],
    ]);

  });

  it('cell should show number of mines next to a cell', () => {
    const grid = [
      [true, false, false],
      [true, false, false],
      [false, false, false],
    ];

    const view = getView(grid);
    expect(view).toEqual([
      [-1, 2, 0],
      [-1, 2, 0],
      [1, 1, 0],
    ])
  });
});