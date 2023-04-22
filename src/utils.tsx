export const files = "abcdefgh"
export const ranks = "12345678"

export function NumericToCoordinates(x: number, y: number){
  if (x > 7 || x < 0 || y > 7 || y < 0) return null;
  return files[x]+String(y+1)
}

export function CoordinatesToNumeric(coord: string){
  if (coord.length != 2 || !files.includes(coord[0]) || !ranks.includes(coord[1])) return null;
  return [files.indexOf(coord[0]), ranks.indexOf(coord[1])]
}
