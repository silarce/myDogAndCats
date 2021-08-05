//為了開發方便，要這樣設置，開發完後再改回去
// const [heroPositionX, setHeroPositionX] = useState(0)

import { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { ArrowIosDownward } from "@emotion-icons/evaicons-solid/ArrowIosDownward";

import ChildPage1 from "./lunaComponent/ChildPage1.jsx";
import ChildPage2 from "./lunaComponent/ChildPage2.jsx";
import ChildPage3 from "./lunaComponent/ChildPage3.jsx";

import Luna_13 from "../../img/Luna_img/Luna_13.jpg";


const Container = styled.div`
position:relative;
overflow:hidden;
width:100%;
height:100%;
z-index:0;
`
const HeroImage = styled.div`
width: 100vw;
height: 100vh;
background-image: linear-gradient(
    270deg, rgba(255,255,255,0) 0%,  rgba(255,255,255,0.3) 50%, rgba(240,240,240,1) 75%, rgba(240,240,240,1) 100%),
    url(${Luna_13});
    background-repeat: no-repeat;
    background-size: 100% 100%, 120vw;
    background-position-x: ${({ heroPositionX }) => heroPositionX}% ;
    background-position-y: 50% ;
    z-index: 0;
    position:absolute;
    right:0%;
    `
const TheName = styled.h1`
position:absolute;
font-size:6vw;
right:71%;
top:10%;
transition:2s;
display:${({ theNameCss }) => theNameCss.display};
opacity:${({ theNameCss }) => theNameCss.opacity};
`
const Link = styled.div`
font-size:2.5vw;
padding:0.8vw;
margin: 1.5vh 1vw 1.5vh 6vw;
cursor:pointer;
border-radius:10px;
transition:0.5s;
background-color:transparent;
&:hover{
    background-color:${({ buttonColor }) => buttonColor};
}
`

// -----------------------------------------------------
// 導覽列
const Nav = styled.div`
position:absolute;
top:0;
right:0;
margin:0;
width:20vw;
height:45vh;
z-index:99;
transition:${({ navTransition }) => navTransition}s;
opacity:${({ navOpacity }) => navOpacity}
`
// -----------------------------------------------------
// 左上方大大的文字
const Title = styled.h2`
font-size:5vw;
margin:0;
text-align:center;
cursor:${({ titleCursor }) => titleCursor};
`
// -----------------------------------------------------
const TheHr = styled.hr`
width:15vw;
margin-top:-5px;
margin-bottom:7px;
border:none;
height:2px;
background-color:black;
`
// -----------------------------------------------------
// 導覽列按鈕的容器
const Link2Container = styled.div`
background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
width:100%;
height:14vw;
margin:auto;
transition:1s;
display:${({ Link2ContainerDisplay }) => Link2ContainerDisplay};
opacity:${({ Link2ContainerOpacity }) => Link2ContainerOpacity};
`
// 導覽列裡的按鈕
const Link2 = styled.div`
text-align:center;
margin: -1.8vw auto 2.3vw auto;
width:15vw;
font-size:2.8vw;
padding:0.5vw;
cursor:pointer;
border-radius:10px;
transition:1s;
background-color:transparent;
&:hover{
    background-color:white;
}
`
// -----------------------------------------------------
// 這兩個組件是導覽列下緣的兩個下箭頭符號(很平的下箭頭)
const ArrowContainer = styled.div`
text-align: center;
margin-top: -13px;
position:relative;
transition:1s;
top:13vw;
top:${({ arrowContainerTop }) => arrowContainerTop}vw;
`
const DownArrow = styled(ArrowIosDownward)`
width:1vw;
transform:scale(26,1.5);
`
// -----------------------------------------------------

let pageTransition = 2;// 頁面移動的時長，單位為秒
//---------------------------
// 以下10項變數都是用於頁面移動的開關與參數
// 為了避免在頁面移動時再次觸發移動而造成BUG而做了這些開關
let wheelSwitch = true;
let wheelSwitchCount = 0;
let navIsDeployed = false; // 檢查導覽列是否已佈署，若已佈署則無法再次佈署
let navIsClosing = false;  // 檢查導覽列是否正在關閉，若正在關閉則無法佈署頁面
// 為了將址傳進setTimeout而寫成物件
let childPage_1_isMoving = { moving: false };
let childPage_2_isMoving = { moving: false };
let childPage_3_isMoving = { moving: false };
// 為了將時間未到的setTimeout清除並重新計時，而需要這些物件
let childPage_1_setTimeoutId = { id: 0 };
let childPage_2_setTimeoutId = { id: 0 };
let childPage_3_setTimeoutId = { id: 0 };
//---------------------------
// -----------------------------------------------------
function PageLuna({ pageWidth, pagePositionTop, backgroundColor, pageZIndex }) {

    const [heroPositionX, setHeroPositionX] = useState(0) // heroImage的backgroundPositionX

    // const [heroPositionX, setHeroPositionX] = useState(0); // 方便開發時的設置
    const [theNameCss, setTheNameCss] = useState({ display: "none", opacity: 0 });
    const [navOpacity, setNavOpacity] = useState(0)
    const [navTransition, setNavTransition] = useState(pageTransition)
    const [Link2ContainerDisplay, setLink2ContainerDisplay] = useState("none")
    const [Link2ContainerOpacity, setLink2ContainerOpacity] = useState(0)
    const [titleCursor, setTitleCursor] = useState("default")
    const [arrowContainerTop, setArrowContainerTop] = useState(0);

    const [childPage1Top, setChildPage1Top] = useState(100);
    const [childPage2Top, setChildPage2Top] = useState(100);
    const [childPage3Top, setChildPage3Top] = useState(100);
    // ------------------------------------------------------------------------
    // 在頁面展開時移動圖片
    useEffect(() => {
        if (pageWidth > 20 && pageWidth < 100) {
            setHeroPositionX((preState) => {
                if (preState < 80) {
                    return preState + 1
                }
                return 80
            })
        }
    }, [pageWidth])
    // 頁面回到原位時使HeroPositionX改回 0
    useEffect(() => {
        if (pagePositionTop === -120) {
            setHeroPositionX(0)
        }
    }, [pagePositionTop])

    useEffect(() => {
        if (pageZIndex === 0) {
            setTheNameCss({ display: "block", opacity: 0 })
            setTimeout(() => {
                setTheNameCss({ display: "block", opacity: 1 })
            }, 50);
        } else {
            setTheNameCss({ display: "none", opacity: 0 })
        };
        if (pageZIndex === 2) {
            undeployChildPages();
        }
    }, [pageZIndex])
    // ------------------------------------------------------------------------
    // 部屬導覽列
    const deployNav = () => {
        if (navIsDeployed) return;
        navIsDeployed = true;
        setTitleCursor("pointer")
        setTimeout(() => {
            setNavOpacity(1);
            setArrowContainerTop(13.3);
            setLink2ContainerDisplay("block");
            setTimeout(() => {
                setLink2ContainerOpacity(1);
            }, 1000);
        }, pageTransition * 1000);
    }
    // 將childPage
    const childPageIsStop = (moving, setTimeId) => {
        clearTimeout(setTimeId.id)
        setTimeId.id = setTimeout(() => {
            moving.moving = false
        }, pageTransition * 1000);
    }

    // ------------------------------------------------------------------------

    const deployChildPage1 = () => {
        // 若是在頁面移動時點擊title會發生BUG
        // 因此設置開關避免這樣的問題
        if (navIsClosing === true) return
        childPage_1_isMoving.moving = true;
        childPageIsStop(
            childPage_1_isMoving,
            childPage_1_setTimeoutId)
        setChildPage1Top(0)
        setChildPage2Top(100)
        setChildPage3Top(100)
        deployNav();
        // 同步滾輪計數器
        wheelSwitchCount = 1;
    };

    const deployChildPage2 = () => {
        if (navIsClosing === true) return
        childPage_2_isMoving.moving = true;
        childPageIsStop(
            childPage_2_isMoving,
            childPage_2_setTimeoutId)
        setChildPage1Top(0);
        setChildPage2Top(0);
        setChildPage3Top(100);
        deployNav();
        wheelSwitchCount = 2;
    }

    const deployChildPage3 = () => {
        if (navIsClosing === true) return
        childPage_3_isMoving.moving = true;
        childPageIsStop(
            childPage_3_isMoving,
            childPage_3_setTimeoutId)
        setChildPage1Top(0);
        setChildPage2Top(0);
        setChildPage3Top(0);
        deployNav();
        wheelSwitchCount = 3;
    }
    // ------------------------------------------------------------------------
    // 回到第一頁並反部屬導覽列

    const undeployChildPages = () => {
        if (childPage_1_isMoving.moving ||
            childPage_2_isMoving.moving ||
            childPage_3_isMoving.moving) return;
        setChildPage1Top(100);
        setChildPage2Top(100);
        setChildPage3Top(100);
        setNavOpacity(0);
        setArrowContainerTop(0);
        setLink2ContainerOpacity(0);
        setNavTransition(0.5);
        setTitleCursor("default")
        navIsClosing = true
        setTimeout(() => {
            setNavTransition(2);
            setLink2ContainerDisplay("none");
            navIsClosing = false;
            navIsDeployed = false;
        }, 500);
        wheelSwitchCount = 0;
    }

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
        }, 300)

    }

    return (
        <>
            <Container onWheel={changePage}>
                <Nav backgroundColor={backgroundColor} navOpacity={navOpacity} navTransition={navTransition}>
                    <Title onClick={undeployChildPages} titleCursor={titleCursor}>LUNA</Title>
                    <TheHr />
                    <TheHr />
                    <ArrowContainer arrowContainerTop={arrowContainerTop} >
                        <DownArrow />
                        <br />
                        <DownArrow style={{ marginTop: "-25px" }} />
                    </ArrowContainer>
                    <Link2Container Link2ContainerDisplay={Link2ContainerDisplay} Link2ContainerOpacity={Link2ContainerOpacity}>
                        <Link2 onClick={deployChildPage1} buttonColor={backgroundColor}>基本資料</Link2>
                        <Link2 onClick={deployChildPage2} buttonColor={backgroundColor}>生平事蹟</Link2>
                        <Link2 onClick={deployChildPage3} buttonColor={backgroundColor}>精選照片</Link2>
                    </Link2Container>
                </Nav>
                <HeroImage heroPositionX={heroPositionX}>
                    <TheName theNameCss={theNameCss}>
                        LUNA
                        <Link onClick={deployChildPage1} buttonColor={backgroundColor}>基本資料</Link>
                        <Link onClick={deployChildPage2} buttonColor={backgroundColor}>生平事蹟</Link>
                        <Link onClick={deployChildPage3} buttonColor={backgroundColor}>精選照片</Link>
                    </TheName >
                </HeroImage>
                <ChildPage1 backgroundColor={backgroundColor} childPage1Top={childPage1Top} pageTransition={pageTransition} />
                <ChildPage2 backgroundColor={backgroundColor} childPage2Top={childPage2Top} pageTransition={pageTransition} />
                <ChildPage3 backgroundColor={backgroundColor} childPage3Top={childPage3Top} pageTransition={pageTransition} pageZIndex={pageZIndex} />
            </Container>
        </>
    )
}

export default PageLuna;
