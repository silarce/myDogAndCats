// import { useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// 將指定資料夾的所有.jpg檔案全部匯入並以陣列的型式宣告為imgArr
// function importAllImagesWithArray(theRequireContext) {
//     let images = []
//     const requireContext = theRequireContext;
//     requireContext.keys().map((item, index) => { images[index] = requireContext(item).default; return "" });
//     return images;
// }
// const imgMinaArr = importAllImagesWithArray(require.context("img/Mina_img", false, /^\.\/.*\.jpg$/))


const Container = styled.div`
width:100%;
height:100%;
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
overflow:hidden;
z-index:0;
background-color:black;
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
padding:1vw;
`

const fakeBookmarkAnimation = keyframes`
from{
opacity:1
}
to{
opacity:0;
display:none;
}
`
const FakeBookmark = styled.div`
width:20vw;
height:5vw;
position:absolute;
left:20vw;
top:0;
background:white;
color:black;
line-height:5vw;
text-align:center;
font-size:3vw;
border-radius: 0 0 50% 50%;
cursor: pointer;
// animation-name:${({ pageZIndex }) => pageZIndex === 2 ? null : fakeBookmarkAnimation};
// animation-duration:${({ animationTime }) => animationTime + 1}s;
// animation-fill-mode:forwards;
// animation-timing-function:linear;
`

const PhotoSelector = styled.div`
display:inline-block;
width:20%;
height:100%;
position:relative;
margin-right:2%;
background-color:#555;
border-radius:30px;
`
const PhotoQueue = styled.div`
width:8vw;
height:100%;
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
background-color:#999;
`
const QueueItem = styled.div`
width:8vw;
height:8vw;
background-color:black;
`

const Photo = styled.img`
display:inline-block;
width:78%;
height:100%;
background-color:black;
object-fit:contain;
border-radius:30px;
`



function PageShow({ pageZIndex, animationTime }) {



    return (
        pageZIndex === 2 ? null :
            <Container>
                <FakeBookmark pageZIndex={pageZIndex} animationTime={animationTime}>GALLERY</FakeBookmark>
                <SubContainer>
                    <PhotoSelector >
                        <PhotoQueue>
                            <QueueItem queueNumber = {1} />
                            <QueueItem queueNumber = {2} />
                            <QueueItem queueNumber = {3} />
                            <QueueItem queueNumber = {4} />
                        </PhotoQueue>
                    </PhotoSelector>
                    <Photo />
                </SubContainer>

            </Container>
    )
}

export default PageShow;