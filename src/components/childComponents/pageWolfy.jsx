

import { useState, useEffect, useCallback } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";


import ChildPage1 from "./wolfyComponent/ChildPage1.jsx";
import ChildPage2 from "./wolfyComponent/ChildPage2.jsx";
import ChildPage3 from "./wolfyComponent/ChildPage3.jsx";

import wolfy_4 from "../../img/Wolfy_img/heroImage/heroImage_wolfy.jpg";


const Container = styled.div`
position:relative;
overflow:hidden;
width:100%;
height:100%;
z-index:0;
`
// 當pageWolfy還在展開時，使用這個HeroImage100Width蓋在最上層
const HeroImage100Width = styled.div`
width: 100vw;
height: 100vh;
position:absolute;
left:50%;
transform: translateX(-50%);
background-image:url(${wolfy_4});
background-repeat: no-repeat;
background-size: 150%;
background-position-x: center ;
background-position-y: 80% ;
z-index:99;
`
const heroImageAnimation = keyframes`
from, 14.2%{
width:0vw;
}
85.2%{
    width:50vw;
}
to{
    width:50vw;
}
`
// 當pageWolfy還在展開後，使用這個HeroImageContainer與HeroImage50Width作為第一頁
const HeroImageContainer = styled.div`
width:50vw;
height:100vh;
position:absolute;
${({ theLocation }) => theLocation}:0%;
overflow:hidden;
z-index:${({ heroImageZIndex }) => heroImageZIndex};
animation-name:${({ heroImageZIndex }) => heroImageZIndex === 2 ? heroImageAnimation : null};
animation-duration:${({ animationTime }) => animationTime}s;
animation-fill-mode: forwards;
animation-timing-function:linear;
`
const HeroImage50Width = styled.div`
width: 100vw;
height: 100vh;
position:absolute;
${({ theLocation }) => theLocation}:0%;
// transform: translateX(-50%);
background-image:url(${wolfy_4});
background-repeat: no-repeat;
background-size: 150%;
background-position-x: center ;
background-position-y: 80% ;
`
// 10vw要14.2%
// theLocation的值為left或right
const heroImageBlurLightAnimation = (theLocation) => keyframes`
from{
    transform:translateX(${theLocation === "left" ? -90 : 90}vw);
}
14.2%{
    transform:translateX(${theLocation === "left" ? -70 : 70}vw);
}
85.2%{
    transform:translateX(${theLocation === "left" ? -50 : 50}%) scaleX(0.2);
}
to{
    transform:translateX(${theLocation === "left" ? -50 : 50}%) scaleX(0);
}
`
const HeroImageBlurLight = styled.div`
width:40vw;
height:100vh;
background: linear-gradient(
90deg,
rgba(200,200,200,0) 0%,
rgba(200,200,200,1) 40%, 
rgba(200,200,200,1) 60%, 
rgba(200,200,200,0) 100%);
position: absolute;
${({ theLocation }) => theLocation}:50vw;
z-index:98;
animation-name:${({ heroImageZIndex, theLocation }) => {
        return heroImageZIndex === 2 ? heroImageBlurLightAnimation(theLocation) : null
    }};
animation-duration:${({ animationTime }) => animationTime}s;
animation-fill-mode: forwards;
animation-timing-function:linear;
transform:translateX(${({ theLocation }) => theLocation === "left" ? -90 : 90}vw);
`
const TheNav = styled.div`
width:${({ shouldNavExpand }) => shouldNavExpand ? 45 : 20}vw;
height:${({ shouldNavExpand }) => shouldNavExpand ? 22 : 10}vh;
position:absolute;
left:50%;
transform:translateX(-50%);
background: ${({ heroImageZIndex }) => heroImageZIndex === 1 ? "rgba( 255,255,255, 0.6 )" : "rgba( 150,150,150, 0.6 )"};
color:${({ heroImageZIndex }) => heroImageZIndex === 1 ? "black" : "white"};
box-shadow: 0px 0px 1vw 1vw rgba(200,200,200,0.4);
backdrop-filter: blur( 10.0px );
border-radius: 0px 0px 20px 20px;
transition:1s;
text-align:center;
display:${({ theNavCss }) => theNavCss.display};
opacity:${({ theNavCss }) => theNavCss.opacity};
z-index:99;
cursor:pointer;
overflow:hidden;
&:hover{
    height:22vh;
    width:45vw;
}
`
const WolfyName = styled.h4`
width:20vw;
font-size:4.5vw;
margin:auto;
transition:1s;
border-radius: 0px 0px 20px 20px;
&:hover{
    background: rgba( 255, 255, 255, 0.7 );
    box-shadow: 0px 0px 0.2vw 0.2vw rgba(200,200,200,0.6);
}
`
const LinkBox = styled.div`
position:relative;
left:50%;
transform:translateX(-50%);
width:45vw;
text-align:center;
margin:auto;
`
const Link = styled.div`
display:inline-block;
padding:0.8vw;
margin: -1.5vh 1vw 1.5vh 1vw;
font-size:2.5vw;
background-color:transparent;
cursor:pointer;
transition:1s;
border-radius:20px;
&:hover{
    background: rgba( 255, 255, 255, 0.7 );
    box-shadow: 0px 0px 0.2vw 0.2vw rgba(200,200,200,0.6);
}
`
const blurLightAnimate = keyframes`
 from{
    transform:translateY(0vh);
    //  bottom:-40vh;
    }
 11%{
    transform:translateY(-20vh);
    //  bottom:-20vh;
 }
 67%{
    transform:translateY(-120vh);
    //  bottom:80vh
 }
 to{
    transform:translateY(-180vh);
    //  bottom:140vh;
 }
`
const BlurLight = styled.div`
width:100%;
height:40vh;
background: linear-gradient(
180deg,
rgba(200,200,200,0) 0%,
rgba(200,200,200,1) 40%, 
rgba(200,200,200,1) 60%, 
rgba(200,200,200,0) 100%);
position: absolute;
bottom:-40vh;
z-index:98;
animation-name:${({ blurLightMove, heroImageZIndex }) => {
        return blurLightMove && heroImageZIndex !== 2 ? blurLightAnimate : null
    }};
animation-duration:${({ animationTime }) => animationTime}s;
animation-fill-mode: forwards;
animation-timing-function:linear;
transform:translateY(0vh);
`
// -----------------------------------------------------
let wheelSwitch = true;
let wheelSwitchCount = 0;
//---------------------------
// 該變數為開關，使TheName被點擊時TheNav不會收縮
let shouldNavExpand = true;
// -----------------------------------------------------
// pageZIndex除了是這個頁面的z-index外，同時也代表著佈署狀態
// pageZIndex為2時會將heroImage與三個子頁面反佈署
function PageWolfy({ backgroundColor, pageZIndex, animationTime }) {

    const [theNavCss, setTheNavCss] = useState({
        display: "none",
        opacity: 0,
        width: 45,
        height: 22
    });
    const [blurLightMove, setBlurLightMove] = useState(false)

    const [heroImageZIndex, setHeroImageZIndex] = useState(1);
    const [childPage1ZIndex, setChildPage1ZIndex] = useState(0);
    const [childPage2ZIndex, setChildPage2ZIndex] = useState(0);
    const [childPage3ZIndex, setChildPage3ZIndex] = useState(0);
    // ---------------------------------------
    // Container用的不會變動的css
    const staticCss = {
        backgroundColor: backgroundColor,
        animationTime: animationTime
    }
    // ------------------------------------------------------------------------
    // 部屬childPage
    // 部屬childPage
    // 部屬childPage

    // 根據blurLightMove與childPage1ZIndex的狀態決定是否執行
    const deployChildPage1 = () => {
        if (blurLightMove || childPage1ZIndex === 1) return;
        setBlurLightMove(true)
        setChildPage1ZIndex(2) //使該page在最上層，好蓋掉原本佈署的page
        wheelSwitchCount = 1; //改變滑鼠滾輪翻頁的順序
        shouldNavExpand = false;
        setTimeout(() => { //動畫結束後做下列動作
            setBlurLightMove(false)
            setHeroImageZIndex(0); // 反佈署heroImage
            setChildPage1ZIndex(1);// z-index設為1，使其他page佈署時可以蓋上去
            setChildPage2ZIndex(0);// z-index設為0，反佈署
            setChildPage3ZIndex(0);// z-index設為0，反佈署
        }, animationTime * 1000);
    }

    const deployChildPage2 = () => {
        if (blurLightMove || childPage2ZIndex === 1) return;
        setBlurLightMove(true)
        setChildPage2ZIndex(2) //使該page在最上層，好蓋掉原本佈署的page
        wheelSwitchCount = 2; //改變滑鼠滾輪翻頁的順序
        shouldNavExpand = false;
        setTimeout(() => { //動畫結束後做下列動作
            setBlurLightMove(false)
            setHeroImageZIndex(0); // 反佈署heroImage
            setChildPage2ZIndex(1);// z-index設為1，使其他page佈署時可以蓋上去
            setChildPage1ZIndex(0);// z-index設為0，反佈署
            setChildPage3ZIndex(0);// z-index設為0，反佈署
        }, animationTime * 1000);
    }

    const deployChildPage3 = () => {
        if (blurLightMove || childPage3ZIndex === 1) return;
        setBlurLightMove(true)
        setChildPage3ZIndex(2) //使該page在最上層，好蓋掉原本佈署的page
        wheelSwitchCount = 3; //改變滑鼠滾輪翻頁的順序
        shouldNavExpand = false;
        setTimeout(() => { //動畫結束後做下列動作
            setBlurLightMove(false)
            setHeroImageZIndex(0); // 反佈署heroImage
            setChildPage3ZIndex(1);// z-index設為1，使其他page佈署時可以蓋上去
            setChildPage1ZIndex(0);// z-index設為0，反佈署
            setChildPage2ZIndex(0);// z-index設為0，反佈署
        }, animationTime * 1000);
    }
    // ------------------------------------------------------------------------
    // 將所有childPage反部屬，並回到heroImage
    // 將所有childPage反部屬，並回到heroImage
    // 將所有childPage反部屬，並回到heroImage
    const undeployChildPages = useCallback(() => {
        if (blurLightMove || heroImageZIndex === 2 || heroImageZIndex === 1) return;
        setBlurLightMove(true);
        setHeroImageZIndex(2);
        wheelSwitchCount = 0; //改變滑鼠滾輪翻頁的順序
        setTimeout(() => { //動畫結束後做下列動作
            setBlurLightMove(false)
            setHeroImageZIndex(1);
            shouldNavExpand = true;
            setChildPage1ZIndex(0);// z-index設為0，反佈署
            setChildPage2ZIndex(0);// z-index設為0，反佈署
            setChildPage3ZIndex(0);// z-index設為0，反佈署
        }, animationTime * 1000);
    }, [blurLightMove, heroImageZIndex, animationTime])

    // --------------------------------------------
    // 滾動滑鼠滾輪移動頁面
    const changePage = (e) => {
        if (!wheelSwitch) return
        if (e.deltaY > 0 && wheelSwitchCount < 3) {
            wheelSwitchCount++
        } else if (e.deltaY < 0 && wheelSwitchCount > 0) {
            wheelSwitchCount--
        }

        wheelSwitchCount === 0 ? undeployChildPages() :
            wheelSwitchCount === 1 ? deployChildPage1() :
                wheelSwitchCount === 2 ? deployChildPage2() : deployChildPage3()
        wheelSwitch = false;
        setTimeout(() => {
            wheelSwitch = true
        }, animationTime * 1000)

    }
    // ------------------------------------------------------------------------
    // 根據pageZIndex改變TheNav的透明度或反部屬
    useEffect(() => {
        if (pageZIndex === 0) {
            setTheNavCss((preState) => {
                preState = {
                    ...preState,
                    display: "block"
                }
                return preState
            })
            setTimeout(() => {
                setTheNavCss((preState) => {
                    preState = {
                        ...preState,
                        opacity: 1
                    }
                    return preState;
                })
            }, 50);
        }
        if (pageZIndex === 2) {
            setTheNavCss({ display: "none", opacity: 0, height: 22 })//當pageWolfy反佈署後，將TheNav回到初始狀態
            undeployChildPages(); //當pageWolfy反佈署後，反佈署heroImage
            setBlurLightMove(false); // 切換BlurLightMove的開關，使其可移動
        }
    }, [pageZIndex, undeployChildPages]);
    // -------------------------------------------------
    // -------------------------------------------------

    return (
        pageZIndex === 2 ? "" :
            <Container onWheel={pageZIndex === 0 ? changePage : null}>
                {pageZIndex === 1 && <HeroImage100Width />}
                {pageZIndex === 0 && <>
                    <HeroImageContainer theLocation={"left"} animationTime={animationTime} heroImageZIndex={heroImageZIndex}>
                        <HeroImage50Width theLocation={"left"} />
                    </HeroImageContainer>
                    <HeroImageContainer theLocation={"right"} animationTime={animationTime} heroImageZIndex={heroImageZIndex}>
                        <HeroImage50Width theLocation={"right"} />
                    </HeroImageContainer>
                    <TheNav theNavCss={theNavCss} heroImageZIndex={heroImageZIndex} blurLightMove={blurLightMove} shouldNavExpand={shouldNavExpand}>
                        <WolfyName onClick={() => { undeployChildPages(); shouldNavExpand = true; }}>WOLFY</WolfyName>
                        <br />
                        <LinkBox>
                            <Link onClick={deployChildPage1} buttonColor={backgroundColor}>基本資料</Link>
                            <Link onClick={deployChildPage2} buttonColor={backgroundColor}>生平事蹟</Link>
                            <Link onClick={deployChildPage3} buttonColor={backgroundColor}>精選照片</Link>
                        </LinkBox>
                    </TheNav >
                    <ChildPage1 staticCss={staticCss} childPageZIndex={childPage1ZIndex} />
                    <ChildPage2 staticCss={staticCss} childPageZIndex={childPage2ZIndex} />
                    <ChildPage3 staticCss={staticCss} childPageZIndex={childPage3ZIndex} pageZIndex={pageZIndex} />
                    <BlurLight blurLightMove={blurLightMove} heroImageZIndex={heroImageZIndex} animationTime={animationTime} />
                    <HeroImageBlurLight heroImageZIndex={heroImageZIndex} animationTime={animationTime} theLocation={"left"} />
                    <HeroImageBlurLight heroImageZIndex={heroImageZIndex} animationTime={animationTime} theLocation={"right"} />
                </>}
            </Container>
    )
}

export default PageWolfy;
