import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// 將指定資料夾的所有.jpg檔案全部匯入並以陣列的型式宣告為imgArr
function importAllImagesWithArray(theRequireContext) {
    let images = []
    const requireContext = theRequireContext;
    requireContext.keys().map((item, index) => { images[index] = requireContext(item).default; return "" });
    return images;
}
const imgMinaArrInit = importAllImagesWithArray(require.context("img/thumbnail/mina", false, /^\.\/.*\.jpg$/))


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
overflow:hidden;
`
// transition-timing-function最好使用linear，
// 若使用速度會劇烈變化的方式(例如預設的ease)，會使圖片發生變形
// 試過提前將PhotoQueue提前歸位的作法，但效果不理想，所以還是要用linear
const PhotoQueue = styled.div`
width:8vw;
height:100%;
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,${({ cssTranslateY }) => cssTranslateY}%);
transition:${({ cssTransition }) => cssTransition}s;
transition-timing-function: linear;
`
const QueueItem = styled.img`
width:8vw;
height:8vw;
position: absolute;
top:${({ queueNumber }) => queueNumber}%;
transform:translateY(-50%);
`
// top:${({queueNumber})=>queueNumber===1? -25
// :queueNumber===2? 0
// :queueNumber===3? 25
// :queueNumber===4? 50 
// :queueNumber===5? 75 
// :queueNumber===6? 100 :125}%;

//用來呈現淡出效果
const PhotoQueueFadeBlock = styled.div`
width:8vw;
height:100%;
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
background-image: linear-gradient(
    0deg,
     rgba(200,200,200,1) 0%,
     rgba(200,200,200,0) 10%,
     rgba(200,200,200,0) 90%,
     rgba(200,200,200,1) 100%
     )
`


const Photo = styled.div`
display:inline-block;
width:78%;
height:100%;
background-color:black;
object-fit:contain;
border-radius:30px;
`

// const Photo = styled.img`
// display:inline-block;
// width:78%;
// height:100%;
// background-color:black;
// object-fit:contain;
// border-radius:30px;
// `

// let bar = ["a", "b", "c", "d", "e"]
// function foo (){
//     bar.unshift(bar[bar.length-1])
//     bar.pop()
//     console.log(bar)
// }

const queueMoveTime = 0.5;

function PageShow({ pageZIndex, animationTime }) {
    
    const [photoQueueMinaTranslateY, setPhotoQueueMinaTranslateY] = useState(-50)
    const [photoQueueMinaTransition, setPhotoQueueMinaTransition] = useState(queueMoveTime)
    const [imgMinaArr, setImgMinaArr] = useState(imgMinaArrInit)



    const slideDown = () => {
        setPhotoQueueMinaTranslateY(photoQueueMinaTranslateY+25);
        setPhotoQueueMinaTransition(queueMoveTime)

        setTimeout(() => {
            setImgMinaArr((preState) => {
                preState.unshift(preState[preState.length - 1])
                preState.pop();
                return [...preState]
            })
            setPhotoQueueMinaTranslateY(-50);
            setPhotoQueueMinaTransition(0)

        }, queueMoveTime*1000);
    }
    const slideUp = () => {
        setPhotoQueueMinaTranslateY(-75);
        setPhotoQueueMinaTransition(queueMoveTime)

        setTimeout(() => {
            setImgMinaArr((preState) => {
                preState.push(preState[0])
                preState.shift();
                return [...preState]
            })
            setPhotoQueueMinaTranslateY(-50);
            setPhotoQueueMinaTransition(0)

        },queueMoveTime*1000);
    }

    return (
        pageZIndex === 2 ? null :
            <Container>
                <FakeBookmark pageZIndex={pageZIndex} animationTime={animationTime}>GALLERY</FakeBookmark>
                <SubContainer>
                    <PhotoSelector >
                        <PhotoQueue cssTranslateY={photoQueueMinaTranslateY} cssTransition={photoQueueMinaTransition}>
                            <QueueItem queueNumber={-25} src={imgMinaArr[0]} ></QueueItem>
                            <QueueItem queueNumber={0} src={imgMinaArr[1]} ></QueueItem>
                            <QueueItem queueNumber={25} src={imgMinaArr[2]} ></QueueItem>
                            <QueueItem queueNumber={50} src={imgMinaArr[3]} ></QueueItem>
                            <QueueItem queueNumber={75} src={imgMinaArr[4]} ></QueueItem>
                            <QueueItem queueNumber={100} src={imgMinaArr[5]} ></QueueItem>
                            <QueueItem queueNumber={125} src={imgMinaArr[6]} ></QueueItem>
                            {/* <QueueItem queueNumber = {-25} theImg = {imgMinaArr[0]} ></QueueItem> 
                            <QueueItem queueNumber = {0}   theImg = {imgMinaArr[1]} ></QueueItem>
                            <QueueItem queueNumber = {25}  theImg = {imgMinaArr[2]} ></QueueItem>
                            <QueueItem queueNumber = {50}  theImg = {imgMinaArr[3]} ></QueueItem>
                            <QueueItem queueNumber = {75}  theImg = {imgMinaArr[4]} ></QueueItem>
                            <QueueItem queueNumber = {100} theImg = {imgMinaArr[5]} ></QueueItem>
                            <QueueItem queueNumber = {125} theImg = {imgMinaArr[6]} ></QueueItem> */}
                        </PhotoQueue>
                        <PhotoQueueFadeBlock />
                    </PhotoSelector>

                    <Photo onClick={slideDown} />
                    {/* <Photo onClick={slideUp} /> */}
                </SubContainer>
            </Container>
    )
}

export default PageShow;