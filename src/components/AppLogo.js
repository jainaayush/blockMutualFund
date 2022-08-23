import blockMutualLight from '../icon/blockMutualLight.png';
import blockMutualDark from '../icon/blockMutualDark.png'

import '../App.css';

export const AppLogo = ({ mode }) => {
  return (
    <div className="App-header" >
      <img src={mode === "dark" ? blockMutualDark : blockMutualLight} className="App-logo" alt="logo" />
    </div> 
  );
}

