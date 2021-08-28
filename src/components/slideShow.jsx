
import styled from "@emotion/styled"

// 裝cube的盒子
let ShowBox = styled.div` 
width:846px;
height: 564px;
font-size:0;
`
let ShowBoxCube = styled.div`
width:100px;
height: 100px;
background-color:#555;
display:inline-block;
margin:0;
font-size:0;
`


function SlideShow() {

   

    return (
        <>
           
                <ShowBox  >
                    <ShowBoxCube/>
                    <ShowBoxCube/>
                    <ShowBoxCube/>
                    <ShowBoxCube/>
                    <ShowBoxCube/>
                    <ShowBoxCube/>
                </ShowBox>
            
            
        </>
    )
}

export default SlideShow;