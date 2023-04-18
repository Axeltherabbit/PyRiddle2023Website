import { useState } from 'react'
import { Chessboard } from "react-chessboard";

import './App.css';
import { Square } from 'react-chessboard/dist/chessboard/types';
import {pieces} from './Pieces';
import {MovementsButtons} from './MovementsButtons';

function NumericToCoordinates(x: number, y: number){
  if (x > 7 || x < 0 || y > 7 || y < 0) return null;
  let files = "abcdefgh"
  return files[x]+String(y)
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
  const [movements, setMovements] = useState<(number | null)[][]>([[0,0,0],[0,null,0],[0,0,0]]);
  const [captures, setCaptures] = useState<(number | null)[][]>([[0,0,0],[0,null,0],[0,0,0]]);

  return (
    <div className="App container">
      <h1 className="text-primary">PyRiddle 2023</h1>


      <div className='row'>
        <div className='col'>
          <h3 className="text-primary">Movements</h3>
          <MovementsButtons movements={movements} setMovements={setMovements} captures={captures} setCaptures={setCaptures}/>
        </div>

        <div className='col'>
          <Chessboard
            position="8/8/8/3K4/8/8/8/8"
            customPieces={pieces}
            onPieceDragBegin={() => clearArrows(setArrows)}
            onPieceDragEnd={() => drawArrows(setArrows)}
            customArrows={arrows} />
          <p className='text-primary'>Drag and drop the piece around to see the squares coverage</p>
        </div>
      </div>

    </div>
  )
}

export default App
