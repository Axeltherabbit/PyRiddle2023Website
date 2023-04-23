import './App.css';
import {useState} from 'react';
import { PieceTab } from './components/DisplayPieceTab';
import { Tabs, Tab, TabList, TabPanel} from 'react-tabs';
import CommonerIcon from "./assets/90px-Commoner_Transparent.svg.png"
import UnicornIcon from "./assets/Chess_Ult45.svg.png"
import MannIcon from "./assets/Chess_Mlt45.svg.png"
import 'react-tabs/style/react-tabs.css';


function App() {

 const [tabIndex, setTabIndex] = useState(0);
 return (
    <div className="App container">
    <h1 className='text-primary'>Pycon Italia Riddle 2023</h1>
    <Tabs forceRenderTabPanel={true} selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab><img src={CommonerIcon} alt="CommonerIcon" height="32" width="32" /></Tab>
          <Tab><img src={MannIcon} alt="MannIcon" height="32" width="32" /></Tab>
          <Tab><img src={UnicornIcon} alt="UnicornIcon" height="32" width="32" /></Tab>
        </TabList>

        <TabPanel>
          <PieceTab pieceName='wK' active={tabIndex} index={0} pieceSrc={CommonerIcon}/>
        </TabPanel>
        <TabPanel>
          <PieceTab pieceName='wR' active={tabIndex} index={1} pieceSrc={MannIcon}/>
        </TabPanel>
        <TabPanel>
          <PieceTab pieceName='wN'active={tabIndex} index={2} pieceSrc={UnicornIcon}/>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default App
