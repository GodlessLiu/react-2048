// 有16个格子，初始时会有两个格子上安放了两个数字2，每次可以选择上下左右其中一个方向去滑动，每滑动一次，所有的数字方块都会往滑动的方向靠拢外，
// 系统也会在空白的地方随即出现一个数字方块，相同数字的方块在靠拢、相撞时会相加。

export type GameBox = number[][];

export function initGame(len: number): GameBox {
  const array = new Array(len).fill(0).map(() => new Array(len).fill(0));
  array[randNumber(len)][randNumber(len)] = 2;
  array[randNumber(len)][randNumber(len)] = 2;
  saveGame(array);
  return array;
}
// [0,2,0,2] ===> [0,0,0,4]
function go2Left(row: number[]) {
  // 移除空格
  const temp = row.filter((item) => item);
  for (let i = 0; i < temp.length - 1; i++) {
    if (temp[i] === temp[i + 1]) {
      temp[i] = temp[i] * 2;
      temp[i + 1] = 0;
    }
  }
  // 向左移ii
  const filterTemp = temp.filter((item) => item);
  return [...filterTemp, ...new Array(row.length - filterTemp.length).fill(0)];
}

function go2Right(row: number[]) {
  // 移除空格
  const temp = row.filter((item) => item);
  for (let i = temp.length - 1; i > 0; i--) {
    if (temp[i] === temp[i - 1]) {
      temp[i] = temp[i] * 2;
      temp[i - 1] = 0;
    }
  }
  const filterTemp = temp.filter((item) => item);
  return [...new Array(row.length - filterTemp.length).fill(0), ...filterTemp];
}

export function turnRight(array: GameBox): GameBox {
  return array.map((row) => {
    return go2Right(row);
  });
}

export function turnLeft(array: GameBox): GameBox {
  return array.map((row) => {
    return go2Left(row);
  });
}
export function turnUp(array: GameBox): GameBox {
  const rotatedMatrix = rotateClockwise(array);
  const temp = rotatedMatrix.map((row) => {
    return go2Right(row);
  });
  return rotateCounterClockwise(temp);
}
export function turnDown(array: GameBox): GameBox {
  const rotatedMatrix = rotateClockwise(array);
  const temp = rotatedMatrix.map((row) => {
    return go2Left(row);
  });
  return rotateCounterClockwise(temp);
}

// 顺时针旋转数组
function rotateClockwise(matrix: GameBox) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotatedMatrix: GameBox = [];

  for (let i = 0; i < cols; i++) {
    rotatedMatrix[i] = [];
    for (let j = rows - 1; j >= 0; j--) {
      rotatedMatrix[i].push(matrix[j][i]);
    }
  }

  return rotatedMatrix;
}
// 逆时针旋转数组
function rotateCounterClockwise(matrix: GameBox) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotatedMatrix: GameBox = [];

  for (let i = cols - 1; i >= 0; i--) {
    rotatedMatrix[cols - 1 - i] = [];
    for (let j = 0; j < rows; j++) {
      rotatedMatrix[cols - 1 - i].push(matrix[j][i]);
    }
  }

  return rotatedMatrix;
}

function randNumber(n: number): number {
  return Math.floor(Math.random() * n);
}

export function computedSocre(array: GameBox): number {
  return array.reduce((pre, cur) => {
    return pre + cur.reduce((pre, cur) => pre + cur, 0);
  }, 0);
}

export function addACeil(array: GameBox): GameBox {
  const rowL = array.length;
  const colL = array[0].length;
  const res = [];
  for (let row = 0; row < rowL; row++) {
    for (let col = 0; col < colL; col++) {
      if (array[row][col] === 0) {
        res.push([row, col]);
      }
    }
  }
  const [row, col] = res[randNumber(res.length)];
  array[row][col] = 2;
  return array;
}
export function gameOver(box: GameBox): boolean {
  const fageL = isArrayLike(box, turnLeft(box));
  const fageR = isArrayLike(box, turnRight(box));
  const fageU = isArrayLike(box, turnUp(box));
  const fageD = isArrayLike(box, turnDown(box));
  // 判断游戏是否结束
  return fageL && fageR && fageU && fageD;
}
export function isArrayLike(A: GameBox, B: GameBox): boolean {
  return JSON.stringify(A) === JSON.stringify(B);
}

export const Action = {
  left: turnLeft,
  right: turnRight,
  up: turnUp,
  down: turnDown,
  undo: undo,
};

export function saveGame(array: GameBox) {
  localStorage.setItem('game', JSON.stringify(array));
}
function undo(): GameBox {
  return JSON.parse(localStorage.getItem('game') || '[]');
}
