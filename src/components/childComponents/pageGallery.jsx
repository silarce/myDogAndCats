import { useState, useEffect } from "react";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import PhotoQueue from "components/childComponents/galleryComponent/photoQueue.jsx"

import { UpArrow } from "@emotion-icons/boxicons-solid/UpArrow";
import { DownArrow } from "@emotion-icons/boxicons-solid/DownArrow";
import { LeftArrow } from "@emotion-icons/boxicons-solid/LeftArrow";
import { RightArrow } from "@emotion-icons/boxicons-solid/RightArrow";


// 將指定資料夾的所有.jpg檔案全部匯入並以陣列的型式宣告為imgArr
function importAllImagesWithArray(theRequireContext) {
    let images = []
    const requireContext = theRequireContext;
    requireContext.keys().map((item, index) => { images[index] = requireContext(item).default; return "" });
    return images;
}
const imgMinaArrInit = importAllImagesWithArray(require.context("img/thumbnail/mina", false, /^\.\/.*\.jpg$/))
const imgWolfyArrInit = importAllImagesWithArray(require.context("img/thumbnail/wolfy", false, /^\.\/.*\.jpg$/))
const imgLunaArrInit = importAllImagesWithArray(require.context("img/thumbnail/luna", false, /^\.\/.*\.jpg$/))

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
const PhotoQueueBox = styled.div`
width:10vw;
height:100%;
position:absolute;
left:50%;
transform:translateX(${({ photoQueueBoxTranslateX }) => photoQueueBoxTranslateX}%);
border-radius:30px;
transition:${({ photoQueueBoxTransition }) => photoQueueBoxTransition}s;
transition-timing-function: linear;
`

//用來呈現淡出效果
const PhotoQueueFadeBlock = styled.div`
width:8vw;
height:100%;
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
background-image: linear-gradient(
    180deg,
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
// opacity:0;
`
// const Photo = styled.img`
// display:inline-block;
// width:78%;
// height:100%;
// background-color:black;
// object-fit:contain;
// border-radius:30px;
// `

const ArrowUp = styled(UpArrow)`
width:2vw;
position:absolute;
top:0;
left:50%;
color:white;
transform:translateX(-50%) scale(4,1);
cursor:pointer;
`
const ArrowDown = styled(DownArrow)`
width:2vw;
position:absolute;
bottom:0;
left:50%;
color:white;
transform:translateX(-50%) scale(4,1);
cursor:pointer;
`
const ArrowLeft = styled(LeftArrow)`
width:2vw;
position:absolute;
top:50%;
left:0;
color:white;
transform:translateY(-50%) scale(1,4);
cursor:pointer;
`
const ArrowRight = styled(RightArrow)`
width:2vw;
position:absolute;
top:50%;
right:0;
color:white;
transform:translateY(-50%) scale(1,4);
cursor:pointer;
`




const queueMoveTime = 0.5;
const photoQueueBoxMoveTime = 1;
let moveSwitch = true;


function PageShow({ pageZIndex, animationTime }) {
    const [photoQueueBoxTranslateX, setPhotoQueueBoxTranslateX] = useState(0)
    const [photoQueueBoxTransition, setPhotoQueueBoxTransition] = useState(photoQueueBoxMoveTime)

    const [photoQueueWolfyTranslateY, setPhotoQueueWolfyTranslateY] = useState(-50)
    const [photoQueueWolfyTransition, setPhotoQueueWolfyTransition] = useState(queueMoveTime)

    const [imgMinaArr, setImgMinaArr] = useState(imgMinaArrInit)
    const [imgWolfyArr, setImgWolfyArr] = useState(imgWolfyArrInit)
    const [imgLunaArr, setImgLunaArr] = useState(imgLunaArrInit)

    const imgArrArr = [imgMinaArr, imgWolfyArr, imgLunaArr];
    const setImgArrArr=[setImgMinaArr, setImgWolfyArr, setImgLunaArr];

    const [photoQueueLeftImgArrIndex,setPhotoQueueLeftImgArrIndex] = useState(0)
    const [photoQueueRightImgArrIndex,setPhotoQueueRightImgArrIndex] = useState(1)
    




    const slideDown = () => {
        if (!moveSwitch) return;
        moveSwitch = false
        setPhotoQueueWolfyTranslateY(photoQueueWolfyTranslateY + 25);
        setPhotoQueueWolfyTransition(queueMoveTime)

        setTimeout(() => {
            setImgArrArr[photoQueueLeftImgArrIndex]((preState) => {
                preState.unshift(preState[preState.length - 1])
                preState.pop();
                return [...preState]
            })
            setPhotoQueueWolfyTranslateY(-50);
            setPhotoQueueWolfyTransition(0)
            moveSwitch = true;
        }, queueMoveTime * 1000);
    }
    const slideUp = () => {
        if (!moveSwitch) return;
        moveSwitch = false
        setPhotoQueueWolfyTranslateY(-75);
        setPhotoQueueWolfyTransition(queueMoveTime)

        setTimeout(() => {
            setImgArrArr[photoQueueLeftImgArrIndex]((preState) => {
                preState.push(preState[0])
                preState.shift();
                return [...preState]
            })
            setPhotoQueueWolfyTranslateY(-50);
            setPhotoQueueWolfyTransition(0)
            moveSwitch = true;
        }, queueMoveTime * 1000);
    }

    
    const slideLeft = () => {
        if (!moveSwitch) return;
        moveSwitch = false
        setPhotoQueueBoxTranslateX(-100)
        setPhotoQueueBoxTransition(photoQueueBoxMoveTime)
        setTimeout(() => {
            setPhotoQueueBoxTranslateX(0)
            setPhotoQueueBoxTransition(0)
            setPhotoQueueLeftImgArrIndex(photoQueueRightImgArrIndex)
            setPhotoQueueRightImgArrIndex((preState)=> preState === 2? 0:preState+1)
            moveSwitch = true;
        }, photoQueueBoxMoveTime * 1000);
    }
    const slideRight = () => {
        if (!moveSwitch) return;
        moveSwitch = false
        setPhotoQueueBoxTranslateX(-100);
        setPhotoQueueBoxTransition(0);
        setPhotoQueueLeftImgArrIndex((preState)=> preState === 0? 2:preState-1)
        setPhotoQueueRightImgArrIndex(photoQueueLeftImgArrIndex);
        setTimeout(() => {
            setPhotoQueueBoxTranslateX(0)
            setPhotoQueueBoxTransition(1)
        }, 0);
        setTimeout(() => {
            moveSwitch = true; 
        }, photoQueueBoxMoveTime * 1000);
    }


    return (
        pageZIndex === 2 ? null :
            <Container>
                <FakeBookmark pageZIndex={pageZIndex} animationTime={animationTime}>GALLERY</FakeBookmark>
                <SubContainer>
                    <PhotoSelector >
                        <PhotoQueueBox photoQueueBoxTranslateX={photoQueueBoxTranslateX} photoQueueBoxTransition={photoQueueBoxTransition}>
                            <PhotoQueue imgArr={imgArrArr[photoQueueLeftImgArrIndex]}
                                location="left"
                                cssTranslateY={photoQueueWolfyTranslateY}
                                // cssTranslateX={-175}
                                cssTransition={photoQueueWolfyTransition}
                            />
                            <PhotoQueue imgArr={imgArrArr[photoQueueRightImgArrIndex]}
                                location="right"
                                cssTranslateY={photoQueueWolfyTranslateY}
                                // cssTranslateX={-50}
                                cssTransition={photoQueueWolfyTransition}
                            />
                        </PhotoQueueBox>
                        <PhotoQueueFadeBlock />
                        <ArrowUp onClick={slideUp} />
                        <ArrowDown onClick={slideDown} />
                        <ArrowLeft onClick={slideRight} />
                        <ArrowRight onClick={slideLeft} />
                    </PhotoSelector>

                    <Photo />

                </SubContainer>
            </Container>
    )
}

export default PageShow;