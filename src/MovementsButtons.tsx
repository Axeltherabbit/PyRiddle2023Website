import { useState } from 'react';
import React from 'react';

import {ArrowUpLeft, ArrowUp, ArrowUpRight, ArrowLeft, ArrowRight, ArrowDownLeft, ArrowDown, ArrowDownRight} from 'react-bootstrap-icons';
import { Button, Form } from 'react-bootstrap';



export function MovementsButtons(){
  const [toggle, setToggle] = useState<boolean>(true);
  const [movements, setMovements] = useState<(number | null)[][]>([[0,1,0],[0,null,0],[0,2,0]]);
  const [captures, setCaptures] = useState<(number | null)[][]>([[0,0,0],[0,null,0],[0,0,0]]);
  
  const Arrows = [[ArrowUpLeft, ArrowUp, ArrowUpRight], [ArrowLeft, null, ArrowRight], [ArrowDownLeft, ArrowDown, ArrowDownRight]];
  return (
    <div className='container'>
      {
      [...Array(3)].map((_, i) => (
            <div className='col d-flex justify-content-between' >
              {
                [...Array(3)].map((_, j) => {
                  if (Arrows[i][j] === null) return ( // middle toggle switch
                  <Form.Group className={toggle ? "text-danger" : "text-success"}>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label= {toggle ? "Reduce" : "Increase"}
                      onChange={() => setToggle(!toggle)}
                    />
                  </Form.Group>);

                  return (<div>
                    <Button className='btn btn-success'>{React.createElement(Arrows[i][j])}{movements[i][j]}</Button> 
                    <Button className='btn btn-danger'>{React.createElement(Arrows[i][j])}{captures[i][j]}</Button>
                    </div>);
                })
              }
            </div>
          ))
      } 
    </div>)
}
