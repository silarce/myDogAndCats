// 為了開發方便，開發時會將一個useEffect註解掉
// 開發結束後要調回來

import React, { lazy, Suspense } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const PageMina = lazy(() => { return import("./childComponents/pageMina.jsx") })
const PageGallery = lazy(() => { return import("./childComponents/pageGallery.jsx") })
const PageWolfy = lazy(() => { return import("./childComponents/pageWolfy.jsx") })
const PageLuna = lazy(() => { return import("./childComponents/pageLuna.jsx") })
const PageShow = lazy(() => { return import("./childComponents/pageShow.jsx") })

const deployAnimation = (theName) => {
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
    from{ transform:translate(-60vw,100vh); }
    to{transform:translate(-60vw,100vh);}`
            : keyframes`
    from{ transform:translate(-20vw,100vh); }
    to{transform:translate(-20vw,100vh);}`
}
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
animation-name:${({ pageZIndex, bookmarkName }) => pageZIndex === 2 ? undeployAnimation : deployAnimation(bookmarkName)};
animation-duration:${({ animationTime }) => animationTime}s;
animation-fill-mode: forwards;
animation-timing-function:linear;
`
const PageBookmark = styled.div`
width:20vw;
height:3vw;
line-height:3vw;
background:${({ backgroundColor }) => backgroundColor};
color:${({ backgroundColor }) => backgroundColor === "black" ? "white" : "black"};
position:absolute;
bottom:-3vw;
border-radius: 0 0 50% 50%;
text-align:center;
transition:0.5s;
&:hover{
    color:white;
    height:5vw;
    line-height:5vw;
    bottom:-5vw;
}
font-size:3vw;
cursor: pointer;
`



function Page({ animationTime, bookmarkName, pageZIndex, deployPage, backgroundColor }) {
    // 這幾行都用不到了，但還是暫時先留著好了
    // const [containerWidth, setContainerWidth] = useState(100)
    // const [containerPositionTop, setContainerPositionTop] = useState(0)
    // const [containerPositionLeft, setContainerPositionLeft] = useState(positionX)
    // let stateList = {
    // containerWidth: containerWidth,
    // containerPositionTop: containerPositionTop,
    // containerPositionLeft: containerPositionLeft,
    // containerZIndex: pageZIndex
    // }

    // ---------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------
    // 將該page反部屬，也就是回到原位
    // 將該page反部屬，也就是回到原位
    // 用不到了，但還是暫時先留著好了
    // useEffect(() => {
    //     if (pageZIndex === 2) {
    //         setContainerWidth(20);
    //         setContainerPositionTop(-120);
    //         setContainerPositionLeft(positionX);
    //         let intervalId = setInterval(() => {
    //             setContainerPositionTop((preState) => {
    //                 if (preState < -100) { return preState + 0.2; } else { clearInterval(intervalId); return -100 }
    //             })
    //         }, 1000 / 60);
    //     }
    // }, [pageZIndex, positionX])
    // ---------------------------------------------------------------------------------------------

    return (
        <>
            <Container pageZIndex={pageZIndex} backgroundColor={backgroundColor} bookmarkName={bookmarkName} animationTime={animationTime}>
                <Suspense fallback={<div>讀取中</div>}>
                    {bookmarkName === "mina" && (<PageMina backgroundColor={backgroundColor} pageZIndex={pageZIndex} animationTime={animationTime} />)}
                    {bookmarkName === "gallery" && (<PageGallery backgroundColor={backgroundColor} pageZIndex={pageZIndex} animationTime={animationTime} />)}
                    {bookmarkName === "wolfy" && (<PageWolfy backgroundColor={backgroundColor} pageZIndex={pageZIndex} animationTime={animationTime} />)}
                    {bookmarkName === "luna" && (<PageLuna backgroundColor={backgroundColor} pageZIndex={pageZIndex} animationTime={animationTime} />)}
                    {bookmarkName === "show" && (<PageShow backgroundColor={backgroundColor} pageZIndex={pageZIndex} animationTime={animationTime} />)}
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
// 用不到了，但暫時先留著好了
// onClick={() => {
//     (pageDeploy(bookmarkName, setPageZIndex,
//         setContainerPositionTop, setContainerWidth, setContainerPositionLeft))
// }}

export default Page;