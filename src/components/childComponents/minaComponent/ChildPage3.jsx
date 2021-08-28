import { useState,useEffect } from "react";
import styled from "@emotion/styled";

import mina1 from "../../../img/Mina_img/Mina_1.jpg";
import mina2 from "../../../img/Mina_img/Mina_2.jpg";
import mina3 from "../../../img/Mina_img/Mina_5.jpg";
import mina4 from "../../../img/Mina_img/Mina_8.jpg";

import { Cancel } from "@emotion-icons/material/Cancel";
import { LeftArrow } from "@emotion-icons/boxicons-regular/LeftArrow";
import { RightArrow } from "@emotion-icons/boxicons-regular/RightArrow";

const Container = styled.div`
position:absolute;
width:100%;
height:100%;
top:0;
z-index:3;
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
@media (min-width: 1366px) {
    height:85vh;
  }
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
width:27vw;
height:16vw;
object-fit:contain;
cursor:pointer;
border-radius:30px;
background-color:black
`
// 先留著，以後可能要改回來
// const Photo = styled.img`
// width:20vw;
// cursor:pointer;
// `
// ----------------------------------------
// 跑馬燈
const PhotoCarousel = styled.div`
border-radius:30px;
position:absolute;
width:${({ photoCarouselCss }) => photoCarouselCss.width}px;
height:${({ photoCarouselCss }) => photoCarouselCss.height}px;
top:${({ photoCarouselCss }) => photoCarouselCss.top}px;
left:${({ photoCarouselCss }) => photoCarouselCss.left}px;
transition:${({ photoCarouselCss }) => photoCarouselCss.transition}s;
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
function ChildPage3({ backgroundColor, childPageTranslateY,animationTime, pageZIndex }) {

    const [photoCarouselCss, setPhotoCarouselCss] = useState({ // 照片跑馬燈的state
        width: "0px",
        height: "0px",
        top: 0,
        left: 0,
        transition: 0,
        opacity: 0
    })
    const [thePhotoInCarousel, setThePhotoInCarousel] = useState("") // 跑馬燈照片的state
    const [iconOpacity, setIconOpacity] = useState(0) // icon的state
    const [photoInCarouselOpacity, setPhotoInCarouselOpacity] = useState(1)
    // 部屬照片跑馬燈
    const deployPhotoCarousel = (e, elePhotoIndex) => {
        let containerClientRect = e.target.parentNode.parentNode.parentNode.getBoundingClientRect();
        if(containerClientRect.y!==0)return;
        let subContainerClientRect = e.target.parentNode.parentNode.getBoundingClientRect();
        photoIndex = elePhotoIndex;
        setThePhotoInCarousel(e.target.src);
        let targetClientRect = e.target.getBoundingClientRect();

        setPhotoCarouselCss(() => {
            return {
                width: targetClientRect.width,
                height: targetClientRect.height,
                top: targetClientRect.top,
                left: targetClientRect.left,
                transition: 0,
                opacity: 1
            }
        });
        setTimeout(() => {
            setPhotoCarouselCss(() => {
                return {
                    width: subContainerClientRect.width,
                    height: subContainerClientRect.height,
                    top: subContainerClientRect.top,
                    left: subContainerClientRect.left,
                    transition: 1,
                    opacity: 1
                }
            });
        }, 0);
        setTimeout(() => {
            setIconOpacity(1);
        }, 1000);
    } //deployPhotoCarousel
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
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0,
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
    useEffect(()=>{
        if(pageZIndex===2){
            undeployPhotoCarousel();
        }
    },[pageZIndex])


    return (
        <>
            <Container backgroundColor={backgroundColor} childPageTranslateY={childPageTranslateY} animationTime={animationTime}>
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
                    <LeftArrowIcon onClick={prePhoto} backgroundcolor={backgroundColor} iconopacity={iconOpacity} />
                    <RightArrowIcon onClick={nextPhoto} backgroundcolor={backgroundColor} iconopacity={iconOpacity} />
                    <PhotoInCarousel src={thePhotoInCarousel} photoInCarouselOpacity={photoInCarouselOpacity} />
                    <CancelIcon onClick={undeployPhotoCarousel} backgroundcolor={backgroundColor} iconopacity={iconOpacity} />
                </PhotoCarousel>
            </Container>
        </>
    )

}

export default ChildPage3;

