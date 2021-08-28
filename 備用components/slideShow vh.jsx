// 照片都已經被裁減為6:4
// 同時照片的顯示大小用CSS設定成width:120vh
// 每一個cube width:20vh; height:20vh;
// 每一個cube的background-postion也是用20vh為一個單位來調整

import { useState, useEffect } from "react"
import styled from "@emotion/styled"

// 將指定資料夾的所有.jpg檔案全部匯入並以陣列的型式宣告為imgArr
function importAllImagesWithArray(theRequireContext) {
    let images = []
    const requireContext = theRequireContext;
    requireContext.keys().map((item, index) => { images[index] = requireContext(item).default; return "" });
    return images;
}
const imgArr = importAllImagesWithArray(require.context("img/index_show", false, /^\.\/.*\.jpg$/))

// 裝ShowBox的容器
let ShowContainer = styled.div`
background-color: #fff;
width:120vh;
height: 80vh;
margin: 12vh auto 4vh auto;
position: relative;
`
// 裝cube的盒子
let ShowBox = styled.div` 
width: 120vh;
height: 80vh;
display: grid;
grid-template-columns: repeat(6, 1fr);
background-size: 120vh;
position: absolute;
`
//顯示圖片用的cube
const fadeInDuration = 5000; //淡入時間
const fadeOutDuration = 2000; //淡出時間
let ShowBoxCube = styled.div`
width: 20vh;
height: 20vh;
background-size: 120vh;
background-position:${({ position }) => position};
opacity:${({ fade }) => fade ? 1 : 0};
background-image:${({ backgroundImage }) => backgroundImage};
transition:${({ fade }) => fade ? fadeInDuration : fadeOutDuration}ms, background-image 0ms;
transition-delay:${({ transitionDelay }) => transitionDelay}ms;
transition-property:opacity;
`

//產生24個<ShowBoxCube/>並且依照位置設定background-postion與必要的props
function photoCube(cubeState, transitionDelayArr) {
    let cubeArr = [];
    let i;
    let j = 6;
    let k = 4;
    let positionX;
    let positionY;
    for (i = 0; i < 24; i++) {
        if (j === 0) { j = 6; k-- };
        positionX = `${j * 20}vh`
        positionY = `${k * 20}vh`
        j--
        cubeArr.push(<ShowBoxCube key={i}
            position={`${positionX} ${positionY}`}
            fade={cubeState.fade}
            backgroundImage={cubeState.backgroundImage}
            transitionDelay={transitionDelayArr[i]}
        />)
    }
    return cubeArr;
}

//洗牌演算法
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
        const rand = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr;
}
// transitionDelay陣列，在之後的每一次迭代都要亂數排序一次
// 然後代入setTransitionDelayArr()執行，這樣就能亂數改變方塊變動的順序
const transitionDelayArrInit = []
const transitionDelayUnit = 200; // 每一個cube淡近淡出的間隔時間，單位為ms
for (let i = 0; i < 24; i++) {
    transitionDelayArrInit[i] = transitionDelayUnit * (i + 1)
}
// 將transitionDelayArrInit亂數排序，之後代入下面的useState
shuffle(transitionDelayArrInit);

function SlideShow() {
    // cube陣列的state
    // fade為false會淡出，為true會淡入
    const [cube1State, setCube1State] = useState({ fade: false, backgroundImage: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)" });
    const [cube2State, setCube2State] = useState({ fade: true, backgroundImage: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)" });
    // 上下層每一個cube都會依據自身的index代入transitionDelayArr[index]，這樣就能使不同層同一個位置cube的transition-delay一樣
    const [transitionDelayArr, setTransitionDelayArr] = useState(transitionDelayArrInit)
    
    // 生成圖片方塊，也就是cube
    const cubeArr1 = photoCube(cube1State, transitionDelayArr); //下層
    const cubeArr2 = photoCube(cube2State, transitionDelayArr); //上層
    // 每一次迭代的間隔時間
    // 24 * 200 + 5000 + 1000， 最後一個值可以隨意調整，最好不要為負數，不然在cube淡入完之前就會開始下一次迭代
    const iterationDelay = transitionDelayArr.length * transitionDelayUnit + fadeInDuration + 1000; 
    
    useEffect(() => {
        let imageChoosed = [999, 999, 999, 999] //用來紀錄剛剛選過的四個圖片，避免在四個迭代內出現同樣的圖片
        let newImg;
        // 選擇新圖片
        const chooseImage = () => {
            newImg = Math.floor(Math.random() * imgArr.length);
            //如果選到的圖片跟imageChoosed一樣，就再選一次，直到選到不一樣的
            if (imageChoosed.includes(newImg)) { chooseImage() } else { 
                imageChoosed.unshift(newImg); //將這次選到的圖片放進imageChoosed，使其暫時不能再次被選到
                imageChoosed.pop(); //將最舊的圖片移出imageChoosed，使其可以被選到
            }
        }
        // 改變狀態使上下層交替淡入與淡出，淡入層會改變圖片
        const changeImage = () => {
            chooseImage();
            setTransitionDelayArr(shuffle(transitionDelayArrInit))
            setCube1State((preState) => {
                return {
                    fade: !preState.fade,
                    backgroundImage: preState.fade ? preState.backgroundImage : `url(${imgArr[newImg]})`
                }
            })
            setCube2State((preState) => {
                return {
                    fade: !preState.fade,
                    backgroundImage: preState.fade ? preState.backgroundImage : `url(${imgArr[newImg]})`
                }
            })
        }
        // 第一次執行changeImage
        // 在卸載這個slideShow(也就是這個元件)後再裝載時，時常會出現BUG，
        // BUG為，第一次迭代時，照片就全顯現、沒有淡入淡出的動畫
        // 猜測是因為初始State在導入並改變DOM元素之前就setState，
        // 使的DOM元素的初始css直接導入了漸變後的state，就不會漸變了
        // 使用setTimeout()延遲呼叫changeImage()就能避免這樣的問題
        setTimeout(() => {
            changeImage();
        }, 100);
        // 每iterationDelay毫秒呼叫一次changeImage()
        let intervalId = setInterval(() => {
            changeImage();
        }, iterationDelay)
        
        return () => {
            // 卸載時清除interval
            clearInterval(intervalId);
        }
    }, [iterationDelay])

    return (
        <>
            <ShowContainer id="ShowContainer">
                <ShowBox id="ShowBox1"  >
                    {cubeArr1}
                </ShowBox>
                <ShowBox id="ShowBox2">
                    {cubeArr2}
                </ShowBox>
            </ShowContainer>
        </>
    )
}

export default SlideShow;