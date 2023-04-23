import React from 'react';

import {ArrowUpLeft, ArrowUp, ArrowUpRight, ArrowLeft, ArrowRight, ArrowDownLeft, ArrowDown, ArrowDownRight} from 'react-bootstrap-icons';
import { Button} from 'react-bootstrap';

function updateMovement(current : (number | null)[][], setState: Function, x: number, y: number, increase: number){
  let new_state = [...current];
  if (new_state[x] !== null && new_state[x][y] !== null) new_state[x][y] = Math.min(Math.max(new_state[x][y] + increase, 0),7);
  setState(new_state);
}


type Props = {movements : (number | null)[][], setMovements : Function, captures : (number | null)[][], 
  setCaptures : Function, pieceSrc: string}

export const MovementsButtons : React.FC<Props> = ({movements, setMovements, captures, setCaptures, pieceSrc}) => {
  const Arrows = [[ArrowUpLeft, ArrowUp, ArrowUpRight], [ArrowLeft, null, ArrowRight], [ArrowDownLeft, ArrowDown, ArrowDownRight]];
  return (
    <div className='container'>
      {
      [...Array(3)].map((_, i) => (
            <div key={`div${i}`} className='col d-flex justify-content-between' >
              {
                [...Array(3)].map((_, j) => {
                  if (Arrows[i][j] === null) return (
                    <div>
                      <img src={pieceSrc}></img>
                    </div>
                  )
                  else return (
                    <div key={`div${i}${j}`} className='mx-1'>
                      <h3 className='text-primary'>
                        <span className='text-success'>{movements[i][j]}</span> 
                        <span> {React.createElement(Arrows[i][j])} </span>
                        <span className='text-danger'>{captures[i][j]}</span>
                      </h3>
                      <div key={`divInner${i}${j}`} className='col'>
                        <Button key={`bpm${i}${j}`} className='btn btn-success btn-sm' 
                            onClick={()=>updateMovement(movements, setMovements, i, j, 1)}>+</Button>
                        <Button key={`bmc${i}${j}`} className='btn btn-danger btn-sm'
                            onClick={()=>updateMovement(captures, setCaptures, i, j, 1)}>+</Button>
                        <Button key={`bpm${i}${j}`} className='btn btn-success btn-sm'
                            onClick={()=>updateMovement(movements, setMovements, i, j, -1)}>-</Button>
                        <Button key={`bpc${i}${j}`} className='btn btn-danger btn-sm'
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
