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
top:${({ top }) => top}%;
transform:translateY(-50%);
`


function PhotoQueue({ imgArr, bigImgArr, setBigPhotoSrc, location, cssTranslateY, cssTransition }) {


    return (
        <ThePhotoQueue location={location} cssTranslateY={cssTranslateY} cssTransition={cssTransition}>
            <QueueItem top={-25} src={imgArr[0]} ></QueueItem>
            <QueueItem top={0} src={imgArr[1]} ></QueueItem>
            <QueueItem top={25} src={imgArr[2]} onClick={() => { setBigPhotoSrc(bigImgArr[2]) }} style={{cursor:"pointer"}}  ></QueueItem>
            <QueueItem top={50} src={imgArr[3]} onClick={() => { setBigPhotoSrc(bigImgArr[3]) }} style={{cursor:"pointer"}}  ></QueueItem>
            <QueueItem top={75} src={imgArr[4]} onClick={() => { setBigPhotoSrc(bigImgArr[4]) }} style={{cursor:"pointer"}}  ></QueueItem>
            <QueueItem top={100} src={imgArr[5]} ></QueueItem>
            <QueueItem top={125} src={imgArr[6]} ></QueueItem>           
        </ThePhotoQueue>
    )
}

export default PhotoQueue;

