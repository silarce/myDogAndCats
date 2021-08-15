import styled from "@emotion/styled";

const ThePhotoQueue = styled.div`
width:8vw;
height:100%;
position:absolute;
top:50%;
${({ location }) => location}:0%;
transform:translate(${({ location }) => location === "left" ? -50 : 50}%,${({ cssTranslateY }) => cssTranslateY}%);
transition:${({ cssTransition }) => cssTransition}s;
transition-timing-function: linear;
`
// const ThePhotoQueue = styled.div`
// width:8vw;
// height:100%;
// position:absolute;
// top:50%;
// left:50%;
// transform:translate(${({ cssTranslateX }) => cssTranslateX}%,${({ cssTranslateY }) => cssTranslateY}%);
// transition:${({ cssTransition }) => cssTransition}s;
// transition-timing-function: linear;
// `
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


function PhotoQueue({ imgArr, bigImgArr, setBigPhotoSrc, location, cssTranslateY, cssTransition }) {
    

    return (
        <ThePhotoQueue location={location} cssTranslateY={cssTranslateY} cssTransition={cssTransition}>
            <QueueItem queueNumber={-25} src={imgArr[0]} ></QueueItem>
            <QueueItem queueNumber={0} src={imgArr[1]} ></QueueItem>
            <QueueItem queueNumber={25} src={imgArr[2]} onClick={() => { setBigPhotoSrc(bigImgArr[2]) }}  ></QueueItem>
            <QueueItem queueNumber={50} src={imgArr[3]} onClick={() => { setBigPhotoSrc(bigImgArr[3]) }}  ></QueueItem>
            <QueueItem queueNumber={75} src={imgArr[4]} onClick={() => { setBigPhotoSrc(bigImgArr[4]) }}  ></QueueItem>
            <QueueItem queueNumber={100} src={imgArr[5]} ></QueueItem>
            <QueueItem queueNumber={125} src={imgArr[6]} ></QueueItem>
            {/* <QueueItem queueNumber = {-25} theImg = {imgMinaArr[0]} ></QueueItem> 
        <QueueItem queueNumber = {0}   theImg = {imgMinaArr[1]} ></QueueItem>
        <QueueItem queueNumber = {25}  theImg = {imgMinaArr[2]} ></QueueItem>
        <QueueItem queueNumber = {50}  theImg = {imgMinaArr[3]} ></QueueItem>
        <QueueItem queueNumber = {75}  theImg = {imgMinaArr[4]} ></QueueItem>
        <QueueItem queueNumber = {100} theImg = {imgMinaArr[5]} ></QueueItem>
        <QueueItem queueNumber = {125} theImg = {imgMinaArr[6]} ></QueueItem> */}
        </ThePhotoQueue>
    )
}

export default PhotoQueue;

