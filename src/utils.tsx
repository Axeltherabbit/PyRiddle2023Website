export const files = "abcdefgh"
export const ranks = "12345678"

export function NumericToCoordinates(x: number, y: number){
  if (x > 7 || x < 0 || y > 7 || y < 0) return null;
  return files[x]+String(y+1)
}

export function CoordinatesToNumeric(coord: string){
  if (coord.length != 2 || !files.includes(coord[0]) || !ranks.includes(coord[1])) return null;
  return [files.indexOf(coord[0]), ranks.indexOf(coord[1])];
}


export function reduceSum(partialSum: number, n: (number | null)) : number {
  if (n === null) return partialSum;
  return partialSum + n;
} 

const MovementsCost : (null | number)[][] = [[3,    4, 3], 
                                             [2, null, 2],
                                             [1,    1, 1]]

const CapturesCost: (null | number)[][] = [[4,    5, 4],
                                           [3, null, 3],
                                           [2,    2, 2]]


function reduceToPoints(cost: (null | number)[][]) : Function{
  function inner(partialSum: number, arr: (null | number)[], indexOf: number) : number {
    for (let i=0;i<3;i++){
      // @ts-ignore
      if (cost[indexOf][i]!== null && arr[i] !== null) partialSum +=  arr[i] * cost[indexOf][i]
    }
    return partialSum;
  }

  return inner
}


export const ReduceToPointsMovements = reduceToPoints(MovementsCost)
export const ReduceToPointsCaptures = reduceToPoints(CapturesCost)
