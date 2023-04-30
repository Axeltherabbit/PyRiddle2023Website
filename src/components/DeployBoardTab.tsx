import React, { useEffect, useState } from "react";
import {pieces} from "./Pieces";
import {CoordinatesToNumeric} from "../utils";
import {Chessboard} from "react-chessboard";
import { BoardPosition, Square } from "react-chessboard/dist/chessboard/types";
import { NumericToCoordinates } from "../utils";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';


const boardSize = 300;

type PieceNameMapType = {[piece: string] : string}
const PieceNameMap: PieceNameMapType = {wQ: "commoner", wR: "mann", wN: "unicorn", wK: "king"}
export const PieceTypeNames : string[] = ["commoner", "mann", "unicorn"]
export const PieceTypeTemplate = `
  %PIECENAME% = PieceType(
        attack = Range(%ATTACK%),
        movement = Range(%MOVEMENT%)
    )
`

const PieceInstanceTemplate = '\t\tPiece(%PIECENAME%, %Y%, %X%),'
const codeTemplate = `
def setup():

  %TYPES%

  return [
%INSTANCES%]`;



function nextCoordinate(x: number, y: number) : number[]{
    if (x == 7) {
      x = 0;
      y += 1;
    }
    else {
      x += 1;
    }
    return [x, y];
  }

function setUpInitialPosition(setBoardPosition: Function, piecesCount: number[]){
  let currentCoordinate : number[] = [0, 0]
  let position : BoardPosition = { a1 : "wK"}
  const PieceMap = ["wQ", "wR", "wN"];
  for (let i=0; i < 3; i++){
    for (let j=0; j < piecesCount[i]; j++) {
      currentCoordinate = nextCoordinate(currentCoordinate[0], currentCoordinate[1])
      let coord: string | null = NumericToCoordinates(currentCoordinate[0], currentCoordinate[1]);
      if (coord === null) continue;
      position = { ...position, [coord] : PieceMap[i]}
    }
  }

  setBoardPosition(position)
}

function onPieceDrop(sourceSquare: Square, targetSquare : Square, piece : string, setBoardPosition: Function, boardPosition: BoardPosition){
  let Coordinatetarget = CoordinatesToNumeric(targetSquare)
  // @ts-ignore
  if (Coordinatetarget[1] > 2) return false;
  else {
    let pieceInTargetSquare : string = boardPosition[targetSquare];
    let newPosition : BoardPosition = {...boardPosition, [targetSquare]: piece};
    if (pieceInTargetSquare == undefined) delete newPosition[sourceSquare];
    else newPosition[sourceSquare] = pieceInTargetSquare; 

    setBoardPosition(newPosition);
    console.log(newPosition);
    return true;
  }

}


function updateCode(setCode: Function, pieceTypeCode: string[], boardPosition: BoardPosition){
  let newCode : string = codeTemplate.replace("%TYPES%", pieceTypeCode.join("\n"))

  let instances: string[] = []
  for (let coord in boardPosition){
    let piece: string = boardPosition[coord as Square];
    let numCoord: number[] | null = CoordinatesToNumeric(coord);
    if (numCoord === null) continue;
    let instance: string = PieceInstanceTemplate.replace("%PIECENAME%", PieceNameMap[piece])
                                                .replace("%X%", numCoord[0].toString())
                                                .replace("%Y%", numCoord[1].toString())
    instances.push(instance)
  }

  newCode = newCode.replace("%INSTANCES%", instances.join("\n"))
  setCode(newCode);
}

type Props = {piecesCount: number[], pieceTypeCode: string[]}
export const DeployBoardTab : React.FC<Props> = ({piecesCount, pieceTypeCode}) => {

  const [boardPosition, setBoardPosition] = useState<BoardPosition>({});
  const [code, setCode] = useState<string>("");

  useEffect(() => setUpInitialPosition(setBoardPosition, piecesCount), [piecesCount])
  useEffect(() => updateCode(setCode, pieceTypeCode, boardPosition), [pieceTypeCode, boardPosition])


  return <div className="d-flex">
    <div>
      <p className="text-primary mx-0">Drag and Drop your pieces on the first 3 ranks to setup your starting position</p>
      <SyntaxHighlighter language="python" style={dark}>
        {code} 
      </SyntaxHighlighter>
    </div>
   <Chessboard
      boardWidth={boardSize}
      customPieces={pieces}
      position={boardPosition}
      areArrowsAllowed={false}
      onPieceDrop={(sourceSquare, targetSquare, piece) => onPieceDrop(sourceSquare, targetSquare, piece, setBoardPosition, boardPosition)}
      />
  </div>;
}
