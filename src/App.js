import {useState} from "react";

import SlideShow from "./components/slideShow.jsx";
import Page from "./components/Page.jsx";


import { deployPage } from "./js/deploy.js"


function App() {
  const [pageZIndex, setPageZIndex] = useState({
    mina: 2,
    gallery: 2,
    wolfy: 2,
    show: 2,
    luna: 2,
  })
 //為了開發方便，開發時要把非正在開發的Page註解掉
 // 開發完後再調整回來
  return (
    <>
      <SlideShow />    
        <Page bookmarkName="mina" pageZIndex={pageZIndex.mina} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="#fde6ea" />
        <Page bookmarkName="gallery" pageZIndex={pageZIndex.gallery} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="green" />
        <Page bookmarkName="wolfy" pageZIndex={pageZIndex.wolfy} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="gray" />
        <Page bookmarkName="show" pageZIndex={pageZIndex.show} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="blue" />
        <Page bookmarkName="luna" pageZIndex={pageZIndex.luna} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="#ffd890" />
 
    </>
  );
}

export default App;
