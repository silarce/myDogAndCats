import styled from "@emotion/styled";

import lunaPaw from "../../../img/Luna_paw.jpg"


const Container = styled.div`
position:absolute;
width:100%;
height:100%;
top:0;
z-index:2;
background-color:${({ backgroundColor }) => backgroundColor};
transition:${({animationTime})=>animationTime}s;
transform:translateY(${({ childPageTranslateY }) => childPageTranslateY}vh);
`
const SubContainer = styled.div`
width:60vw;
height:80vh;
position:absolute;
top:52%;
left:50%;
transform:translate(-50%,-50%);
padding:2vw;
border-radius:30px;
background-color:#f9f9f9;
`
const Title = styled.p`
margin:0;
padding:0;
font-size:4vh;
`
const TheImage = styled.div`
width:3vw;
height:3vw;
border-radius:50%;
display:inline-block;
vertical-align:middle;
background-image:url(${lunaPaw});
background-size: 4vw auto;
background-position:50% 0;
`
const TheSpan = styled.span`
font-size:4vh;
vertical-align:middle;
`
const TheP = styled.p`
font-size:3vh;
`

function ChildPage2({ backgroundColor, childPageTranslateY, animationTime }) {

// 因為需要調整圖片的顯示範圍與位置，因此這邊的肉球照片改用div設背景圖片的方式來做
    return (
        <>
            <Container backgroundColor={backgroundColor} childPageTranslateY={childPageTranslateY} animationTime={animationTime}>
                <SubContainer>
                    <Title>生平事蹟</Title>
                    <hr />
                    <TheImage></TheImage>
                    <TheSpan>事蹟一</TheSpan>
                    <TheP>帶回家的第一天就趁奴隸睡覺時在奴隸的床上尿床，害奴隸每天都不能安心睡覺</TheP>
                    <hr />
                    <br />
                    <TheImage></TheImage>
                    <TheSpan>事蹟二</TheSpan>
                    <TheP>到了8歲了還是會尿床，害奴隸這八年來一起床就要把床墊收起來</TheP>
                    <hr />
                    <br />
                    <TheImage></TheImage>
                    <TheSpan>事蹟三</TheSpan>
                    <TheP>9歲後終於不再尿床了，奴隸終於能安心睡覺也不用再收床墊了</TheP>
                    <hr />
                </SubContainer>
            </Container>
        </>
    )

}

export default ChildPage2;

