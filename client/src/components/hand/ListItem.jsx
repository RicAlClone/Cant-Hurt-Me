import React,{useRef,useEffect} from "react";

function ListItem(props){

let timerId=useRef(null);

useEffect(()=>{
  return ()=>{
    clearTimeout(timerId);
  }
},[])

return(

    <div className="list-entries">
      <li data-id={props.id} key={props.id}>
        {props.arrayItem.name}
      </li>
      <i className="fas fa-trash-alt delete-button" onClick={(e)=> {

        let targetComponent=e.target.parentElement.children[0];
        let widthOfAnimation=e.target.parentElement.offsetWidth;
        console.log('width i want:',widthOfAnimation);
        let movingTranslate=[
        {
          transform:`translateX(0)`,
          opacity: 1
        },
        {
          transform:`translateX(${widthOfAnimation}px)`,
          opacity:0
        }
        ];
        let detailMovement={
          duration:1000,
          fill: 'forwards'
        }
        targetComponent.animate(movingTranslate,detailMovement);

        props.deleteItem(props.id);
      }
      }></i>
    </div>
          );
        }

export default ListItem;
