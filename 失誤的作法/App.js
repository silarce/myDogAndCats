import { useState } from "react";

import SlideShow from "./components/slideShow.jsx";
import Page from "./components/Page.jsx";
import HeroImage from "./components/heroImage.jsx";

import { deployPage } from "./js/deploy.js"

function App() {
  const [pageZIndex, setPageZIndex] = useState({
    mina: 2,
    gallery: 2,
    wolfy: 2,
    show: 2,
    luna: 2,
  })

  return (
    <>
      <SlideShow />
    
        <Page HeroImage={HeroImage} bookmarkName="mina" pageZIndex={pageZIndex.mina} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="pink" />
        <Page bookmarkName="gallery" pageZIndex={pageZIndex.gallery} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="green" />
        <Page bookmarkName="wolfy" pageZIndex={pageZIndex.wolfy} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="gray" />
        <Page bookmarkName="show" pageZIndex={pageZIndex.show} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="blue" />
        <Page bookmarkName="luna" pageZIndex={pageZIndex.luna} setPageZIndex={setPageZIndex} pageDeploy={deployPage} backgroundColor="orange" />
 
    </>
  );
}

export default App;
