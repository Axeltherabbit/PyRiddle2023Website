import React from 'react';

import {ArrowUpLeft, ArrowUp, ArrowUpRight, ArrowLeft, ArrowRight, ArrowDownLeft, ArrowDown, ArrowDownRight, Icon} from 'react-bootstrap-icons';
import { Button} from 'react-bootstrap';
import {reduceSum} from '../utils';

function updateMovement(current : (number | null)[][], setState: Function, x: number, y: number, increase: number){
  let new_state = [...current];
  // @ts-ignore
  if (new_state[x] !== null && new_state[x][y] !== null) new_state[x][y] = Math.min(Math.max(new_state[x][y] + increase, 0),3);
  setState(new_state);
}

function updatePiecesCount(index: number, incr: number, setPiecesCount: Function, piecesCount: number[]){
  let newPiecesCount = [...piecesCount];
  newPiecesCount[index] = Math.max(piecesCount[index]+ incr, 0);
  if (newPiecesCount.reduce(reduceSum) < 24) setPiecesCount(newPiecesCount);
}

function getIcon(icon : Icon | null){
  // @ts-ignore
  return React.createElement(icon);
}

type Props = {movements : (number | null)[][], setMovements : Function, captures : (number | null)[][], 
  setCaptures : Function, pieceSrc: string, piecesCount: number[], setPiecesCount : Function, index: number}

export const MovementsButtons : React.FC<Props> = ({movements, setMovements, captures,
  setCaptures, pieceSrc, piecesCount, setPiecesCount, index}) => {

  const Arrows = [[ArrowUpLeft, ArrowUp, ArrowUpRight], 
                  [ArrowLeft, null, ArrowRight],
                  [ArrowDownLeft, ArrowDown, ArrowDownRight]];


  return (
    <div className={`container tab-${index}`}>
      {
      [...Array(3)].map((_, i) => (
            <div key={`div${i}-{index}`} className='col d-flex justify-content-between align-items-center' >
              {
                [...Array(3)].map((_, j) => {
                  if (Arrows[i][j] === null) return (
                    <div key={`MiddleDiv-${index}`} >
                      <img src={pieceSrc} />
                      <div key={`InnerMiddleDiv-${index}`}>
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
                        <span> {getIcon(Arrows[i][j])} </span>                         
                        <span className='text-danger'>{captures[i][j]}</span>
                      </h3>
                      <div key={`divInner${i}${j}`} className='d-flex flex-row'>
                        <div>
                        <Button key={`bpm${i}${j}`} className='btn btn-success btn-sm' 
                            onClick={()=>updateMovement(movements, setMovements, i, j, 1)}>+</Button>
                        <Button key={`bpc${i}${j}`} className='btn btn-danger btn-sm'
                            onClick={()=>updateMovement(captures, setCaptures, i, j, 1)}>+</Button>
                        </div>
                        <div>
                        <Button key={`bmm${i}${j}`} className='btn btn-success btn-sm'
                            onClick={()=>updateMovement(movements, setMovements, i, j, -1)}>-</Button>
                        <Button key={`bmc${i}${j}`} className='btn btn-danger btn-sm'
                            onClick={()=>updateMovement(captures, setCaptures, i, j, -1)}>-</Button>
                        </div>
                      </div>
                    </div>);
                })
              }
            </div>
          ))
      } 
    </div>)
}
