import 'bootstrap-scss/bootstrap.scss';


import PyconIcon from "./assets/pycon.it.ico";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.scss'
import {Arrow90degLeft} from 'react-bootstrap-icons';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className='topbar bg-secondary w-100 mt-0 text-left d-flex p-2'>
        <img src={PyconIcon} className="mx-1"/>
        <a href='index.html' className='text-white px-1 mt-1 fs-4'><b>[Back <Arrow90degLeft/>]</b></a>
        <a href='https://pycon.it/en' className='text-white px-1 mt-1 fs-4'><b>[Pycon]</b></a>

    </div>

    <App />
  </React.StrictMode>,
)
