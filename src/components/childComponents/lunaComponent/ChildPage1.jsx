
import styled from "@emotion/styled";

import minaImg7 from "../../../img/Luna_img/Luna_4.jpg"

const Container = styled.div`
padding:0 20vw 0 20vw;
position:absolute;
width:100%;
height:100%;
top:0;
z-index:1;
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
const TheDd = styled.dd`
font-size:3vh;
margin-bottom:0.3rem;
`

function ChildPage1({ backgroundColor, childPageTranslateY ,animationTime }) {


    return (
        <>
            <Container backgroundColor={backgroundColor} childPageTranslateY={childPageTranslateY} animationTime={animationTime}>
                <SubContainer>
                    <TextBox>
                    <Title>基本資料</Title>
                    <hr style={{width:"90%",textAlign:"left",marginLeft:0}} />
                        <dl style={{marginLeft:"2vw"}}>
                            <TheDt>名字:</TheDt>
                            <TheDd>LUNA</TheDd>

                            <TheDt>性別:</TheDt>
                            <TheDd>母</TheDd>

                            <TheDt>品種:</TheDt>
                            <TheDd>米克斯</TheDd>

                            <TheDt>毛色:</TheDt>
                            <TheDd>陽光橘/虎斑</TheDd>

                            <TheDt>肉球色:</TheDt>
                            <TheDd>玫瑰粉</TheDd>

                            <TheDt>體重:</TheDt>
                            <TheDd>瘦</TheDd>

                            <TheDt>興趣:</TheDt>
                            <TheDd>爬進衣櫥裡面躲貓貓</TheDd>

                        </dl>

                    </TextBox>
                    <TheImage src={minaImg7} alt="MINA的照片"></TheImage>
                </SubContainer>
            </Container>
        </>
    )

}

export default ChildPage1;

