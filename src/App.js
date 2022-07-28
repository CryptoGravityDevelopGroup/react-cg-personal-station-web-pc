import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import './App.css';
import Main from "./modules/main/index.tsx";

function App() {
  // 自适应
  useEffect(() => {
    window.onload = function () {
        getRem(1440, 1)
    };
    window.onresize = function () {
        console.log('asd');
        getRem(1440, 1)
    };
    
    function getRem(pwidth, prem) {
        const html = document.getElementsByTagName("html")[0];
        const oWidth = document.body.clientWidth || document.documentElement.clientWidth;
        html.style.fontSize = oWidth / pwidth * prem + "px";
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
