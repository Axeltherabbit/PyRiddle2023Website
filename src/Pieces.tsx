// Icons taken from https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces
import CommonerIcon from "./assets/90px-Commoner_Transparent.svg.png"
import UnicornIcon from "./assets/Chess_Ult45.svg.png"
import MannIcon from "./assets/Chess_Mlt45.svg.png"

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
export var pieces = {
  wK: customPiece(CommonerIcon, "Commoner"),
  wR: customPiece(MannIcon, "Mann"),
  wN: customPiece(UnicornIcon, "Unicorn"),
}


