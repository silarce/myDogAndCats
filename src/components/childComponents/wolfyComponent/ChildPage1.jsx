import {useEffect} from "react"
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import wolfyImg11 from "../../../img/Wolfy_img/Wolfy_11.jpg"

const deployAnimate = keyframes`
from,11%{
    height:0vh;
}
67%,to{
    height:100vh
}
`
const undeployWithHeroImageAnimation = keyframes`
from,14.2%{
    width:100vw;
}
85.2%{
    width:0vw;
}
to{
    width:0vw;
}
`
// 因為animation-name會在動畫結束後立刻改為null
// 一旦被改為null，那麼animation-name所改變的css也會被去掉，變回初始css(這個推測未證實)
// 因此被animation-name改變的height，其值需要與animation-name的最後關鍵幀相同
// 才能達到需要的效果
const Container = styled.div`
width:100vw;
height:100vh;
position:absolute;
bottom:0;
left:50%;
transform:translateX(-50%);
z-index:${({childPageZIndex})=>childPageZIndex};
background-color:${({ staticCss }) => staticCss.backgroundColor};
overflow:hidden;
animation-name:${({childPageZIndex})=>{
    return  childPageZIndex===2? deployAnimate:
            childPageZIndex===3? undeployWithHeroImageAnimation:null}};
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
margin:auto auto 7vh auto;
background-color:#f9f9f9;
border-radius:30px;
padding:2vw;
`
const TextBox = styled.div`
width:40%;
height:72vh;
display:inline-block;
vertical-align: middle;
`
const Title = styled.p`
margin:0;
padding:0;
font-size:4vh;
`
const TheImage = styled.img`
width:33vw;
height:33vw;
max-height:68vh;
border-radius:30px;
display:inline-block;
vertical-align: middle;
object-fit:cover;
object-position:0 -50px;
`

const TheDt = styled.dt`
font-size:4vh;
`
const TheDd = styled.dd`
font-size:3vh;
margin-bottom:0.3rem;
`

function ChildPage1({staticCss, childPageZIndex  }) {

    return (
        <>
            <Container staticCss={staticCss} childPageZIndex={childPageZIndex}>
                <SubContainer>
                    <TextBox>
                    <Title>基本資料</Title>
                    <hr style={{width:"90%",textAlign:"left",marginLeft:0}} />
                        <dl style={{marginLeft:"2vw"}}>
                            <TheDt>名字:</TheDt>
                            <TheDd>WOLFY</TheDd>

                            <TheDt>性別:</TheDt>
                            <TheDd>母</TheDd>

                            <TheDt>品種:</TheDt>
                            <TheDd>哈士奇</TheDd>

                            <TheDt>毛色:</TheDt>
                            <TheDd>挑食白/碳粉黑</TheDd>

                            <TheDt>肉球色:</TheDt>
                            <TheDd>任性黑</TheDd>

                            <TheDt>體重:</TheDt>
                            <TheDd>剛好</TheDd>

                            <TheDt>興趣:</TheDt>
                            <TheDd>吃零食、吃零食<br/>還有吃零食</TheDd>

                        </dl>

                    </TextBox>
                    <TheImage src={wolfyImg11} alt="wolfy的照片"></TheImage>
                </SubContainer>
            </Container>
        </>
    )

}

export default ChildPage1;

