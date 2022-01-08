// import React, {useState,useEffect} from "react";
//
// function Sets(props) {
// 
// const [sets,setSets]=useState(Number(props.sets));
//
// useEffect(() => {
//     console.log(sets, '- Has changed')
//     handle(sets);
// },[sets]) // <-- here put the parameter to listen
//
//
// function setDataChange(e){
//   //newValue is string
//   let newValue=Number(e.target.value);
//   console.log(newValue,'newValue');
// setSets(newValue);
// console.log(sets,'why th fuck isint this different?');
//
// }
// console.log(sets,'this is sets in sets component line 16');
//
// function handle(){
//   console.log(sets,'in handle function');
//   props.handleUpdateChange(sets,reps);
//
// }
//
//   return (
//     <div>
//       {
//         props.sets !== "" ?
//           <div>
//             <input style={{width:"55px"}} type="number" min="0" onChange={setDataChange} value={sets} disabled={props.temp}/> <span style={{paddingRight:"20px"}}>sets</span>
//           </div>
//         : props.sets
//       }
//     </div>);
// }
//
// export default Sets;
