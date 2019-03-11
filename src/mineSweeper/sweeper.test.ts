import {getNeighbours, MineSweeper, MinesweeperView} from "./sweeper";

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
    expect(view.view).toEqual([
      [[1, false, true], [2, false, false], [0, false, false]],
      [[1, false, true], [2, false, false], [0, false, false]],
      [[1, false, false], [1, false, false], [0, false, false]],
    ])
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
    expect(view.view[2][0]).toEqual([1, true, false, true]); // minecount, visited, isbomb, dislayCount;
    expect(view.view).toEqual([
      [[1, false, true, false], [2, false, false, false], [0, false, false, false]],
      [[1, false, true, true], [2, false, false, true], [0, false, false, false]],
      [[1, true, false, true], [1, false, false, true], [0, false, false, false]],
    ]);

    // click [2, 2]
    view.click(2, 2);
    expect(view.view).toEqual([
      [[1, false, true, false], [2, false, false, false], [0, false, false, false]],
      [[1, false, true, true], [2, false, false, true], [0, false, false, true]],
      [[1, true, false, true], [1, false, false, true], [0, true, false, true]],
    ]);
  });
});

describe('Minesweeper', () => {
  it('should end game correctly', () => {
    const game = new MineSweeper();
    const grid = [
      [true, false, false],
      [true, false, false],
      [false, false, false],
    ];
    // overwrite games grid
    game.grid = grid;

    const view = new MinesweeperView(grid);
    game.view = view;
    game.click(2, 0);
    expect(game.isFinished()).toBe(false);
  });
});