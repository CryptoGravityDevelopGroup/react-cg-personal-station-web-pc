import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from "react";
import './App.css';
import Main from "./modules/main/index.tsx";
import Inituser from "./modules/inituser/index.tsx";
import NftDetail from "./modules/nftDetail/index.tsx";
import Profile from "./modules/profile/index.tsx";
import TokenDetail from "./modules/tokenDetail/index.tsx";

function App() {
  console.log('2.54')
  // 自适应
  useEffect(() => {
    window.onload = function () {
        getRem(1440, 1)
    };
    window.onresize = function () {
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
        <Route path="/inituser" element={<Inituser/>}/>
        <Route path="/nftDetial" element={<NftDetail/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/tokenDetail" element={<TokenDetail/>}/>
        <Route path="*" element={<Navigate to="/main"/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
