import React from "react";

function ListItem(props){

return(
  <div className="list-entries">
    <li  key={props.id}>
      {props.arrayItem.name}
    </li>
    <i className="fas fa-trash-alt delete-button" onClick={()=> {

      props.deleteItem(props.id)
    }
    }></i>
  </div>
    );
    }

export default ListItem;
