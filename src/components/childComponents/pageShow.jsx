// import { useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

import SlideShow from "./slideShow.jsx";

const Container = styled.div`
position:relative;
overflow:hidden;
width:100%;
height:100%;
z-index:0;
`
const shadowCleanAnimation = keyframes`
from{
    box-shadow: inset 0px 0px 400px 0vw #000000;
}
66%{
    box-shadow: inset 0px 0px 400px 65vw #000000;
    opacity:1;
}
to{
    opacity:0;
}
`
const ShadowBlock = styled.div`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%, -50%);
width:140vw;
height:140vw;
border-radius:50%;
box-shadow: inset 0px 0px 400px 65vw #000000;
animation-name:${({ pageZIndex }) => pageZIndex === 2 ? null : shadowCleanAnimation};
animation-duration:${({ animationTime }) => animationTime + 1}s;
animation-fill-mode:forwards;
animation-timing-function:linear;
z-index:2;
`
const fakeBookmarkAnimation = keyframes`
from{
opacity:0
}
to{
opacity:1;
}
`
const FakeBookmark = styled.div`
width:20vw;
height:5vw;
position:absolute;
left:60vw;
top:0;
background:black;
color:white;
line-height:5vw;
text-align:center;
font-size:3vw;
font-family:times new roman;
border-radius: 0 0 50% 50%;
animation-name:${({ pageZIndex }) => pageZIndex === 0 ? fakeBookmarkAnimation : null};
animation-duration:3s;
animation-fill-mode:forwards;
animation-timing-function:linear;
z-index:1;
`

let shadowShouldPlay = false;
let shadowSwitch = (pageZIndex) => {
    if (pageZIndex === 2) {
        shadowShouldPlay = true;
        shadowSwitch = () => { return };
    }
}



function PageShow({ pageZIndex, animationTime }) {

    shadowSwitch(pageZIndex)

    return (
        pageZIndex === 2 ? null :
            <Container>
                {pageZIndex===0 ? <SlideShow style={{zIndex:1}} /> : null}
                {shadowShouldPlay ?
                    <><ShadowBlock pageZIndex={pageZIndex} animationTime={animationTime} shadowShouldPlay={shadowShouldPlay} />
                    </>: null}
                        <FakeBookmark pageZIndex={pageZIndex} animationTime={animationTime}>SHOW</FakeBookmark>
            </Container>
    )
}

export default PageShow;