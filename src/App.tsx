import './App.css';
import {useState} from 'react';
import { PieceTab } from './components/DisplayPieceTab';
import { Tabs, Tab, TabList, TabPanel} from 'react-tabs';
import CommonerIcon from "./assets/90px-Commoner_Transparent.svg.png"
import UnicornIcon from "./assets/Chess_Ult45.svg.png"
import MannIcon from "./assets/Chess_Mlt45.svg.png"
import 'react-tabs/style/react-tabs.css';



type Props = {src: string, alt: string, pieceCount: number}
const TabIcon : React.FC<Props> = ({src, alt, pieceCount}) => {
  return (<>
      <img src={src} alt={alt} height="32" width="32" /> 
      <span className='text-primary'>x {pieceCount}</span>
    </>);
}

function App() {

 const [tabIndex, setTabIndex] = useState<number>(0);
 const [piecesCount, setPiecesCount] = useState<number[]>([0,0,0])
 return (
    <div className="App container">
    <h1 className='text-primary'>Pycon Italia Riddle 2023</h1>
    <Tabs forceRenderTabPanel={true} selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab><TabIcon src={CommonerIcon} alt="CommonerIcon" pieceCount={piecesCount[0]} /></Tab>
          <Tab><TabIcon src={MannIcon} alt="MannIcon" pieceCount={piecesCount[1]} /></Tab>
          <Tab><TabIcon src={UnicornIcon} alt="UnicornIcon" pieceCount={piecesCount[2]} /></Tab>
        </TabList>

        <TabPanel>
          <PieceTab pieceName='wK' active={tabIndex} index={0} pieceSrc={CommonerIcon} piecesCount={piecesCount} setPiecesCount={setPiecesCount}/>
        </TabPanel>
        <TabPanel>
          <PieceTab pieceName='wR' active={tabIndex} index={1} pieceSrc={MannIcon} piecesCount={piecesCount} setPiecesCount={setPiecesCount}/>
        </TabPanel>
        <TabPanel>
          <PieceTab pieceName='wN'active={tabIndex} index={2} pieceSrc={UnicornIcon} piecesCount={piecesCount} setPiecesCount={setPiecesCount}/>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default App
