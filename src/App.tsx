import './App.css';
import {useState} from 'react';
import { PieceTab } from './components/DisplayPieceTab';
import { Tabs, Tab, TabList, TabPanel} from 'react-tabs';
import CommonerIcon from "./assets/90px-Commoner_Transparent.svg.png"
import UnicornIcon from "./assets/Chess_Ult45.svg.png"
import MannIcon from "./assets/Chess_Mlt45.svg.png"
import 'react-tabs/style/react-tabs.css';
import {reduceSum} from "./utils"
import { DeployBoardTab } from './components/DeployBoardTab';



type Props = {src: string, alt: string, pieceCount: number}
const TabIcon : React.FC<Props> = ({src, alt, pieceCount}) => {
  return (<>
      <img src={src} alt={alt} height="32" width="32" /> 
      <span className='text-primary'>x {pieceCount}</span>
    </>);
}

function App() {

 const [tabIndex, setTabIndex] = useState<number>(0);
 const [piecesCount, setPiecesCount] = useState<number[]>([0,0,0]);
 const [points, setPoints] = useState<number[]>([0, 0, 0]);
 const [pieceTypeCode, setPieceTypeCode] = useState<string[]>(["","",""])
 return (
    <div className="App container">
    <h1 className='text-primary'>Pycon Italia Riddle 2023</h1>
    <div className='d-flex justify-content-center'>
      <h3 className={(points.reduce(reduceSum, 0) > 200) ? 'text-danger' : 'text-success'}>
          Points : {points.reduce(reduceSum, 0)}/200
      </h3>
      <h3 className='text-secondary mx-2'>
          Pieces : {piecesCount.reduce(reduceSum, 0)}/23
      </h3>
    </div>


    <Tabs forceRenderTabPanel={true} selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab><TabIcon src={CommonerIcon} alt="CommonerIcon" pieceCount={piecesCount[0]} /></Tab>
          <Tab><TabIcon src={MannIcon} alt="MannIcon" pieceCount={piecesCount[1]} /></Tab>
          <Tab><TabIcon src={UnicornIcon} alt="UnicornIcon" pieceCount={piecesCount[2]} /></Tab>
          <Tab><h4 className='text-primary'>Board Deployment</h4></Tab>
        </TabList>

        <TabPanel>
          <PieceTab pieceName='wQ' active={tabIndex} index={0} pieceSrc={CommonerIcon}
                    piecesCount={piecesCount} setPiecesCount={setPiecesCount} points={points} 
                    setPoints={setPoints} setPieceTypeCode={setPieceTypeCode} pieceTypeCode={pieceTypeCode}/>
        </TabPanel>
        <TabPanel>
          <PieceTab pieceName='wR' active={tabIndex} index={1} pieceSrc={MannIcon} 
                    piecesCount={piecesCount} setPiecesCount={setPiecesCount} points={points} 
                    setPoints={setPoints} setPieceTypeCode={setPieceTypeCode} pieceTypeCode={pieceTypeCode}/>
        </TabPanel>
        <TabPanel>
          <PieceTab pieceName='wN'active={tabIndex} index={2} pieceSrc={UnicornIcon} 
                    piecesCount={piecesCount} setPiecesCount={setPiecesCount} points={points} 
                    setPoints={setPoints} setPieceTypeCode={setPieceTypeCode} pieceTypeCode={pieceTypeCode}/> 

        </TabPanel>

        <TabPanel>
          <DeployBoardTab piecesCount={piecesCount} pieceTypeCode={pieceTypeCode}/>
        </TabPanel>

      </Tabs>
    </div>
  )
}

export default App
