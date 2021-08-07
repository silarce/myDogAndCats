// 為了開發方便，開發時會將一個useEffect註解掉
// 開發結束後要調回來

import React, { useState, useEffect, lazy, Suspense } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const PageMina = lazy(() => { return import("./childComponents/pageMina.jsx") })
const PageWolfy = lazy(() => { return import("./childComponents/pageWolfy.jsx") })
const PageLuna = lazy(() => { return import("./childComponents/pageLuna.jsx") })
const PageShow = lazy(() => { return import("./childComponents/pageShow.jsx") })




const deployAnimation = (theName) => keyframes`
    from{
        top:-100vh;
        width:20vw;
        left:${theName === "mina" ? 0 :
        theName === "gallery" ? 20 :
            theName === "wolfy" ? 40 :
                theName === "show" ? 60 : 80}vw;
        z-index:1;
    }
    50%{
        top:0;
        width:20vw;
        left:${theName === "mina" ? 0 :
        theName === "gallery" ? 20 :
            theName === "wolfy" ? 40 :
                theName === "show" ? 60 : 80}vw;
    }
    99.99%{
        z-index:1;
    }
    to{
        top:0vh;
        width:100vw;
        left:0;
        z-index:0;
    }
    `
// top初始值為-100，然後逐漸降為0
// left一值為0
// width初始值為20vw,漸變為100vw
const Container = styled.div`
margin:0;
width:20vw;
height:100vh;
background-color:${props => props.backgroundColor};
position:absolute;
top:-100vh;
left:${({ bookmarkName }) => bookmarkName === "mina" ? 0 :
        bookmarkName === "gallery" ? 20 :
            bookmarkName === "wolfy" ? 40 :
                bookmarkName === "show" ? 60 : 80}vw;
z-index:2;
animation-name:${({ pageDeployState, bookmarkName }) => pageDeployState === "deployed" ? deployAnimation(bookmarkName) : null};
animation-duration:2s;
animation-fill-mode: forwards;
animation-timing-function:linear;
`
// const Container = styled.div`
// margin:0;
// width:${props => props.stateList.containerWidth}vw;
// height:100vh;
// background-color:${props => props.backgroundColor};
// position:absolute;
// top:${props => props.stateList.containerPositionTop}vh;
// left:${props => props.stateList.containerPositionLeft}vw;
// z-index:${props => props.stateList.containerZIndex};
// `
const PageBookmark = styled.div`
width:20vw;
height:${props => props.bookmarkHeight}vw;
line-height:${props => props.bookmarkHeight}vw;
background:${props => props.backgroundColor};
position:absolute;
bottom:-${props => props.bookmarkHeight}vw;
border-radius: 0 0 50% 50%;
text-align:center;
transition:0.5s;
&:hover{
    color:white;
}
font-size:3vw;
`


function Page({ bookmarkName, pageZIndex, setPageZIndex, pageDeploy, backgroundColor }) {

    // positionX 根據來自父元素的bookmarkName決定初始位置
    let positionX = bookmarkName === "mina" ? 0 :
        bookmarkName === "gallery" ? 20 :
            bookmarkName === "wolfy" ? 40 :
                bookmarkName === "show" ? 60 :
                    bookmarkName === "luna" ? 80 : undefined;


    const [containerWidth, setContainerWidth] = useState(100)
    const [containerPositionTop, setContainerPositionTop] = useState(0)
    const [containerPositionLeft, setContainerPositionLeft] = useState(positionX)
    // ---------------------------------------------------------------------------
    const [pageDeployState, setPageDeployState] = useState("undeployed")


    // ---------------------------------------------------------------------------

    let stateList = {
        containerWidth: containerWidth,
        containerPositionTop: containerPositionTop,
        containerPositionLeft: containerPositionLeft,
        containerZIndex: pageZIndex
    }

    // ---------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------
    // 將該page反部屬，也就是回到原位
    // 將該page反部屬，也就是回到原位
    useEffect(() => {
        if (pageZIndex === 2) {
            setContainerWidth(20);
            setContainerPositionTop(-120);
            setContainerPositionLeft(positionX);
            let intervalId = setInterval(() => {
                setContainerPositionTop((preState) => {
                    if (preState < -100) { return preState + 0.2; } else { clearInterval(intervalId); return -100 }
                })
            }, 1000 / 60);
        }
    }, [pageZIndex, positionX])
    // ---------------------------------------------------------------------------------------------
    const [bookmarkHeight, setBookmarkHeight] = useState(3)
    const addBookmarkHeight = () => {
        setBookmarkHeight(5)
    }
    const resetBookmarkHeight = () => {
        setBookmarkHeight(3)
    }
    const pageDeploy2 = () => {
        setPageDeployState("deployed")
    }
    return (
        <>
            <Container stateList={stateList} backgroundColor={backgroundColor} bookmarkName={bookmarkName} pageDeployState={pageDeployState}>
                <Suspense fallback={<div>讀取中</div>}>
                    {bookmarkName === "mina" && (<PageMina pageWidth={containerWidth} pagePositionTop={containerPositionTop} backgroundColor={backgroundColor} pageZIndex={pageZIndex} />)}
                    {bookmarkName === "wolfy" && (<PageWolfy pageWidth={containerWidth} pagePositionTop={containerPositionTop} backgroundColor={backgroundColor} pageZIndex={pageZIndex} />)}
                    {bookmarkName === "luna" && (<PageLuna pageWidth={containerWidth} pagePositionTop={containerPositionTop} backgroundColor={backgroundColor} pageZIndex={pageZIndex} />)}
                    {bookmarkName === "show" && (<PageShow pageWidth={containerWidth} pagePositionTop={containerPositionTop} backgroundColor={backgroundColor} pageZIndex={pageZIndex} />)}
                </Suspense>
                <PageBookmark
                    onClick={pageDeploy2}
                    // onClick={() => {
                    //     (pageDeploy(bookmarkName, setPageZIndex,
                    //         setContainerPositionTop, setContainerWidth, setContainerPositionLeft))
                    // }}
                    onMouseEnter={addBookmarkHeight}
                    onMouseLeave={resetBookmarkHeight}
                    className="pageBookmark"
                    bookmarkHeight={bookmarkHeight}
                    backgroundColor={backgroundColor}>{bookmarkName.toUpperCase()}</PageBookmark>
            </Container>

        </>
    )

}

export default Page;