import React from "react";

// function Style(props){


//   if(props.message.msgError){
//
//     return 'danger';
//   }else{
//
//     return 'primary';
//   }
//
// }


function Message(props){
let check=props.check;
  return(

      check?
      <div style={{width:"235px",margin:"0 auto",display:"flex",justifyContent:"center"}}>{props.message.msgBody}</div>
      :
      // <Alert className="alert-message-style" variant={Style(props)}>
        <div>{props.message.msgBody}</div>
        //{/* </Alert> */}

        );
}
export default Message;
