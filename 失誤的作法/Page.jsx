import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
margin:0;
width:${props => props.stateList.containerWidth}vw;
height:100vh;
background-color:${props => props.backgroundColor};
position:absolute;
top:${props => props.stateList.containerPositionTop}vh;
left:${props => props.stateList.containerPositionLeft}vw;
z-index:${props => props.stateList.containerZIndex};
`
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
color:${(props) => { return props.bookmarkHeight === 3 ? "black" : "white" }}
`

function Page({ bookmarkName, pageZIndex, setPageZIndex, pageDeploy, backgroundColor }) {

    // positionX 根據來自父元素的bookmarkName決定初始位置
    let positionX = bookmarkName === "mina" ? 0 :
        bookmarkName === "gallery" ? 20 :
            bookmarkName === "wolfy" ? 40 :
                bookmarkName === "show" ? 60 :
                    bookmarkName === "luna" ? 80 : undefined;

    const [containerWidth, setContainerWidth] = useState(20)
    const [containerPositionTop, setContainerPositionTop] = useState(-100)
    const [containerPositionLeft, setContainerPositionLeft] = useState(positionX)

    let stateList = {
        containerWidth: containerWidth,
        containerPositionTop: containerPositionTop,
        containerPositionLeft: containerPositionLeft,
        containerZIndex: pageZIndex
    }

    // ---------------------------------------------------------------------------------------------
    // 將page回到原位
    let undeploy = () => {
        console.log("UNDEPLOY");
        setContainerWidth(20);
        setContainerPositionTop(-120);
        setContainerPositionLeft(positionX);
        let intervalId = setInterval(() => {
            setContainerPositionTop((preState) => {
                if (preState < -100) { return preState + 0.2; } else { clearInterval(intervalId); return -100 }
            })
        }, 1000 / 60);
    } // undeploy
    // ---------------------------------------------------------------------------------------------
    useEffect(() => {
        if (pageZIndex === 2) {
            undeploy();
        }
    }, [pageZIndex])
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
            <Container stateList={stateList} backgroundColor={backgroundColor}>      
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