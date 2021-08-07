import {useState} from "react";

// import SlideShow from "./components/slideShow.jsx";
import Page from "./components/Page.jsx";


import { deployPage } from "./js/deploy.js"

const animationTime = 2; //每個頁面的移動動畫標準時間

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

 // mina備選顏色#fde6ea
 // luna備選顏色#ffd890
  return (
    <>
        <Page animationTime={animationTime} bookmarkName="mina" pageZIndex={pageZIndex.mina} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="pink" />
        <Page animationTime={animationTime} bookmarkName="gallery" pageZIndex={pageZIndex.gallery} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="white" />
        <Page animationTime={animationTime} bookmarkName="wolfy" pageZIndex={pageZIndex.wolfy} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="rgb(200, 200, 200)" />
        <Page animationTime={animationTime} bookmarkName="show" pageZIndex={pageZIndex.show} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="cornflowerblue" />
        <Page animationTime={animationTime} bookmarkName="luna" pageZIndex={pageZIndex.luna} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="#ffd890" />
 
    </>
  );
}

export default App;
