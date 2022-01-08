import React from "react";
// import {MdAddCircle} from "react-icons/md";
import {RiAddCircleFill} from "react-icons/ri"
import { IconContext } from "react-icons";

function AddIcon(){
//

  return(
<IconContext.Provider value={{className:"add-button"}}>
  <RiAddCircleFill/>
</IconContext.Provider>

  );
}

export default AddIcon;
