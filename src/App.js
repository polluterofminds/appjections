import React, { useEffect, useState } from "react";
import "./App.css";
import MobileView from "./components/MobileView";
import DesktopView from "./components/DesktopView";

function App() {
  const [mobile, setMobile] = useState(true);
  useEffect(() => {
    const isMobile = () =>
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    setMobile(isMobile());
  }, []);

  if (mobile) {
    return <MobileView />;
  } else {
    return <DesktopView />;
  }
}

export default App;
