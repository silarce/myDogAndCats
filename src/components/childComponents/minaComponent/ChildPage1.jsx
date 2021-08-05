
import styled from "@emotion/styled";

import minaImg7 from "../../../img/Mina_img/Mina_7_2.jpg"

const Container = styled.div`
padding:0 20vw 0 20vw;
position:absolute;
width:100%;
height:100%;
top:${({ childPage1Top }) => childPage1Top}%;
z-index:1;
background-color:${({ backgroundColor }) => backgroundColor};
transition:${({pageTransition})=>pageTransition}s;
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
`

const TheDt = styled.dt`
font-size:4vh;
`
// font-size:1.4rem;
const TheDd = styled.dd`
font-size:3vh;
margin-bottom:0.3rem;
`
// font-size:1.2rem;

function ChildPage1({ backgroundColor, childPage1Top ,pageTransition }) {


    return (
        <>
            <Container backgroundColor={backgroundColor} childPage1Top={childPage1Top} pageTransition={pageTransition}>
                <SubContainer>
                    <TextBox>
                    <Title>基本資料</Title>
                    <hr style={{width:"90%",textAlign:"left",marginLeft:0}} />
                        <dl style={{marginLeft:"2vw"}}>
                            <TheDt>名字:</TheDt>
                            <TheDd>MINA</TheDd>

                            <TheDt>性別:</TheDt>
                            <TheDd>母</TheDd>

                            <TheDt>品種:</TheDt>
                            <TheDd>米克斯</TheDd>

                            <TheDt>毛色:</TheDt>
                            <TheDd>棉花糖白</TheDd>

                            <TheDt>肉球色:</TheDt>
                            <TheDd>可愛粉</TheDd>

                            <TheDt>體重:</TheDt>
                            <TheDd>肥</TheDd>

                            <TheDt>興趣:</TheDt>
                            <TheDd>無聊的時候走到<br/>廁所前面鬼叫</TheDd>

                        </dl>

                    </TextBox>
                    <TheImage src={minaImg7} alt="MINA的照片"></TheImage>
                </SubContainer>
            </Container>
        </>
    )

}

export default ChildPage1;

