
import styled from "@emotion/styled";

import minaPaw from "../../../img/Mina_paw.jpg"

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
const TheImage = styled.img`
width:3vw;
border-radius:50%;
vertical-align:middle;
`
// display:inline-block;

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
                    <TheImage src={minaPaw} alt="MINA的照片"></TheImage>
                    <TheSpan>事蹟一</TheSpan>
                    <TheP>因為飼料吃太快而吐在鍵盤上</TheP>
                    <hr />
                    <br />
                    <TheImage src={minaPaw} alt="MINA的照片"></TheImage>
                    <TheSpan>事蹟二</TheSpan>
                    <TheP>用爪子在奴隸的腿上留下許多長長的愛之印記</TheP>
                    <hr />
                    <br />
                    <TheImage src={minaPaw} alt="MINA的照片"></TheImage>
                    <TheSpan>事蹟三</TheSpan>
                    <TheP>把手機從桌上撥到旁邊的水碗裡。手機壞了，修理費8000元。</TheP>
                    <hr />
                </SubContainer>
            </Container>
        </>
    )

}

export default ChildPage2;

