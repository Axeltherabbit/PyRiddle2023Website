import { useState } from 'react';
import React from 'react';

import {ArrowUpLeft, ArrowUp, ArrowUpRight, ArrowLeft, ArrowRight, ArrowDownLeft, ArrowDown, ArrowDownRight} from 'react-bootstrap-icons';
import { Button, Form } from 'react-bootstrap';

function updateMovement(current : (number | null)[][], setState: Function, x: number, y: number, toggle : boolean){
  let increase = toggle ? 1 : -1 ;
  let new_state = [...current];
  if (new_state[x] !== null && new_state[x][y] !== null) new_state[x][y] = Math.min(Math.max(new_state[x][y] + increase, 0),7);
  setState(new_state);
}


type Props = {movements : (number | null)[][], setMovements : Function, captures : (number | null)[][], 
  setCaptures : Function}

export const MovementsButtons : React.FC<Props> = ({movements, setMovements, captures, 
  setCaptures}) => {
  const [toggle, setToggle] = useState<boolean>(true);
    
  const Arrows = [[ArrowUpLeft, ArrowUp, ArrowUpRight], [ArrowLeft, null, ArrowRight], [ArrowDownLeft, ArrowDown, ArrowDownRight]];
  return (
    <div className='container'>
      {
      [...Array(3)].map((_, i) => (
            <div key={`div${i}`} className='col d-flex justify-content-between' >
              {
                [...Array(3)].map((_, j) => {
                  if (Arrows[i][j] === null) return ( // middle toggle switch
                  <Form.Group key="switch" className={toggle ? "text-success" : "text-danger"}>
                    <Form.Check
                      type="switch"
                      defaultChecked
                      label= {toggle ? "increase" : "Reduce"}
                      onChange={() => setToggle(!toggle)}
                    />
                  </Form.Group>);

                  return (<div key={`div${i}${j}`}>
                    <Button key={`bs${i}${j}`} className='btn btn-success' onClick={()=>updateMovement(movements, setMovements, i, j, toggle)}>{React.createElement(Arrows[i][j])}{movements[i][j]}</Button> 
                    <Button key={`bd${i}${j}`} className='btn btn-danger' onClick={()=>updateMovement(captures, setCaptures, i, j, toggle)}>{React.createElement(Arrows[i][j])}{captures[i][j]}</Button>
                    </div>);
                })
              }
            </div>
          ))
      } 
    </div>)
}
