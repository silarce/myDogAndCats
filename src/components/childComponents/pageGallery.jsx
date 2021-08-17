import { useState, useEffect } from "react";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import PhotoQueue from "components/childComponents/galleryComponent/photoQueue.jsx"

import { UpArrow } from "@emotion-icons/boxicons-solid/UpArrow";
import { DownArrow } from "@emotion-icons/boxicons-solid/DownArrow";
import { LeftArrow } from "@emotion-icons/boxicons-solid/LeftArrow";
import { RightArrow } from "@emotion-icons/boxicons-solid/RightArrow";


// 將指定資料夾的所有.jpg檔案路徑全部匯入並以陣列的型式宣告為imgArr
function importAllImagesWithArray(theRequireContext) {
    let images = []
    const requireContext = theRequireContext;
    requireContext.keys().map((item, index) => {
        images[index] = requireContext(item).default;
        return "" //return非必要，不加的話瀏覽器會報警告所以才加
    });
    return images;
}
const imgMinaArrInit = importAllImagesWithArray(require.context("img/thumbnail/mina", false, /^\.\/.*\.jpg$/))
const imgWolfyArrInit = importAllImagesWithArray(require.context("img/thumbnail/wolfy", false, /^\.\/.*\.jpg$/))
const imgLunaArrInit = importAllImagesWithArray(require.context("img/thumbnail/luna", false, /^\.\/.*\.jpg$/))

const bigImgMinaArrInit = importAllImagesWithArray(require.context("img/Mina_img", false, /^\.\/.*\.jpg$/))
const bigImgWolfyArrInit = importAllImagesWithArray(require.context("img/Wolfy_img", false, /^\.\/.*\.jpg$/))
const bigImgLunaArrInit = importAllImagesWithArray(require.context("img/Luna_img", false, /^\.\/.*\.jpg$/))


const Container = styled.div`
width:100%;
height:100%;
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
overflow:hidden;
z-index:0;
`
const WhiteBackground = styled.div`
width:100%;
height:100%;
background-color:white;
`
const SubContainer = styled.div`
width:60vw;
height:80vh;
position:absolute;
bottom:0%;
left:50%;
transform:translateX(-50%);
margin:auto auto 7vh auto;
background-color:#999;
border-radius:30px;
padding:1vw;
`
// background-color:#f9f9f9;
const shadowDeployAnimation = keyframes`
from{
    width:1px;
    height:1px;
    box-shadow:  0px 0px 400px 0vw #000000,inset 0px 0px 400px 65vw #000000;
}
66%{
    width:1px;
    height:1px;
    box-shadow:  0px 0px 400px 65vw #000000,inset 0px 0px 400px 65vw #000000;
}
66.66%{
    width:110vw;
    height:110vw;
    box-shadow:  0px 0px 400px 65vw #000000,inset 0px 0px 400px 65vw #000000;
}
to{
    width:110vw;
    height:110vw;
    box-shadow:  0px 0px 400px 65vw #000000,inset 0px 0px 400px 10vw #000000;
}
`
const ShadowBlock = styled.div`
position:absolute;
top:50%;
left:50%;
transform:translate(-50%, -50%) ;
width:1vw;
height:1vw;
border-radius:50%;
box-shadow:  0px 0px 400px 65vw #000000,inset 0px 0px 400px 65vw #000000;
animation-name:${({ pageZIndex }) => pageZIndex === 2 ? null : shadowDeployAnimation};
animation-duration:${({ animationTime }) => animationTime + 1}s;
animation-fill-mode:forwards;
animation-timing-function:linear;
pointer-events: none;
`
const FakeBookmark = styled.div`
width:20vw;
height:5vw;
position:absolute;
left:20vw;
top:0;
background:white;
font-size:3vw;
line-height:5vw;
text-align:center;
font-family:times new roman;
color:black;
border-radius: 0 0 50% 50%;
`
const PhotoSelector = styled.div`
display:inline-block;
width:20%;
height:100%;
position:relative;
margin-right:2%;
background-color:black;
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
width:100%;
height:100%;
position:absolute;
background-image: linear-gradient(
    180deg,
     rgba(0,0,0,1) 0%,
     rgba(0,0,0,0) 10%,
     rgba(0,0,0,0) 90%,
     rgba(0,0,0,1) 100%
     );
pointer-events: none;
border-radius:30px;
`
const Photo = styled.img`
display:inline-block;
width:78%;
height:100%;
background-color:black;
object-fit:contain;
object-position:center;
border-radius:30px;
`
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

const queueMoveTime = 0.4; //縮圖列上下移動的速度
const photoQueueBoxMoveTime = 0.4; //縮圖列左右移動的速度
let moveSwitch = true;
let wheelLastTriggerTime = new Date(); //滑鼠滾輪節流用變數，每次觸發scrollPhotoQueue()就會更新

function PageShow({ pageZIndex, animationTime }) {
    const [photoQueueBoxTranslateX, setPhotoQueueBoxTranslateX] = useState(0)
    const [photoQueueBoxTransition, setPhotoQueueBoxTransition] = useState(photoQueueBoxMoveTime)

    const [photoQueueTranslateY, setPhotoQueueTranslateY] = useState(-50)
    const [photoQueueTransition, setPhotoQueueTransition] = useState(queueMoveTime)

    const [imgMinaArr, setImgMinaArr] = useState(imgMinaArrInit)
    const [imgWolfyArr, setImgWolfyArr] = useState(imgWolfyArrInit)
    const [imgLunaArr, setImgLunaArr] = useState(imgLunaArrInit)

    const imgArrArr = [imgMinaArr, imgWolfyArr, imgLunaArr];
    const setImgArrArr = [setImgMinaArr, setImgWolfyArr, setImgLunaArr];

    const [photoQueueLeftImgArrIndex, setPhotoQueueLeftImgArrIndex] = useState(0)
    const [photoQueueRightImgArrIndex, setPhotoQueueRightImgArrIndex] = useState(1)

    const [bigImgMinaArr, setBitImgMinaArr] = useState(bigImgMinaArrInit)
    const [bigImgWolfyArr, setBitImgWolfyArr] = useState(bigImgWolfyArrInit)
    const [bigImgLunaArr, setBitImgLunaArr] = useState(bigImgLunaArrInit)

    const bigImgArrArr = [bigImgMinaArr, bigImgWolfyArr, bigImgLunaArr];
    const setBigImgArrArr = [setBitImgMinaArr, setBitImgWolfyArr, setBitImgLunaArr];

    const [bigPhotoSrc, setBigPhotoSrc] = useState(bigImgMinaArr[3]);


    useEffect(() => {
        setTimeout(() => {
            let foo1 = []
            let foo2 = []
            let foo3 = []
            for (let index in bigImgMinaArrInit) {
                let preloadImage = new Image()
                preloadImage.src = bigImgMinaArrInit[index]; //圖片預加載
                foo1[index] = preloadImage.src
            }
            for (let index in bigImgWolfyArrInit) {
                let preloadImage = new Image()
                preloadImage.src = bigImgWolfyArrInit[index]; //圖片預加載
                foo2[index] = preloadImage.src
            }
            for (let index in bigImgLunaArrInit) {
                let preloadImage = new Image()
                preloadImage.src = bigImgLunaArrInit[index]; //圖片預加載
                foo3[index] = preloadImage.src
            }
        }, 500);
    }, [])



    const slideDown = () => {
        if (!moveSwitch) return;
        moveSwitch = false
        setPhotoQueueTranslateY(photoQueueTranslateY + 25);
        setPhotoQueueTransition(queueMoveTime)

        setTimeout(() => {
            setImgArrArr[photoQueueLeftImgArrIndex]((preState) => {
                preState.unshift(preState[preState.length - 1])
                preState.pop();
                return [...preState]
            })
            setBigImgArrArr[photoQueueLeftImgArrIndex]((preState) => {
                preState.unshift(preState[preState.length - 1])
                preState.pop();
                return [...preState]
            })
            setPhotoQueueTranslateY(-50);
            setPhotoQueueTransition(0)
            moveSwitch = true;
        }, queueMoveTime * 1000);
    }
    const slideUp = () => {
        if (!moveSwitch) return;
        moveSwitch = false
        setPhotoQueueTranslateY(-75);
        setPhotoQueueTransition(queueMoveTime)

        setTimeout(() => {
            setImgArrArr[photoQueueLeftImgArrIndex]((preState) => {
                preState.push(preState[0])
                preState.shift();
                return [...preState]
            })
            setBigImgArrArr[photoQueueLeftImgArrIndex]((preState) => {
                preState.push(preState[0])
                preState.shift();
                return [...preState]
            })
            setPhotoQueueTranslateY(-50);
            setPhotoQueueTransition(0)
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
            setPhotoQueueRightImgArrIndex((preState) => preState === 2 ? 0 : preState + 1)
            moveSwitch = true;
        }, photoQueueBoxMoveTime * 1000);
    }
    const slideRight = () => {
        if (!moveSwitch) return;
        moveSwitch = false
        setPhotoQueueBoxTranslateX(-100);
        setPhotoQueueBoxTransition(0);
        setPhotoQueueLeftImgArrIndex((preState) => preState === 0 ? 2 : preState - 1)
        setPhotoQueueRightImgArrIndex(photoQueueLeftImgArrIndex);
        setTimeout(() => {
            setPhotoQueueBoxTranslateX(0)
            setPhotoQueueBoxTransition(photoQueueBoxMoveTime)
        }, 0);
        setTimeout(() => {
            moveSwitch = true;
        }, photoQueueBoxMoveTime * 1000);
    }

    // 用滑鼠滾輪滾動縮圖列
    const scrollPhotoQueue = (e) => {
        let timeNow = new Date();
        //加100毫秒是為了確保移動的動畫都跑完了才觸發另一個移動動畫，這麼做就不需要再加防抖機制了
        if ((timeNow - wheelLastTriggerTime) > photoQueueBoxMoveTime * 1000 + 100) {
            if (e.deltaY > 0) {
                slideDown()
            } else if (e.deltaY < 0) {
                slideUp()
            }
            wheelLastTriggerTime = new Date();
        }
    }


    return (
        pageZIndex === 2 ? null :
            <Container onWheel={scrollPhotoQueue} pageZIndex={pageZIndex} animationTime={animationTime}>
                <FakeBookmark>GALLERY</FakeBookmark>
                {pageZIndex === 0 &&
                    <WhiteBackground>
                        <SubContainer>
                            <PhotoSelector >
                                <PhotoQueueBox photoQueueBoxTranslateX={photoQueueBoxTranslateX} photoQueueBoxTransition={photoQueueBoxTransition}>
                                    <PhotoQueue imgArr={imgArrArr[photoQueueLeftImgArrIndex]}
                                        bigImgArr={bigImgArrArr[photoQueueLeftImgArrIndex]}
                                        setBigPhotoSrc={setBigPhotoSrc}
                                        location="left"
                                        cssTranslateY={photoQueueTranslateY}
                                        cssTransition={photoQueueTransition}
                                    />
                                    <PhotoQueue imgArr={imgArrArr[photoQueueRightImgArrIndex]}
                                        bigImgArr={bigImgArrArr[photoQueueLeftImgArrIndex]}
                                        setBigPhotoSrc={setBigPhotoSrc}
                                        location="right"
                                        cssTranslateY={photoQueueTranslateY}
                                        cssTransition={photoQueueTransition}
                                    />
                                </PhotoQueueBox>
                                <PhotoQueueFadeBlock id="PhotoQueueFadeBlock" />
                                <ArrowUp onClick={slideUp} />
                                <ArrowDown onClick={slideDown} />
                                <ArrowLeft onClick={slideRight} />
                                <ArrowRight onClick={slideLeft} />
                            </PhotoSelector>
                            <Photo src={bigPhotoSrc} />
                        </SubContainer>
                    </WhiteBackground>
                }
                <ShadowBlock pageZIndex={pageZIndex} animationTime={animationTime} />

            </Container>
    )
}

export default PageShow;