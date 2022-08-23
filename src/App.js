import { useState, useEffect } from "react"
import { Switch } from 'antd';

import { AppLogo } from './components/AppLogo'
import { MainMenu } from './components/MainMenu'
import blockMutualDark from './icon/blockMutualDark.png';

import 'antd/dist/antd.min.css';
import './App.css';

function App() {
  const [mode,setmode] = useState("light")
  const [screen,setScreen] = useState(1)

    useEffect(() => {
    //Redirects to Main menu after 3 seconds
    setTimeout(() => {
      setScreen(2)
    },3000)
  },[])

  const onChange = (checked) => {
    if(checked)
      setmode("dark")
    else
      setmode("light")
  };

  return (
    <div className={`${mode} App`}>
      <div className="header-part">
        <div className="logomain">
         <img src={blockMutualDark} className="App-logo" alt="logo" />
        </div>
        <div className="switch-btn">
          <Switch 
            defaultmode={mode === "dark"} 
            onChange={onChange} 
            checkedChildren={"Dark"}
            unCheckedChildren={"light"}
          />
        </div>
      </div>
      
      <div className="tablebox-data">{screen === 1 ? <AppLogo mode={mode}/> : <MainMenu/>}</div>

      <div className="footercopy">
        © 2022 Block Mutual Fund. All Rights Reserved.
      </div>
    </div>
  );
}

export default App;
