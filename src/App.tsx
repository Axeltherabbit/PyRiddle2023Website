import { useState } from 'react'
import { Chessboard } from "react-chessboard";

import './App.css';
import { Square } from 'react-chessboard/dist/chessboard/types';
import {pieces} from './Pieces';
import {MovementsButtons} from './MovementsButtons';


const boardSize = 200
const files = "abcdefgh"
const ranks = "12345678"

function NumericToCoordinates(x: number, y: number){
  if (x > 7 || x < 0 || y > 7 || y < 0) return null;
  return files[x]+String(y+1)
}

function CoordinatesToNumeric(coord: string){
  if (coord.length != 2 || !files.includes(coord[0]) || !ranks.includes(coord[1])) return null;
  return [files.indexOf(coord[0]), ranks.indexOf(coord[1])]
}


function CropArrowToBoard(x: number, y: number, dir : number[]){
  dir = [dir[0]*-1, dir[1]*-1]
  while (x < 0 || x > 7 || y < 0 || y > 7)
  {
    x += dir[0]
    y += dir[1]
  }
  return [x, y]
}


const directions = [[[-1,1],[0,1],[1,1]],[[-1,0],null,[1,0]],[[-1,-1],[0,-1],[1,-1]]]
function drawArrows(setArrows: Function, movements: (number | null)[][], currentPosition: string) {
  let numericPosition = CoordinatesToNumeric(currentPosition); 
  if (numericPosition === null) return;

  let arrows : string[][] = []
  for (let i=0; i<3; i++){
    for (let j=0; j<3; j++){

      let mov = movements[i][j]
      let dir = directions[i][j];
      if (mov !== null && dir !== null && mov > 0 ){ 
        let vector = [dir[0]*mov, dir[1]*mov];
        let arrowcoord = [numericPosition[0]+vector[0], numericPosition[1]+vector[1]];
        arrowcoord = CropArrowToBoard(arrowcoord[0], arrowcoord[1], dir);
        let arrow = NumericToCoordinates(arrowcoord[0], arrowcoord[1])
        let arrowStartNumeric = [numericPosition[0]+dir[0], numericPosition[1]+dir[1]]
        let arrowStart = NumericToCoordinates(arrowStartNumeric[0], arrowStartNumeric[1])
        if (arrowStart === null) continue;
        if (arrow !== null && arrow !== currentPosition) arrows.push([arrowStart, arrow]);
      }

    }
  }
  setArrows(arrows);
}
function OnPositionChange(currentPosition : Map<string, string>, setArrows: Function, 
                          setPiecePosition: Function, movements : (number | null)[][] ){
  for (var k in currentPosition) {

    drawArrows(setArrows, movements, k); 
    setPiecePosition(k);
  }

  return true;
}


function App() {
  const [arrowsMovements, setArrowsMovements] = useState<Square[][]>([]);
  const [arrowsCaptures, setArrowsCaptures] = useState<Square[][]>([]);
  const [movements, setMovements] = useState<(number | null)[][]>([[0,0,0],[0,null,0],[0,0,0]]);
  const [captures, setCaptures] = useState<(number | null)[][]>([[0,0,0],[0,null,0],[0,0,0]]);
  const [piecePosition1, setPiecePosition1] = useState<string>("d5")
  const [piecePosition2, setPiecePosition2] = useState<string>("d5")

  return (
    <div className="App container">
      <h1 className="text-primary">PyRiddle 2023</h1>


      <div className='row'>
        <div className='col'>
          <h3 className="text-primary">Movements</h3>
          <MovementsButtons movements={movements} setMovements={setMovements} 
            captures={captures} setCaptures={setCaptures} 
            refreshArrowsMovements={() => drawArrows(setArrowsMovements, movements, piecePosition1)}
            refreshArrowsCaptures={() => drawArrows(setArrowsCaptures, captures, piecePosition2)}
            />
        </div>


        <div className='col'>
          <div className='col'>
            <Chessboard
              boardWidth={boardSize}
              customPieces={pieces}
              customArrows={arrowsMovements} 
              position="8/8/8/3K4/8/8/8/8"
              customArrowColor="green"
              getPositionObject={(currentPosition) => OnPositionChange(currentPosition, setArrowsMovements, setPiecePosition1, movements)}   
              />
            <Chessboard
              boardWidth={boardSize}
              customPieces={pieces}
              customArrows={arrowsCaptures} 
              position="8/8/8/3K4/8/8/8/8"
              customArrowColor="red"
              getPositionObject={(currentPosition) => OnPositionChange(currentPosition, setArrowsCaptures, setPiecePosition2, captures)}   
              />
          </div>
          <p className='text-primary'>Drag and drop the piece around to see the squares coverage</p>
        </div>
      </div>

    </div>
  )
}

export default App
