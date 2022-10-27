
const makeGrid = (rows, cols) => {
  let grid = [];
  for (let row = 0; row < rows; row++) {
    let arr = new Array(cols).fill(0);
    grid.push(arr);
  }
  return grid;
}

const get = (x, y, grid) => {
  // if (x < 0 || x > grid[0].length) {
  //   return undefined;
  // }
  // if (y < 0 || y > grid.length) {
  //   return undefined;
  // }
  if (grid[y] === undefined) {
    return undefined;
  }
  return grid[y][x];
}


const run = () => {
  let grid = makeGrid(5, 5);

  grid[2][1] = 1;
  grid[2][2] = 1;
  grid[2][3] = 1;

  console.log(grid);
  grid = processGrid(grid);
  console.log(grid);
}

const cloneGrid = (grid) => {
  const clone = [];
  for (let y = 0; y < grid.length; y++) {
    clone.push([...grid[y]])    
  }
  return clone;
} 

const getNeighbors = (x, y, grid) => {
  let neighborsList = []
  for (let i = x-1; i <= x+1; i++) {
    for (let j = y-1; j <= y+1; j++) {
      if (x !== i && j !== y) {
        neighborsList.push(get(i, j, grid));
      }
    }
  }
  return neighborsList.filter(x => x != undefined);
}

const isAlive = (x, y, grid) => {
  const neighbors = getNeighbors(x, y, grid);
  
  const liveNeighbors = neighbors.filter(x => x === 1);

  console.log("liveNeighbors", liveNeighbors)

  if (liveNeighbors.length < 2) {
    return 0;
  }
  if (liveNeighbors.length == 2 || liveNeighbors.length == 3) {
    return 1;
  }
  if (liveNeighbors.length > 3) {
    return 0;
  }
  if (liveNeighbors.length === 3 && get(x, y, grid) === 0) {
    return 1;
  }
}

const processGrid = (grid) => {
  const snapshot = cloneGrid(grid);
  const copy = cloneGrid(grid);
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      copy[y][x] = isAlive(x, y, snapshot);
    }
  }
  return copy;
}

run();
