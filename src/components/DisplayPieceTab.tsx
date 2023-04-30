import { useState, useEffect } from 'react'
import { Chessboard } from "react-chessboard";

import { BoardPosition, Square } from 'react-chessboard/dist/chessboard/types';
import {pieces} from './Pieces';
import {MovementsButtons} from './MovementsButtons';
import {CoordinatesToNumeric, NumericToCoordinates, ReduceToPointsCaptures, ReduceToPointsMovements} from '../utils'
import {PieceTypeTemplate, PieceTypeNames} from './DeployBoardTab'

const boardSize = 300


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
function OnPositionChange(currentPosition : BoardPosition, setArrows: Function, 
                          setPiecePosition: Function, movements : (number | null)[][]){
  for (var k in currentPosition) {
    drawArrows(setArrows, movements, k); 
    setPiecePosition(k);
    return;
  }
}

function onPieceDrop(sourceSquare: Square, targetSquare: Square, piece: string, setBoardPosition: Function){
  setBoardPosition({[targetSquare] : piece});
  return true;
}
function updatePoints(points: number[], setPoints: Function, 
                      index: number, captures: (null | number)[][], movements: (null | number)[][],
                      piecesCount: number[]){
  let newPoints : number[] = [...points];
  // @ts-ignore
  newPoints[index] = (movements.reduce(ReduceToPointsMovements, 0) + captures.reduce(ReduceToPointsCaptures, 0)) * piecesCount[index];
  setPoints(newPoints);
}

function updateCode(movements: (null | number)[][], captures: (null | number)[][], setPieceTypeCode: Function, pieceTypeCode: string[], index: number){
  let newCode : string[] = [...pieceTypeCode];
  newCode[index] = PieceTypeTemplate
                    .replace("%PIECENAME%", PieceTypeNames[index])
                    .replace("%ATTACK%", captures.flat().filter(x=>x!==null).join(", "))
                    .replace("%MOVEMENT%", movements.flat().filter(x=>x!==null).join(", "));
  setPieceTypeCode(newCode);
}

type Props = {movements : (number | null)[][], arrowsColor: string, arrows: Square[][], setArrows: Function, piecePosition: string, setPiecePosition: Function, pieceName : string}
const DisplayBoard : React.FC<Props> = ({movements, arrowsColor, arrows, setArrows, piecePosition, setPiecePosition, pieceName}) => {
  const [boardPosition, setBoardPosition] = useState<BoardPosition>({"d5": pieceName})
  return <Chessboard
                boardWidth={boardSize}
                customPieces={pieces}
                customArrows={arrows} 
                position={boardPosition}
                customArrowColor={arrowsColor}
                getPositionObject={(currentPosition) => OnPositionChange(currentPosition, setArrows, setPiecePosition, movements)}   
                onPieceDrop={(sourceSquare, targetSquare, piece) => onPieceDrop(sourceSquare, targetSquare, piece, setBoardPosition)}
                areArrowsAllowed={false}
                onSquareClick={() => drawArrows(setArrows, movements, piecePosition)}
                />

}

type PropsTab = {pieceName: string, active: number, index: number, pieceSrc: string, 
  piecesCount: number[], setPiecesCount : Function, points: number[], setPoints: Function, 
  setPieceTypeCode: Function, pieceTypeCode: string[]}

export const PieceTab : React.FC<PropsTab> = ({pieceName, active, index, pieceSrc, piecesCount,
  setPiecesCount, points, setPoints, setPieceTypeCode, pieceTypeCode}) => {
  //Passing the tab index is used to avoid an arrow rendering glitch which seems due to react-chessboard

  const [arrowsMovements, setArrowsMovements] = useState<Square[][]>([]);
  const [arrowsCaptures, setArrowsCaptures] = useState<Square[][]>([]);
  const [movements, setMovements] = useState<(number | null)[][]>([[0,0,0],[0,null,0],[0,0,0]]);
  const [captures, setCaptures] = useState<(number | null)[][]>([[0,0,0],[0,null,0],[0,0,0]]);
  const [piecePositionMovements, setPiecePositionMovements] = useState<string>("d5")
  const [piecePositionCaptures, setPiecePositionCaptures] = useState<string>("d5")

  useEffect(() => drawArrows(setArrowsMovements, movements, piecePositionMovements), [movements])
  useEffect(() => drawArrows(setArrowsCaptures, captures, piecePositionCaptures), [captures])
  useEffect(() => updatePoints(points, setPoints, index , captures, movements, piecesCount), [piecesCount[index], movements, captures]);
  useEffect(() => updateCode(movements, captures, setPieceTypeCode, pieceTypeCode, index), [movements, captures])

  return (
    <div className="container">
      <div className='row'>
        <div className='col'>
          <h3 className="text-primary">Movements</h3>
          <MovementsButtons movements={movements} setMovements={setMovements} 
            captures={captures} setCaptures={setCaptures} pieceSrc={pieceSrc} 
            piecesCount={piecesCount} setPiecesCount={setPiecesCount}
            index={index}/>
        </div>


        <div className='col'>
          <div className='d-flex flex-row'>
            <div className='px-2'>
              { (active === index) ? <DisplayBoard 
                movements={movements} 
                arrowsColor="green" 
                arrows={arrowsMovements} 
                setArrows={setArrowsMovements} 
                piecePosition={piecePositionMovements}
                setPiecePosition={setPiecePositionMovements}
                pieceName={pieceName}/> : null
              }
              <h5 className='text-success'>movements</h5>
            </div>
            <div className=''>
              { (active === index) ? <DisplayBoard 
                movements={captures} 
                arrowsColor="red" 
                arrows={arrowsCaptures} 
                setArrows={setArrowsCaptures} 
                piecePosition={piecePositionCaptures} setPiecePosition={setPiecePositionCaptures}
                pieceName={pieceName}/>  : null
              }
              <h5 className='text-danger'>captures</h5>
            </div>
          </div>
          <p className='text-primary pleft-0'>Drag and drop the piece around to see the squares coverage</p>
        </div>
      </div>

    </div>
  )
}


