import { useState } from "react";

// import SlideShow from "./components/slideShow.jsx";
import Page from "./components/Page.jsx";

const animationTime = 2; //每個頁面的移動動畫標準時間


const pageZIndexInit = {
  mina: 2,
  gallery: 2,
  wolfy: 2,
  show: 2,
  luna: 2,
}

function App() {
  const [pageZIndex, setPageZIndex] = useState({...pageZIndexInit})

  // 用來佈署page以及反佈署page
  const deployPage = (bookmarkName) => {
    setPageZIndex((preState) => {
        preState[bookmarkName] = 1
        return { ...preState }
    })
    setTimeout(() => {
        setPageZIndex(() => {
            let pageZIndexInited = { ...pageZIndexInit }
            pageZIndexInited[bookmarkName] = 0
            return pageZIndexInited
        })
    }, animationTime * 1000);
} 
  // mina備選顏色#fde6ea
  // luna備選顏色#ffd890
  return (
    <>
      <Page animationTime={animationTime} bookmarkName="mina" pageZIndex={pageZIndex.mina} deployPage={deployPage} backgroundColor="pink" />
      <Page animationTime={animationTime} bookmarkName="gallery" pageZIndex={pageZIndex.gallery} deployPage={deployPage} backgroundColor="white" />
      <Page animationTime={animationTime} bookmarkName="wolfy" pageZIndex={pageZIndex.wolfy} deployPage={deployPage} backgroundColor="rgb(200, 200, 200)" />
      <Page animationTime={animationTime} bookmarkName="show" pageZIndex={pageZIndex.show} deployPage={deployPage} backgroundColor="cornflowerblue" />
      <Page animationTime={animationTime} bookmarkName="luna" pageZIndex={pageZIndex.luna} deployPage={deployPage} backgroundColor="#ffd890" />

    </>
  );
}

export default App;
