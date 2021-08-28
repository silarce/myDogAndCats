

import React, { lazy, Suspense } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const PageMina = lazy(() => { return import("./childComponents/pageMina.jsx") })
const PageGallery = lazy(() => { return import("./childComponents/pageGallery.jsx") })
const PageWolfy = lazy(() => { return import("./childComponents/pageWolfy.jsx") })
const PageLuna = lazy(() => { return import("./childComponents/pageLuna.jsx") })
const PageShow = lazy(() => { return import("./childComponents/pageShow.jsx") })

const deployAnimation = (theName,rootClientRect) => {
    return theName === "mina" || theName === "luna" || theName === "wolfy" ?
        keyframes`
    from{
        width:20vw;
        transform:translate(0vw, 0vh);
    }
    60%{
        width:20vw;;
        transform:translate(0vw, 100vh);
    }
    to{
        width:100vw;
        transform:translate(${theName === "mina" ? 0 :
                theName === "wolfy" ? -40 : -80}vw, 100vh);
    }
    `
        : theName === "show" ? keyframes`
    from{ transform:translate(-${parseInt(rootClientRect.width*0.6)}px,100vh); }
    to{transform:translate(-${parseInt(rootClientRect.width*0.6)}px,100vh);}`
            : keyframes`
    from{ 
        transform:translate(-20vw,100vh);
     }
    to{
        transform:translate(-20vw,100vh);
    }`
}
const undeployAnimation = keyframes`
    from{
        transform:translate(0vw,-20vh)
    }
    to{
        transform:translate(0vw,0vh)
    }
    `
// 五個page都用keyframes展開
const Container = styled.div`
margin:0;
width:${({ bookmarkName }) => bookmarkName === "show" || bookmarkName === "gallery" ? 100 : 20}vw;
height:100vh;
background-color:${({ backgroundColor, bookmarkName }) => bookmarkName === "show" ? "transparent" : backgroundColor};
position:absolute;
top:-100vh;
left:${({ bookmarkName }) => bookmarkName === "mina" ? 0 :
        bookmarkName === "gallery" ? 20 :
            bookmarkName === "wolfy" ? 40 :
                bookmarkName === "show" ? 60 : 80}vw;
transform:translate(0vw, 0vh);
z-index:${({ pageZIndex }) => pageZIndex};
animation-name:${({ pageZIndex, bookmarkName, rootClientRect }) => pageZIndex === 2 ? undeployAnimation : deployAnimation(bookmarkName,rootClientRect)};
animation-duration:${({ animationTime }) => animationTime}s;
animation-fill-mode: forwards;
animation-timing-function:linear;
`
const PageBookmark = styled.div`
width:20vw;
height:3vw;
background:${({ backgroundColor, bookmarkName }) => bookmarkName === "gallery" ? "white" : backgroundColor};
color:${({ backgroundColor }) => backgroundColor === "black" ? "white" : "black"};
position:absolute;
bottom:-3vw;
font-size:3vw;
line-height:3vw;
text-align:center;
font-family:times new roman;
border-radius: 0 0 50% 50%;
cursor: pointer;
transition:0.5s;
&:hover{
    color:${({ bookmarkName }) => bookmarkName === "gallery" ? "black" : "white"} ;
    height:5vw;
    line-height:5vw;
    bottom:-5vw;
}
`

function Page({ animationTime, bookmarkName, pageZIndex, deployPage, backgroundColor, showHeight, rootClientRect }) {

    return (
        <>
            <Container pageZIndex={pageZIndex} backgroundColor={backgroundColor} bookmarkName={bookmarkName}
                animationTime={animationTime} rootClientRect={rootClientRect}>
                <Suspense fallback={<div>讀取中</div>}>
                    {bookmarkName === "mina" && (<PageMina backgroundColor={backgroundColor} pageZIndex={pageZIndex} animationTime={animationTime} />)}
                    {bookmarkName === "gallery" && (<PageGallery backgroundColor={backgroundColor} pageZIndex={pageZIndex} animationTime={animationTime} />)}
                    {bookmarkName === "wolfy" && (<PageWolfy backgroundColor={backgroundColor} pageZIndex={pageZIndex} animationTime={animationTime}/>)}
                    {bookmarkName === "luna" && (<PageLuna backgroundColor={backgroundColor} pageZIndex={pageZIndex} animationTime={animationTime} />)}
                    {bookmarkName === "show" && (<PageShow backgroundColor={backgroundColor} pageZIndex={pageZIndex} animationTime={animationTime} showHeight={showHeight} />)}
                </Suspense>
                <PageBookmark
                    onClick={() => { deployPage(bookmarkName) }}
                    backgroundColor={backgroundColor}
                    pageZIndex={pageZIndex}
                    bookmarkName={bookmarkName}
                >{bookmarkName.toUpperCase()}</PageBookmark>
            </Container>

        </>
    )

}

export default Page;