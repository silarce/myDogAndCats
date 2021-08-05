import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import wolfyPaw from "../../../img/Wolfy_paw.jpg"

const deployAnimate = keyframes`
from,11%{
    height:0vh;
}
67%,to{
    height:100vh
}
`

const Container = styled.div`
width:100%;
height:100vh;
padding:0 20vw 0 20vw;
position:absolute;
bottom:0;
z-index:${({childPageZIndex})=>childPageZIndex};
background-color:${({ staticCss }) => staticCss.backgroundColor};
overflow:hidden;
animation-name:${({childPageZIndex})=>{return childPageZIndex===2? deployAnimate:null}};
animation-duration:${({staticCss})=>staticCss.pageTransition}s;
animation-fill-mode:forwards;
animation-timing-function:linear;
`
const SubContainer = styled.div`
width:60vw;
height:80vh;
position:absolute;
bottom:0%;
left:50%;
transform:translateX(-50%);
margin:auto auto 10vh auto;
background-color:#f9f9f9;
border-radius:30px;
padding:2vw;
`
const Title = styled.p`
margin:0;
padding:0;
font-size:4vh;
`
const TheImage = styled.img`
width:3vw;
border-radius:50%;
vertical-align:middle;
`
const TheSpan = styled.span`
font-size:4vh;
vertical-align:middle;
`

const TheP = styled.p`
font-size:3vh;
`

function ChildPage2({ staticCss, childPageZIndex }) {


    return (
        <>
            <Container staticCss={staticCss} childPageZIndex={childPageZIndex} >
                <SubContainer>
                    <Title>生平事蹟</Title>
                    <hr />
                    <TheImage src={wolfyPaw} alt="Wolfy肉球的照片"></TheImage>
                    <TheSpan>事蹟一</TheSpan>
                    <TheP>洗好澡後一小時就在泥巴水坑裡泡澡。</TheP>
                    <hr />
                    <br />
                    <TheImage src={wolfyPaw} alt="Wolfy肉球的照片"></TheImage>
                    <TheSpan>事蹟二</TheSpan>
                    <TheP>在肥料上、牛糞上、或死掉的動物上面打滾。</TheP>
                    <hr />
                    <br />
                    <TheImage src={wolfyPaw} alt="Wolfy肉球的照片"></TheImage>
                    <TheSpan>事蹟三</TheSpan>
                    <TheP>在散步時找到了三隻小小貓，奴隸只好幫他們找新家。</TheP>
                    <hr />
                </SubContainer>
            </Container>
        </>
    )

}

export default ChildPage2;

