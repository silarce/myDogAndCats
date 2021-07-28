import styled from "@emotion/styled";

import lunaPaw from "../../../img/Luna_paw.jpg"


const Container = styled.div`
position:absolute;
width:100%;
height:100%;
top:${({ childPage2Top }) => childPage2Top}%;
z-index:2;
background-color:${({ backgroundColor }) => backgroundColor};
transition:${({pageTransition})=>pageTransition}s;
`


const SubContainer = styled.div`
position:absolute;
top:0;
bottom:0;
right:0;
left:0;
margin:auto;
width:60vw;
height:80vh;
background-color:#f9f9f9;
border-radius:30px;
padding:2vw;
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

function ChildPage2({ backgroundColor, childPage2Top, pageTransition }) {


    return (
        <>
            <Container backgroundColor={backgroundColor} childPage2Top={childPage2Top} pageTransition={pageTransition}>
                <SubContainer>
                    <Title>基本資料</Title>
                    <hr />
                    <TheImage></TheImage>
                    <TheSpan>事蹟一</TheSpan>
                    <TheP>帶回家的第一天就趁奴隸睡覺時在奴隸的床上尿床，害奴隸每天都不能安心睡覺</TheP>
                    <hr />
                    <br />
                    <TheImage></TheImage>
                    {/* <TheImage src={lunaPaw} alt="LUNA的照片"></TheImage> */}
                    <TheSpan>事蹟二</TheSpan>
                    <TheP>到了8歲了還是會尿床，害奴隸這八年來一起床就要把床墊收起來</TheP>
                    <hr />
                    <br />
                    <TheImage></TheImage>
                    {/* <TheImage src={lunaPaw} alt="LUNA的照片"></TheImage> */}
                    <TheSpan>事蹟三</TheSpan>
                    <TheP>9歲後終於不再尿床了，奴隸終於能安心睡覺也不用再收床墊了</TheP>
                    <hr />
                </SubContainer>
            </Container>
        </>
    )

}

export default ChildPage2;

