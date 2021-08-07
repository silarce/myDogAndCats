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
        width:20vw;
        transform:translate(0vw, 0vh);
    }
    50%{
        width:20vw;;
        transform:translate(0vw, 100vh);
    }
    to{
        width:100vw;
        transform:translate(${theName === "mina" ? 0 :
        theName === "gallery" ? -20 :
            theName === "wolfy" ? -40 :
                theName === "show" ? -60 : -80}vw, 100vh);
    }
    `
const undeployAnimation = keyframes`
    from{
        transform:translate(0vw,-20vh)
    }
    to{
        transform:translate(0vw,0vh)
    }
    `
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
transform:translate(0vw, 0vh);
z-index:${props => props.stateList.containerZIndex};
animation-name:${({ stateList, bookmarkName }) => stateList.containerZIndex === 1 || stateList.containerZIndex === 0 ? deployAnimation(bookmarkName) : undeployAnimation};
animation-duration:2s;
animation-fill-mode: forwards;
animation-timing-function:linear;
`
// left:${props => props.stateList.containerPositionLeft}vw;
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


function Page({animationTime, bookmarkName, pageZIndex, setPageZIndex, pageDeploy, backgroundColor }) {

    // positionX 根據來自父元素的bookmarkName決定初始位置
    let positionX = bookmarkName === "mina" ? 0 :
        bookmarkName === "gallery" ? 20 :
            bookmarkName === "wolfy" ? 40 :
                bookmarkName === "show" ? 60 :
                    bookmarkName === "luna" ? 80 : undefined;


    const [containerWidth, setContainerWidth] = useState(100)
    const [containerPositionTop, setContainerPositionTop] = useState(0)
    const [containerPositionLeft, setContainerPositionLeft] = useState(positionX)

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

    return (
        <>
            <Container stateList={stateList} backgroundColor={backgroundColor} bookmarkName={bookmarkName}>
                <Suspense fallback={<div>讀取中</div>}>
                    {bookmarkName === "mina" && (<PageMina pageWidth={containerWidth} pagePositionTop={containerPositionTop} backgroundColor={backgroundColor} pageZIndex={pageZIndex} animationTime={animationTime} />)}
                    {bookmarkName === "wolfy" && (<PageWolfy pageWidth={containerWidth} pagePositionTop={containerPositionTop} backgroundColor={backgroundColor} pageZIndex={pageZIndex} animationTime={animationTime} />)}
                    {bookmarkName === "luna" && (<PageLuna pageWidth={containerWidth} pagePositionTop={containerPositionTop} backgroundColor={backgroundColor} pageZIndex={pageZIndex} animationTime={animationTime} />)}
                    {bookmarkName === "show" && (<PageShow pageWidth={containerWidth} pagePositionTop={containerPositionTop} backgroundColor={backgroundColor} pageZIndex={pageZIndex} animationTime={animationTime} />)}
                </Suspense>
                <PageBookmark
                    onClick={() => {
                        (pageDeploy(bookmarkName, setPageZIndex,
                            setContainerPositionTop, setContainerWidth, setContainerPositionLeft))
                    }}
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