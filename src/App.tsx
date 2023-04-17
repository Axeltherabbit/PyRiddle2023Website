import { useState } from 'react'
import { Chessboard } from "react-chessboard";


// Icons taken from https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces
import CommonerIcon from "./assets/90px-Commoner_Transparent.svg.png"
import UnicornIcon from "./assets/Chess_Ult45.svg.png"
import MannIcon from "./assets/Chess_Mlt45.svg.png"



import './App.css'
import { Square } from 'react-chessboard/dist/chessboard/types';

interface customPieceArgs {
  squareWidth: number,
  isDragging: boolean
}

function customPiece(icon: string, tag: string) {
  return ({ squareWidth, isDragging }: customPieceArgs) => (
    <img
      style={{
        width: isDragging ? squareWidth * 1.75 : squareWidth,
        height: isDragging ? squareWidth * 1.75 : squareWidth
      }}
      src={icon}
      alt={tag}
    />)
}
var pieces = {
  wK: customPiece(CommonerIcon, "Commoner"),
  wR: customPiece(MannIcon, "Mann"),
  wN: customPiece(UnicornIcon, "Unicorn"),
}


function clearArrows(setArrows: Function) {
  setArrows([]);
  console.log("clearing arrows");
}


function drawArrows(setArrows: Function) {
  setArrows([['a3', 'a5'], ['g1', 'f3']]);
  console.log("drawing arrows");
}


function App() {
  const [arrows, setArrows] = useState<Square[][]>([]);
  return (
    <div className="App">
      <h1 class="text-primary">PyRiddle 2023</h1>
      <Chessboard
        position="8/8/8/3K4/8/8/8/8"
        customPieces={pieces}
        onPieceDragBegin={() => clearArrows(setArrows)}
        onPieceDragEnd={() => drawArrows(setArrows)}
        customArrows={arrows} />
      <p>Drag and drop the piece around to see the squares coverage</p>
    </div>
  )
}

export default App
