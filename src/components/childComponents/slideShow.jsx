// 照片都已經被裁減為6:4
// 同時照片的顯示大小用CSS設定成width:120vh
// 每一個cube width:20vh; height:20vh;
// 每一個cube的background-postion也是用20vh為一個單位來調整

import { useState, useEffect } from "react"
import styled from "@emotion/styled"



function importAllImagesWithArray(theRequireContext) {
    let images = []
    const requireContext = theRequireContext;
    requireContext.keys().map((item, index) => { images[index] = requireContext(item).default; return "" });
    return images;
}
const imgArr = importAllImagesWithArray(require.context("img/index_show", false, /^\.\/.*\.jpg$/))



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
let ShowBoxCube = styled.div`
width: 20vh;
height: 20vh;
background-color: rgba(255, 255, 255, 1);
background-size: 120vh;
background-position:${(props) => { return (props.theStyle.positionX) }} ${(props) => { return (props.theStyle.positionY) }};
opacity:${(props) => { return props.theStyle.opacity }};
background-image:${props => props.theStyle.backgroundImage};
transition:${props => props.theStyle.transition};
`

//產生24個<ShowBoxCube/>並且依照位置設定background-postion與opacity還有className
function photoCube(num, cubeState) {
    let cubeClass;
    if (num === 1) {
        cubeClass = "ShowBox1Cube";
    } else {
        cubeClass = "ShowBox2Cube";
    }
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
        cubeArr.push(<ShowBoxCube className={cubeClass} key={i}
            theStyle={{
                positionX: positionX,
                positionY: positionY,
                ...cubeState[i]
            }}
        />)
    }
    return cubeArr;
}



//cubeState陣列  每一個cube都會對應到cube1StateArr中的一個物件，作為其專屬的state
//這個專屬的state物件內容為backgroundImage、opacity、transition這三項CSS
//如果為每一個cube進行一次useState太麻煩了，所以才把每個cube的動態css裝進陣列後再用useState
let cube1StateArr = []
let cube2StateArr = []
//cube陣列style的初始值
for (let i = 0; i < 24; i++) {
    cube1StateArr[i] = { backgroundImage: `url(${imgArr[0]})`, opacity: 0, transition: "0s" }
    cube2StateArr[i] = { backgroundImage: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)", opacity: 1, transition: "0s" }
}


function SlideShow() {
    // cube陣列的state陣列
    let [cube1State, setCube1State] = useState(cube1StateArr);
    let [cube2State, setCube2State] = useState(cube2StateArr);
    // 生成cube陣列並將state陣列作為引數放進去，以建立Style
    // 之後只要改變state就能改變cube的style
    let cubeArr1 = photoCube(1, cube1State);
    let cubeArr2 = photoCube(2, cube2State);


    useEffect(() => { //為避免setInterval多次被呼叫，使用useEffect
        // 這是cubeStateArr的Index的Arr,內容為[1,2,3,4,5,6,7.......]
        // 用來隨機選取cube同時避免選到選過的cube
        let cubeStateArrIndexArr = [];
        for (let i = 0; i < cube1StateArr.length; i++) {
            cubeStateArrIndexArr.push(i)
        }
        let [...cubeStateArrIndexArrCopy] = cubeStateArrIndexArr; //cubeStateArrIndexArr的副本，方便開始新循環

        //第一次循環的值，上層不透明化，下層透明化，與建立cubeArr時的初始值相比，改變了opacity與transition
        let Cube1Style = { backgroundImage: `url(${imgArr[0]})`, opacity: 1, transition: "5s" }
        let Cube2Style = { backgroundImage: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)", opacity: 0, transition: "2s" }

        // 用來避免選到同樣圖片用的變數
        let imgRenew;
        let oldImg;
        let oldOldImg;
        let oldOldOldImg;
        let oldOldOldOldImg;

        let intervalId; //將intervalId在showStart外面宣告，使useEffect最後return callBack時可以使用這個變數

        let showStart = () => {
            intervalId = setInterval(() => {
                //根據cubeStateArrIndexArr的長度隨機選取一個index
                let cubeStateArrIndex = Math.floor(Math.random() * cubeStateArrIndexArr.length)
                //根據上面選取的Index取出該值(item)，並且把該item去掉，這樣就能避免選到同一個值
                let theIndex = cubeStateArrIndexArr.splice(cubeStateArrIndex, 1)[0]
                //改變state，逐一改變cube的透明度
                setCube1State((pre) => {
                    pre[theIndex] = { ...Cube1Style };
                    return { ...pre }
                })
                setCube2State((pre) => {
                    pre[theIndex] = { ...Cube2Style };
                    return { ...pre }
                })

                // 當cubeStateArrIndexArr.length為0的時候，這次的循環結束
                // 並更動數值後進行下一次循環
                if (cubeStateArrIndexArr.length === 0) {
                    //將cubeStateArrIndexArr回復為原本的狀態[1,2,3,4,5.....]的狀態
                    [...cubeStateArrIndexArr] = cubeStateArrIndexArrCopy;

                    //改變上下層的style，包括圖片路徑、透明度、漸變秒數
                    // 先取得隨機圖片，為了避免取得相同的圖片，要做一些演算
                    (function renewImg() {
                        imgRenew = imgArr[Math.floor(Math.random() * imgArr.length)];
                        if (imgRenew === oldImg || imgRenew === oldOldImg || imgRenew === oldOldOldImg || imgRenew === oldOldOldOldImg) {
                            renewImg();
                        }
                    })();
                    // 更新四張內被選過的照片
                    oldOldOldOldImg = oldOldOldImg;
                    oldOldOldImg = oldOldImg;
                    oldOldImg = oldImg;
                    oldImg = imgRenew;

                    // // // State裡裝的是array，pre卻是物件!?，這是怎麼回事

                    // 殘影的問題
                    // 當多個setState在同一個循環被呼叫的時候，setState會被放進一個隊列並依序改變state
                    // 當隊列中的setState都執行完了才會render，而不是一被呼叫就render。
                    // 因此，如果同一個setState在同一循環被呼叫多次，
                    // 那麼先被呼叫的setState所改變的值就會被後呼叫所改變的值蓋掉
                    // 若要避免先被呼叫的setState在render之前就被後呼叫的蓋掉
                    // 可以將後呼叫的setState包在setTimeout中，這樣就能在循環結束後才被呼叫，並開始另一個循環。
                    // 要注意的是，setTimeout的時間不能小於循環的時間
                    // 如果在程式跑完，要正常呼叫的setState呼叫完之前，setTimeout就時間到而呼叫了該延遲的setState
                    // 該setState就會加入隊列並蓋掉先呼叫的setState

                    // 為了避免殘影的問題，除了延遲後呼叫的setState外，我也可以提前呼叫先呼叫的setState
                    // 而在每一輪結束後開始前都有一個空檔，這時就可以提前呼叫
                    // 原本要根據Cube1Style.opacity === 0來判斷接著哪層會變不透明從而事先改變圖片
                    // 但因為這邊兩秒後才會運算，這時原本為0的Cube1Style.opacity已經變成1了
                    // 所以判斷式為Cube1Style.opacity === 1
                    // 兩秒後才運算是因為漸變時間為兩秒，若setTimeout的時間少於兩秒，會使的圖片還沒變完就換了圖片
                    setTimeout(() => {
                        if (Cube1Style.opacity === 1) {
                            setCube1State((pre) => {
                                for (let i = 0; i < cube1State.length; i++) {
                                    pre[i].backgroundImage = `url(${imgRenew})`
                                }
                                return { ...pre }
                            })
                        } else {
                            setCube2State((pre) => {
                                for (let i = 0; i < cube1State.length; i++) {
                                    pre[i].backgroundImage = `url(${imgRenew})`
                                }
                                return { ...pre }
                            })
                        }
                    }, 2000);

                    // 改變Cube1Style與Cube2Style的內容，在下一輪根據內容改變cube1State與cube2State
                    // 雖然用if可以判斷一次就好，但是可讀性較差，行數也變為兩倍，所以決定還是用三元運算子
                    Cube1Style = {
                        backgroundImage: Cube1Style.opacity === 0 ? `url(${imgRenew})` : Cube1Style.backgroundImage,
                        opacity: Cube1Style.opacity === 0 ? 1 : 0,
                        transition: Cube1Style.opacity === 0 ? "5s" : "2s"
                    }
                    Cube2Style = {
                        backgroundImage: Cube2Style.opacity === 0 ? `url(${imgRenew})` : Cube2Style.backgroundImage,
                        opacity: Cube2Style.opacity === 0 ? 1 : 0,
                        transition: Cube2Style.opacity === 0 ? "5s" : "2s"
                    }
                    // 結束這一輪循環
                    clearInterval(intervalId)
                    // 6秒後開始下一輪循環
                    setTimeout(() => {
                        showStart();
                    }, 6000);
                }
            }, 200);
        }
        showStart()

        return () => {
            clearInterval(intervalId)
        }
    }, [cube1State.length]) // 系統警告我要把cube1State.length放進去，不知道為什麼





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