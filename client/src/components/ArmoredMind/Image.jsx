import React,{useEffect,useRef} from "react";

let color= {

  paddingBottom:"40px"
}

function Image(props){

let timerId=useRef(null);

let movingTranslate=[
{
  opacity: 1
},
{
  opacity:0
}
];
let detailMovement={
  duration:500,
  fill: 'forwards'
}

useEffect(()=>{
  return ()=>{clearTimeout(timerId)}
},[])


  return(
    <>
      <div  className="col-lg-4" key={props.id} style={color} >

        <div >

          <img  style={{width: "100%",height:"240px"}} alt="" src={props.arrayItem} />

        </div>


        <i  className="fas fa-trash-alt delete-bottom-right" style={{marginTop:'10px'}} onClick={
          (e)=>{
            
            let targetDiv=e.target.parentElement;

            targetDiv.animate(movingTranslate,detailMovement);
            props.deleteImage(props.id);
          }}/>

      </div>
    </>
  );
}
export default Image;
