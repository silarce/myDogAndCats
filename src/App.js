import { useState, useEffect } from "react";

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
let pageDeploying = false;



// 1280 1366 1600 1920
// 720 768 900 1080

// 根據瀏覽器視窗寬度取得傳回show的高度
const showHeightInit = () => {
  return window.outerWidth <= 1366 ? 564 :
    window.outerWidth <= 1600 ? 660 :
      window.outerWidth <= 1920 ? 792 : 900
}

// 取得root
const root = document.getElementById("root")
let rootClientRectInit = root.getBoundingClientRect()
let timeoutId = "" //防抖用變數


function App() {
  const [pageZIndex, setPageZIndex] = useState({ ...pageZIndexInit, show: 0 })
  const [showHeight, setShowHeight] = useState(showHeightInit()) //使用slideShow px的時候才會用到
  const [rootClientRect, setRootClientRect] = useState(rootClientRectInit)

  // setRootClientRect(root.getBoundingClientRect())

  // 根據瀏覽器視窗寬度改變showHeight
  const changeShowHeightAndRootClientRect = () => {
    // setShowHeight(showHeightInit()); 使用slideShow px的時候才會用到

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setRootClientRect(root.getBoundingClientRect())
    }
      , 200)
  }
  window.addEventListener("resize", changeShowHeightAndRootClientRect)
  // 網頁剛載入的時候root的width有偏誤，因此用useEffect再抓一次
  useEffect(() => {
    changeShowHeightAndRootClientRect()    
  }, [])


  // 用來佈署page以及反佈署page
  const deployPage = (bookmarkName) => {
    if (pageDeploying) { return }
    pageDeploying = true
    setPageZIndex((preState) => {
      preState[bookmarkName] = 1
      return { ...preState }
    })
    setTimeout(() => {
      pageDeploying = false;
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
      <div>
        <Page animationTime={animationTime} bookmarkName="mina" pageZIndex={pageZIndex.mina} deployPage={deployPage} backgroundColor="pink" />
        <Page animationTime={animationTime} bookmarkName="gallery" pageZIndex={pageZIndex.gallery} deployPage={deployPage} backgroundColor="transparent" />
        <Page animationTime={animationTime} bookmarkName="wolfy" pageZIndex={pageZIndex.wolfy} deployPage={deployPage} backgroundColor="rgb(200, 200, 200)"
          rootClientRect={rootClientRect} />
        <Page animationTime={animationTime} bookmarkName="show" pageZIndex={pageZIndex.show} deployPage={deployPage} backgroundColor="black"
          showHeight={showHeight}
          rootClientRect={rootClientRect} />
        <Page animationTime={animationTime} bookmarkName="luna" pageZIndex={pageZIndex.luna} deployPage={deployPage} backgroundColor="#ffd890" />
      </div>
    </>
  );
}

export default App;
