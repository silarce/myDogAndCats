

import { useState, useEffect } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";


import ChildPage1 from "./wolfyComponent/ChildPage1.jsx";
import ChildPage2 from "./wolfyComponent/ChildPage2.jsx";
import ChildPage3 from "./wolfyComponent/ChildPage3.jsx";

import wolfy_4 from "../../img/Wolfy_img/Wolfy_4.jpg";


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
animation-duration:${({ pageTransition }) => pageTransition}s;
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
const heroImageBlurLightAnimation = (theLocation) => keyframes`
from{
    ${theLocation}:-20vw;
}
14.2%{
    ${theLocation}:0vw;
}
85.2%{
    ${theLocation}:50vw;
}
to{
    ${theLocation}:50vw;
    width:0vw;
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
${({ theLocation }) => theLocation}:-20vw;
z-index:98;
animation-name:${({ heroImageZIndex, theLocation }) => {
        return heroImageZIndex === 2 ? heroImageBlurLightAnimation(theLocation) : null
    }};
animation-duration:${({ pageTransition }) => pageTransition}s;
animation-fill-mode: forwards;
animation-timing-function:linear;
transform:translateX(${({ theLocation }) => theLocation === "left" ? -50 : 50}%);
`
// width:${({heroImageZIndex})=> heroImageZIndex===1||heroImageZIndex===2? 45:20}vw;
// height:${({heroImageZIndex})=> heroImageZIndex===1||heroImageZIndex===2? 22:10}vh;
const TheNav = styled.div`
width:${({heroImageZIndex})=> heroImageZIndex===1? 45:20}vw;
height:${({heroImageZIndex})=> heroImageZIndex===1? 22:10}vh;
position:absolute;
left:50%;
transform:translateX(-50%);
background: ${({heroImageZIndex})=> heroImageZIndex===1? "rgba( 255,255,255, 0.6 )":"rgba( 150,150,150, 0.6 )"};
color:${({heroImageZIndex})=> heroImageZIndex===1? "black":"white"};
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
     bottom:-40vh;
    }
 11%{
     bottom:-20vh;
 }
 67%{
     bottom:80vh
 }
 to{
     bottom:140vh;
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
animation-duration:${({ pageTransition }) => pageTransition}s;
animation-fill-mode: forwards;
animation-timing-function:linear;
`
// -----------------------------------------------------
let wheelSwitch = true;
let wheelSwitchCount = 0;
//---------------------------
// 該變數為開關，使TheName被點擊時TheNav不會收縮
let 
// -----------------------------------------------------
// pageZIndex除了是這個頁面的z-index外，同時也代表著佈署狀態
// pageZIndex為2時會將heroImage與三個子頁面反佈署
function PageWolfy({ pageWidth, pagePositionTop, backgroundColor, pageZIndex }) {

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
    let pageTransition = 2;// 頁面移動的時長，單位為秒
    // ---------------------------------------
    const staticCss = {
        backgroundColor: backgroundColor,
        pageTransition: pageTransition
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
    }, [pageZIndex]);
    // ------------------------------------------------------------------------
    // 部屬導覽列
    // useEffect(() => {
    //     if (heroImageZIndex === 0) {
    //         setTheNavCss((preState) => {
    //             preState = { ...preState, width: 20, height: 10 }
    //             return preState
    //         })
    //     }else{
    //         setTheNavCss((preState) => {
    //             preState = { ...preState, width: 45, height: 22 }
    //             return preState
    //         })

    //     }
        
    // }, [heroImageZIndex])

    // ------------------------------------------------------------------------
    // 部屬childPage
    // 部屬childPage
    // 部屬childPage

    // 根據blurLightMove與childPage1ZIndex的狀態決定是否執行
    const deployChildPage1 = () => {
        if (blurLightMove || childPage1ZIndex === 1) return;
        setBlurLightMove(true)
        setChildPage1ZIndex(2) //使該page在最上層，好蓋掉原本佈署的page
        wheelSwitchCount=1; //改變滑鼠滾輪翻頁的順序
        setTimeout(() => { //動畫結束後做下列動作
            setBlurLightMove(false)
            setHeroImageZIndex(0); // 反佈署heroImage
            setChildPage1ZIndex(1);// z-index設為1，使其他page佈署時可以蓋上去
            setChildPage2ZIndex(0);// z-index設為0，反佈署
            setChildPage3ZIndex(0);// z-index設為0，反佈署
        }, pageTransition * 1000);
    }

    const deployChildPage2 = () => {
        if (blurLightMove || childPage2ZIndex === 1) return;
        setBlurLightMove(true)
        setChildPage2ZIndex(2) //使該page在最上層，好蓋掉原本佈署的page
        wheelSwitchCount=2; //改變滑鼠滾輪翻頁的順序
        setTimeout(() => { //動畫結束後做下列動作
            setBlurLightMove(false)
            setHeroImageZIndex(0); // 反佈署heroImage
            setChildPage2ZIndex(1);// z-index設為1，使其他page佈署時可以蓋上去
            setChildPage1ZIndex(0);// z-index設為0，反佈署
            setChildPage3ZIndex(0);// z-index設為0，反佈署
        }, pageTransition * 1000);
    }

    const deployChildPage3 = () => {
        if (blurLightMove || childPage3ZIndex === 1) return;
        setBlurLightMove(true)
        setChildPage3ZIndex(2) //使該page在最上層，好蓋掉原本佈署的page
        wheelSwitchCount=3; //改變滑鼠滾輪翻頁的順序
        setTimeout(() => { //動畫結束後做下列動作
            setBlurLightMove(false)
            setHeroImageZIndex(0); // 反佈署heroImage
            setChildPage3ZIndex(1);// z-index設為1，使其他page佈署時可以蓋上去
            setChildPage1ZIndex(0);// z-index設為0，反佈署
            setChildPage2ZIndex(0);// z-index設為0，反佈署
        }, pageTransition * 1000);
    }
    // ------------------------------------------------------------------------
    // 將所有childPage反部屬，並回到第一頁
    // 將所有childPage反部屬，並回到第一頁
    // 將所有childPage反部屬，並回到第一頁
    const undeployChildPages = () => {
        if (blurLightMove || heroImageZIndex === 2 || heroImageZIndex === 1) return;
        setBlurLightMove(true);
        setHeroImageZIndex(2);
        wheelSwitchCount=0; //改變滑鼠滾輪翻頁的順序
        setTimeout(() => { //動畫結束後做下列動作
            setBlurLightMove(false)
            setHeroImageZIndex(1);
            setChildPage1ZIndex(0);// z-index設為0，反佈署
            setChildPage2ZIndex(0);// z-index設為0，反佈署
            setChildPage3ZIndex(0);// z-index設為0，反佈署
        }, pageTransition * 1000);
    }

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
        wheelSwitch = false
        setTimeout(() => {
            wheelSwitch = true
        }, pageTransition*1000)

    }
    // -------------------------------------------------


    return (
        <>
            <Container onWheel={changePage}>
                {pageZIndex == 1 && <HeroImage100Width />}
                <HeroImageContainer theLocation={"left"} pageTransition={pageTransition} heroImageZIndex={heroImageZIndex}>
                    <HeroImage50Width theLocation={"left"} />
                </HeroImageContainer>
                <HeroImageContainer theLocation={"right"} pageTransition={pageTransition} heroImageZIndex={heroImageZIndex}>
                    <HeroImage50Width theLocation={"right"} />
                </HeroImageContainer>

                <TheNav theNavCss={theNavCss} heroImageZIndex={heroImageZIndex} blurLightMove={blurLightMove}>
                    <WolfyName onClick={undeployChildPages}>WOLFY</WolfyName>
                    <br />
                    <LinkBox>
                        <Link onClick={deployChildPage1} buttonColor={backgroundColor}>基本資料</Link>
                        <Link onClick={deployChildPage2} buttonColor={backgroundColor}>生平事蹟</Link>
                        <Link onClick={deployChildPage3} buttonColor={backgroundColor}>精選照片</Link>
                    </LinkBox>
                </TheNav >
                <ChildPage1 staticCss={staticCss} childPageZIndex={childPage1ZIndex} />
                <ChildPage2 staticCss={staticCss} childPageZIndex={childPage2ZIndex} />
                <ChildPage3 staticCss={staticCss} childPageZIndex={childPage3ZIndex} />
                <BlurLight blurLightMove={blurLightMove} heroImageZIndex={heroImageZIndex} pageTransition={pageTransition} />
                <HeroImageBlurLight heroImageZIndex={heroImageZIndex} pageTransition={pageTransition} theLocation={"left"} />
                <HeroImageBlurLight heroImageZIndex={heroImageZIndex} pageTransition={pageTransition} theLocation={"right"} />
            </Container>
        </>
    )
}

export default PageWolfy;
