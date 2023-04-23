import React from 'react';

import {ArrowUpLeft, ArrowUp, ArrowUpRight, ArrowLeft, ArrowRight, ArrowDownLeft, ArrowDown, ArrowDownRight} from 'react-bootstrap-icons';
import { Button} from 'react-bootstrap';

function updateMovement(current : (number | null)[][], setState: Function, x: number, y: number, increase: number){
  let new_state = [...current];
  if (new_state[x] !== null && new_state[x][y] !== null) new_state[x][y] = Math.min(Math.max(new_state[x][y] + increase, 0),7);
  setState(new_state);
}

function updatePiecesCount(index: number, incr: number, setPiecesCount: Function, piecesCount: number[]){
  let newPiecesCount = [...piecesCount]
  newPiecesCount[index] += incr
  setPiecesCount(newPiecesCount)
}
type Props = {movements : (number | null)[][], setMovements : Function, captures : (number | null)[][], 
  setCaptures : Function, pieceSrc: string, piecesCount: number[], setPiecesCount : Function, index: number}

export const MovementsButtons : React.FC<Props> = ({movements, setMovements, captures,
  setCaptures, pieceSrc, piecesCount, setPiecesCount, index}) => {

  const Arrows = [[ArrowUpLeft, ArrowUp, ArrowUpRight], 
                  [ArrowLeft, null, ArrowRight],
                  [ArrowDownLeft, ArrowDown, ArrowDownRight]];

  return (
    <div className='container'>
      {
      [...Array(3)].map((_, i) => (
            <div key={`div${i}`} className='col d-flex justify-content-between align-items-center' >
              {
                [...Array(3)].map((_, j) => {
                  if (Arrows[i][j] === null) return (
                    <div key="MiddleDiv" >
                      <img src={pieceSrc} />
                      <div key="InnerMiddleDiv">
                        <Button className='btn btn-secondary btn-sm' 
                            onClick={()=> updatePiecesCount(index, 1, setPiecesCount, piecesCount)}>+</Button>
                        <Button className='btn btn-secondary btn-sm'
                            onClick={()=> updatePiecesCount(index, -1, setPiecesCount, piecesCount)}>-</Button>
                      </div>
                    </div>
                  )
                  else return (
                    <div key={`div${i}${j}`} className='mx-1'>
                      <h3  className='text-primary'>
                        <span className='text-success'>{movements[i][j]}</span> 
                        <span> {React.createElement(Arrows[i][j])} </span>
                        <span className='text-danger'>{captures[i][j]}</span>
                      </h3>
                      <div key={`divInner${i}${j}`} className='col'>
                        <Button key={`bpm${i}${j}`} className='btn btn-success btn-sm' 
                            onClick={()=>updateMovement(movements, setMovements, i, j, 1)}>+</Button>
                        <Button key={`bpc${i}${j}`} className='btn btn-danger btn-sm'
                            onClick={()=>updateMovement(captures, setCaptures, i, j, 1)}>+</Button>
                        <Button key={`bmm${i}${j}`} className='btn btn-success btn-sm'
                            onClick={()=>updateMovement(movements, setMovements, i, j, -1)}>-</Button>
                        <Button key={`bmc${i}${j}`} className='btn btn-danger btn-sm'
                            onClick={()=>updateMovement(captures, setCaptures, i, j, -1)}>-</Button>
                      </div>
                    </div>);
                })
              }
            </div>
          ))
      } 
    </div>)
}
