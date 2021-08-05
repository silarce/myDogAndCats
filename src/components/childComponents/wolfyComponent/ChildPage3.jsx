import { useState } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import mina1 from "../../../img/Mina_img/Mina_1.jpg";
import mina2 from "../../../img/Mina_img/Mina_2.jpg";
import mina3 from "../../../img/Mina_img/Mina_5.jpg";
import mina4 from "../../../img/Mina_img/Mina_8.jpg";

import { Cancel } from "@emotion-icons/material/Cancel";
import { LeftArrow } from "@emotion-icons/boxicons-regular/LeftArrow";
import { RightArrow } from "@emotion-icons/boxicons-regular/RightArrow";


const deployAnimate = keyframes`
from,11%{
    height:0vh;
}
67%,to{
    height:100vh
}
`
// 因為animation-name會在動畫結束後立刻改為null
// 一旦被改為null，那麼animation-name所改變的css也會被去掉，變回初始css(這個推測未證實)
// 因此被animation-name改變的height，其值需要與animation-name的最後關鍵幀相同
// 才能達到需要的效果
const Container = styled.div`
width:100%;
height:100vh;
padding:0 20vw 0 20vw;
position:absolute;
bottom:0;
z-index:${({childPageZIndex})=>childPageZIndex};
background-color:${({ staticCss }) => staticCss.backgroundColor};
overflow:hidden;
animation-name:${({childPageZIndex})=>{return childPageZIndex===2? deployAnimate:null}};
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
margin:auto auto 10vh auto;
background-color:#f9f9f9;
border-radius:30px;
padding:2vw;
`
const Title = styled.p`
margin:0;
padding:0;
font-size:4vh;
`
const PhotoBox = styled.div`
width:100%;
display:grid;
grid-template-columns: auto auto;
justify-content:space-evenly ;
grid-gap: 1vh;
`
const Photo = styled.img`
width:20vw;
cursor:pointer;
`
// ----------------------------------------
// 跑馬燈
const PhotoCarousel = styled.div`
border-radius:30px;
position:absolute;
width:${({ photoCarouselCss }) => photoCarouselCss.width};
height:${({ photoCarouselCss }) => photoCarouselCss.height};
top:${({ photoCarouselCss }) => photoCarouselCss.top};
left:${({ photoCarouselCss }) => photoCarouselCss.left};
transition:${({ photoCarouselCss }) => photoCarouselCss.transition}s;
transform:translate(-50%,-50%);
opacity:${({ photoCarouselCss }) => photoCarouselCss.opacity};
user-select: none;
background-color:black;
`
// 跑馬燈裡的圖片
const PhotoInCarousel = styled.img`
width:100%;
height:100%;
object-fit: contain;
transition:0.2s;
opacity:${({ photoInCarouselOpacity }) => photoInCarouselOpacity}
`
// ----------------------------------------
// 跑馬燈icon
const CancelIcon = styled(Cancel)`
position:absolute;
right:0;
width:50px;
cursor:pointer;
transition:1s;
color:${({ backgroundcolor }) => backgroundcolor};
opacity:${({ iconopacity }) => iconopacity};
`
const LeftArrowIcon = styled(LeftArrow)`
position:absolute;
left:0;
top:0;
bottom:0;
margin:auto;
width:3vw;
transform: scale(1,4);
transition:1s;
cursor:pointer;
color:${({ backgroundcolor }) => backgroundcolor};
opacity:${({ iconopacity }) => iconopacity};
`
const RightArrowIcon = styled(RightArrow)`
position:absolute;
right:0;
top:0;
bottom:0;
margin:auto;
width:3vw;
transform: scale(1,4);
transition:1s;
cursor:pointer;
color:${({ backgroundcolor }) => backgroundcolor};
opacity:${({ iconopacity }) => iconopacity};
`
// ----------------------------------------
let photoIndex = 0;
// ----------------------------------------
function ChildPage3({staticCss, childPageHeight, childPageZIndex }) {

    const [photoCarouselCss, setPhotoCarouselCss] = useState({ // 照片跑馬燈的state
        top: 0,
        left: 0,
        width: "0px",
        height: "0px",
        transition: 0,
        opacity: 0
    })
    const [thePhotoInCarousel, setThePhotoInCarousel] = useState("") // 跑馬燈照片的state
    const [iconOpacity, setIconOpacity] = useState(0) // icon的state
    const [photoInCarouselOpacity, setPhotoInCarouselOpacity] = useState(1)
    // 部屬照片跑馬燈
    const deployPhotoCarousel = (e, elePhotoIndex) => {
        photoIndex = elePhotoIndex;
        setThePhotoInCarousel(e.target.src);
        let targetClientRect = e.target.getBoundingClientRect();
        setPhotoCarouselCss(() => {
            return {
                top: `${targetClientRect.top + (targetClientRect.height * 0.5)}px`,
                left: `${targetClientRect.left + targetClientRect.width * 0.5}px`,
                width: `${targetClientRect.width}px`,
                height: `${targetClientRect.height}px`,
                transition: 0,
                opacity: 1
            }
        });
        setTimeout(() => {
            setPhotoCarouselCss(() => {
                return {
                    top: `50%`,
                    left: `50%`,
                    width: `60vw`,
                    height: `80vh`,
                    transition: 1,
                    opacity: 1
                }
            });
        }, 0);
        setTimeout(() => {
            setIconOpacity(1);
        }, 1000);
    }
    // 反部屬跑馬燈
    const undeployPhotoCarousel = () => {
        setPhotoCarouselCss((preState) => {
            return (
                {
                    ...preState,
                    transition: 0.5,
                    opacity: 0
                }
            )
        })
        setTimeout(() => {
            setPhotoCarouselCss(() => {
                return {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                    transition: 0,
                    opacity: 1
                }
            })
            setIconOpacity(0);
        }, 500);
    }


    // 跑馬燈換圖片
    // 圖片陣列
    const photoArr = [mina1, mina2, mina3, mina4]
    const prePhoto = () => {
        setPhotoInCarouselOpacity(0);
        setTimeout(() => {
            setPhotoInCarouselOpacity(1);
            photoIndex = photoIndex === 0 ? 3 : photoIndex - 1
            setThePhotoInCarousel(photoArr[photoIndex])

        }, 200);

    }
    const nextPhoto = () => {
        setPhotoInCarouselOpacity(0);
        setTimeout(() => {
            setPhotoInCarouselOpacity(1);
            photoIndex = photoIndex === 3 ? 0 : photoIndex + 1
            setThePhotoInCarousel(photoArr[photoIndex])
        }, 200);
    }


    return (
        <>
            <Container staticCss={staticCss} childPageZIndex={childPageZIndex}>
                <SubContainer>
                    <Title>精選照片</Title>
                    <hr />
                    <PhotoBox>
                        <Photo onClick={(e) => { deployPhotoCarousel(e, 0) }} src={mina1} alt="MINA的照片" />
                        <Photo onClick={(e) => { deployPhotoCarousel(e, 1) }} src={mina2} alt="MINA的照片" />
                        <Photo onClick={(e) => { deployPhotoCarousel(e, 2) }} src={mina3} alt="MINA的照片" />
                        <Photo onClick={(e) => { deployPhotoCarousel(e, 3) }} src={mina4} alt="MINA的照片" />
                    </PhotoBox>
                </SubContainer>
                <PhotoCarousel photoCarouselCss={photoCarouselCss}>            
                    <LeftArrowIcon onClick={prePhoto} backgroundcolor={staticCss.backgroundColor} iconopacity={iconOpacity} />
                    <RightArrowIcon onClick={nextPhoto} backgroundcolor={staticCss.backgroundColor} iconopacity={iconOpacity} />
                    <PhotoInCarousel src={thePhotoInCarousel} alt="MINA的照片" photoInCarouselOpacity={photoInCarouselOpacity} />
                    <CancelIcon onClick={undeployPhotoCarousel} backgroundcolor={staticCss.backgroundColor} iconopacity={iconOpacity} />
                </PhotoCarousel>
            </Container>
        </>
    )

}

export default ChildPage3;

