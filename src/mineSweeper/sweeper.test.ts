import {Cell, getNeighbours, MineSweeper, MinesweeperView} from "./sweeper";

function toCell(count, visited, hasBomb) {
  return new Cell(count, visited, hasBomb);
}

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

  it('should propagate clicks to view() to MinesweeperView\`s view()', () => {
    const game = new MineSweeper();
    const mock = jest.fn();
    game.view.click = mock;
    game.click(1, 1);
    expect(mock).toHaveBeenCalledWith(1, 1);
  });
});


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

  it('cell should show number of mines next to a cell, visibility, and whether it is a bomb', () => {
    const grid = [
      [true, false, false],
      [true, false, false],
      [false, false, false],
    ];

    const view = new MinesweeperView(grid);
    const exptecValues = [
      [[1, false, true], [2, false, false], [0, false, false]].map(([count, visited, hasBomb]) => toCell(count, visited, hasBomb)),
      [[1, false, true], [2, false, false], [0, false, false]].map(([count, visited, hasBomb]) => toCell(count, visited, hasBomb)),
      [[1, false, false], [1, false, false], [0, false, false]].map(([count, visited, hasBomb]) => toCell(count, visited, hasBomb)),
    ];

    expect(view.view).toEqual(exptecValues);
  });

  it('should tell whether to show number of  or not when cell is clicked', () => {
    const grid = [
      [true, false, false],
      [true, false, false],
      [false, false, false],
    ];
    // click [2, 0]
    const view = new MinesweeperView(grid);
    view.click(2, 0);
    expect(view.view).toEqual([
      [[1, false, true], [2, false, false], [0, false, false]].map(([count, visited, hasBomb]) => toCell(count, visited, hasBomb)),
      [[1, false, true], [2, false, false], [0, false, false]].map(([count, visited, hasBomb]) => toCell(count, visited, hasBomb)),
      [[1, true, false], [1, false, false], [0, false, false]].map(([count, visited, hasBomb]) => toCell(count, visited, hasBomb)),
    ]);

    // click [2, 2]
    view.click(2, 2);
    expect(view.view).toEqual([
      [[1, false, true], [2, false, false], [0, false, false]].map(([count, visited, hasBomb]) => toCell(count, visited, hasBomb)),
      [[1, false, true], [2, false, false], [0, false, false]].map(([count, visited, hasBomb]) => toCell(count, visited, hasBomb)),
      [[1, true, false], [1, false, false], [0, true, false]].map(([count, visited, hasBomb]) => toCell(count, visited, hasBomb)),
    ]);
  });
});

describe('Minesweeper', () => {
  const grid = [
      [true, false, false],
      [true, false, false],
      [false, false, false],
    ];
  let game: MineSweeper;
  beforeEach(() => {
    game = new MineSweeper();
    // overwrite game's grid and view
    game.grid = grid;
    game.view = new MinesweeperView(grid);
  });

  it('should end game correctly when hits a mine', () => {
    game.click(2, 0);
    expect(game.isFinished()).toBe(false);

    game.click(1, 1);
    expect(game.isFinished()).toBe(false);

    // hit mine
    game.click(1, 0);
    expect(game.isFinished()).toBe(true);
  });

  it('should end game when gone through all the cells that do not have mines', () => {
    game.click(0, 1);
    game.click(0, 2);
    game.click(1, 1);
    game.click(1, 2);
    game.click(2, 0);
    game.click(2, 1);
    expect(game.isFinished()).toEqual(false);
    game.click(2, 2);
    expect(game.isFinished()).toEqual(true);
  });
});