import React, { useEffect, useState } from 'react'
import InstallScreen from "./InstallScreen";
import AppContainer from "./AppContainer";

const MobileView = () => {
  const [standaloneMode, setStandaloneMode] = useState(false);

  useEffect(() => {
    //  Check for Progressior class
    const pwa = document.getElementsByClassName("progressier-standalone")[0];
    if(pwa) {
      setStandaloneMode(true); 
    }
  }, []);

  if(standaloneMode) {
    return (
      <AppContainer />
    )
  } else {
    return (
      <InstallScreen />
    )
  }
}

export default MobileView