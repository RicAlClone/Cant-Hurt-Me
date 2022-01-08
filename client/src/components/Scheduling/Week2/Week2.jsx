import React,{useState,useEffect} from "react";
import Day from "../Week1/Day";
import ScheduleService from '../../../Services/ScheduleService';

//import Service
//what if we test out or /get service to see if our colors will pop up.
//Im stuck in thinking how get will return everything i just udated.
//whats the usual? when we would upload something like mirros, our useEffect
//does the work,by setting setArray(service.get?).Or other way around like.
// Service.get().then(data=>setArray(data));

function Week1(props){

const [color,setColor]=useState("")

// our update useStates
const[update,setUpdate]=useState(false);



function red(){
  setColor("red")
  console.log("set red")
}

function blue(){
  setColor("blue")
  console.log("set blue")
}

function green(){
  setColor("green");
}

function grey(){
  setColor("grey")
  console.log("set grey")
}

function yellow(){
  setColor("yellow")
  console.log("set yellow")
}

function black(){
  setColor("433d3c")
  console.log("set black")
}

function orange(){
  setColor("orange");
}
function purple(){
  setColor("purple");
}
  ////////////////////////////////////////Initital color set Above⤴ /////////////////////////////////////////////////////////////////////
//we going to use a shortcut for our object and insert it into all our day objects.
let skeleton={

    block1:[{backgroundColor:""},0],
    block2:[{backgroundColor:""},0],
    block3:[{backgroundColor:""},0],
    block4:[{backgroundColor:""},0],
    block5:[{backgroundColor:""},0],
    block6:[{backgroundColor:""},0],
    block7:[{backgroundColor:""},0],
    block8:[{backgroundColor:""},0],
    block9:[{backgroundColor:""},0],
    block10:[{backgroundColor:""},0],
    block11:[{backgroundColor:""},0],
    block12:[{backgroundColor:""},0],
    block13:[{backgroundColor:""},0],
    block14:[{backgroundColor:""},0],
    block15:[{backgroundColor:""},0],
    block16:[{backgroundColor:""},0],
    block17:[{backgroundColor:""},0],
    block18:[{backgroundColor:""},0],
    block19:[{backgroundColor:""},0],
    block20:[{backgroundColor:""},0],
    block21:[{backgroundColor:""},0],
    block22:[{backgroundColor:""},0],
    block23:[{backgroundColor:""},0],
    block24:[{backgroundColor:""},0],
    block25:[{backgroundColor:""},0],
    block26:[{backgroundColor:""},0],
    block27:[{backgroundColor:""},0],
    block28:[{backgroundColor:""},0],
    block29:[{backgroundColor:""},0],
    block30:[{backgroundColor:""},0],
    block31:[{backgroundColor:""},0],
    block32:[{backgroundColor:""},0],
    block33:[{backgroundColor:""},0],
    block34:[{backgroundColor:""},0],
    block35:[{backgroundColor:""},0],
    block36:[{backgroundColor:""},0],
    block37:[{backgroundColor:""},0],
    block38:[{backgroundColor:""},0],
    block39:[{backgroundColor:""},0],
    block40:[{backgroundColor:""},0],
    block41:[{backgroundColor:""},0],
    block42:[{backgroundColor:""},0],
    block43:[{backgroundColor:""},0],
    block44:[{backgroundColor:""},0],
    block45:[{backgroundColor:""},0],
    block46:[{backgroundColor:""},0],
    block47:[{backgroundColor:""},0],
    block48:[{backgroundColor:""},0],
    block49:[{backgroundColor:""},0],
    block50:[{backgroundColor:""},0],
    block51:[{backgroundColor:""},0],
    block52:[{backgroundColor:""},0],
    block53:[{backgroundColor:""},0],
    block54:[{backgroundColor:""},0],
    block55:[{backgroundColor:""},0],
    block56:[{backgroundColor:""},0],
    block57:[{backgroundColor:""},0],
    block58:[{backgroundColor:""},0],
    block59:[{backgroundColor:""},0],
    block60:[{backgroundColor:""},0],
    block61:[{backgroundColor:""},0],
    block62:[{backgroundColor:""},0],
    block63:[{backgroundColor:""},0],
    block64:[{backgroundColor:""},0],
    block65:[{backgroundColor:""},0],
    block66:[{backgroundColor:""},0],
    block67:[{backgroundColor:""},0],
    block68:[{backgroundColor:""},0],
    block69:[{backgroundColor:""},0],
    block70:[{backgroundColor:""},0],
    block71:[{backgroundColor:""},0],
    block72:[{backgroundColor:""},0],
    block73:[{backgroundColor:""},0],
    block74:[{backgroundColor:""},0],
    block75:[{backgroundColor:""},0],
    block76:[{backgroundColor:""},0],
    block77:[{backgroundColor:""},0],
    block78:[{backgroundColor:""},0],
    block79:[{backgroundColor:""},0],
    block80:[{backgroundColor:""},0],
    block81:[{backgroundColor:""},0],
    block82:[{backgroundColor:""},0],
    block83:[{backgroundColor:""},0],
    block84:[{backgroundColor:""},0],
    block85:[{backgroundColor:""},0],
    block86:[{backgroundColor:""},0],
    block87:[{backgroundColor:""},0],
    block88:[{backgroundColor:""},0],
    block89:[{backgroundColor:""},0],
    block90:[{backgroundColor:""},0],
    block91:[{backgroundColor:""},0],
    block92:[{backgroundColor:""},0],
    block93:[{backgroundColor:""},0],
    block94:[{backgroundColor:""},0],
    block95:[{backgroundColor:""},0],
    block96:[{backgroundColor:""},0]
}

// what if we create an object of our objects

  const[evolve,setEvolve]=useState(skeleton);

  const[tuesObj,setTuesObj]=useState(skeleton);

  const[wedObj,setWedObj]=useState(skeleton);

  const[thursObj,setThursObj]=useState(skeleton);

  const[friObj,setFriObj]=useState(skeleton);

  const[satObj,setSatObj]=useState(skeleton);

  const[sunObj,setSunObj]=useState(skeleton);

  // const [array,setArray]=useState([]);

  const [idHolder,setIdHolder]=useState(null);
  ///////////////////////////////////////////////////////////


  useEffect(()=>{

    ScheduleService.getSchedule().then(data=>{
      console.log('w2/useEffect/data:',data.message.documents[1]);
// //this gets the second object in our /get
      setEvolve(data.message.documents[1]);

    })

  },[])

  //////////////////////////////////////////////////////////


let week2Obj={

  mon: function (event){
    if (update){
      const name=event.target.getAttribute('name');
      console.log(name);
      let tempObject=[{backgroundColor:color},0];
      if(tempObject[0].backgroundColor==="red"){
        //the 1 is the point added when color is red
        tempObject=[{backgroundColor:color},1]
      }else{
        tempObject=[{backgroundColor:color},0]
      }
      setEvolve(function(prev){
        return{
          ...prev,
        [name]: tempObject
        }
      })
    }else{
      console.log('have not clicked on update yet')
    }

  },
  tues:function (event){
    if (update){
    const name=event.target.getAttribute('name');
    console.log(name);
    let tempObject=[{backgroundColor:color},0];
    if(tempObject[0].backgroundColor==="red"){
      tempObject=[{backgroundColor:color},1]
    }else{
      tempObject=[{backgroundColor:color},0]
    }
    setTuesObj(function(prev){
      return{
        ...prev,
      [name]: tempObject
      }
    })
  }
  },
  wed:function (event){
    if (update){
    const name=event.target.getAttribute('name');
    console.log(name);
    let tempObject=[{backgroundColor:color},0];
    if(tempObject[0].backgroundColor==="red"){
      tempObject=[{backgroundColor:color},1]
    }else{
      tempObject=[{backgroundColor:color},0]
    }
    setWedObj(function(prev){
      return{
        ...prev,
      [name]: tempObject
      }
    })
  }
  },
  thurs:function (event){
    const name=event.target.getAttribute('name');
    console.log(name);
    let tempObject=[{backgroundColor:color},0];
    if(tempObject[0].backgroundColor==="red"){
      tempObject=[{backgroundColor:color},1]
    }else{
      tempObject=[{backgroundColor:color},0]
    }
    setThursObj(function(prev){
      return{
        ...prev,
      [name]: tempObject
      }
    })
  },
  fri:function (event){
    const name=event.target.getAttribute('name');
    console.log(name);
    let tempObject=[{backgroundColor:color},0];
    if(tempObject[0].backgroundColor==="red"){
      tempObject=[{backgroundColor:color},1]
    }else{
      tempObject=[{backgroundColor:color},0]
    }
    setFriObj(function(prev){
      return{
        ...prev,
      [name]: tempObject
      }
    })
  },
  sat:function (event){
    const name=event.target.getAttribute('name');
    console.log(name);
    let tempObject=[{backgroundColor:color},0];
    if(tempObject[0].backgroundColor==="red"){
      tempObject=[{backgroundColor:color},1]
    }else{
      tempObject=[{backgroundColor:color},0]
    }
    setSatObj(function(prev){
      return{
        ...prev,
      [name]: tempObject
      }
    })
  },
  sun:function (event){
    const name=event.target.getAttribute('name');
    console.log(name);
    let tempObject=[{backgroundColor:color},0];
    if(tempObject[0].backgroundColor==="red"){
      tempObject=[{backgroundColor:color},1]
    }else{
      tempObject=[{backgroundColor:color},0]
    }
    setSunObj(function(prev){
      return{
        ...prev,
      [name]: tempObject
      }
    })
  },
};


//   //Counts for every day
  let monCount=0;

Object.values(evolve).forEach(val=>{
  if(val[1] === 1){
    monCount= monCount+val[1];
  }
});

    let tuesCount=0;
    Object.values(tuesObj).forEach(val=>{
      if(val[1] === 1){
        tuesCount= tuesCount+val[1];
      }
});

//problem is cannot set undefined or null to object
let wedCount=0;
Object.values(wedObj).forEach(val=>{
  if(val[1] === 1){
    wedCount= wedCount+val[1];
  }
});
let thursCount=0;
Object.values(thursObj).forEach(val=>{
  if(val[1] === 1){
    thursCount= thursCount+val[1];
  }
});
let friCount=0;
Object.values(friObj).forEach(val=>{
  if(val[1] === 1){
    friCount= friCount+val[1];
  }
});
let satCount=0;
Object.values(satObj).forEach(val=>{
  if(val[1] === 1){
    satCount= satCount+val[1];
  }
});
let sunCount=0;
Object.values(sunObj).forEach(val=>{
  if(val[1] === 1){
    sunCount= sunCount+val[1];
  }
});

let browserSize=window.innerWidth;
console.log(browserSize)

const stepContainer={
  display:"block",
  width: "50%",
  margin:"0 auto 0 auto",
  padding: "15px 0",
  // backgroundColor:"pink"
}


const [backColorDay,setBackColorDay]=useState({backgroundColor:'lightcyan'});


function updateClick(nameDay){
    setUpdate(true);

ScheduleService.getSchedule().then(data=>{
  setIdHolder(data.message.documents[1]._id);
})

  setBackColorDay({backgroundColor:'white'});
}
console.log(idHolder);//we are gettin id here now lets use it in <day>

function saveClick(id,body){
console.log('send id:',id);
console.log('send body:',body);

ScheduleService.updateDay(id,body).then(data=>{
  if(!data.message.msgError){
    ScheduleService.getSchedule().then(newData=>{
      setEvolve(newData.message.documents.[1]);
    })
  }
})
  console.log('we click save and turn our background back to lightcyan');
  setUpdate(false);
  setBackColorDay({backgroundColor:'lightcyan'});
}


  return(
    <div className="week-padding">

      <h1 className="week-title">{props.weekName}</h1>

      <div style={stepContainer}>
        <h5>Step 1</h5>
        <ul>
          <li>click on button to choose color</li>
        </ul>
      </div>


      <div className="buttons-container">
        <button onClick={blue} type="button" className="btn btn-primary">Work</button>
        <button onClick={red} type="button" className="btn btn-danger">Unproductive</button>
        <button onClick={green} type="button" className="btn btn-success">Studying</button>
        <button  onClick={grey} type="button" className="btn btn-secondary">exercise</button>
        <button  onClick={yellow} style={{backgroundColor:"yellow"}} type="button" className="btn">Family/Friends Time</button>
        <button  onClick={black} type="button" className="btn btn-dark">Sleep</button>
        <button  onClick={orange} style={{backgroundColor:"orange"}} type="button" className="btn">Eating</button>
        <button  onClick={purple} style={{backgroundColor:"purple",color:"white"}} type="button" className="btn">Commuting</button>
      </div>


      <div style={stepContainer}>
        <h4>Step 2</h4>
        <ul>
          <li>click on time block to fill</li>
        </ul>
      </div>

      {/* changed class */}

      <div id="week2" className="carousel slide" data-ride="carousel" data-interval="false">

        {/* changed class */}
        <div className="carousel-inner">
          {/* changed class */}

          <div className="carousel-item active">
            {/* //these button should use props with functions that will allow us to update and save */}

            <Day
              dayName="Monday"
              evolve={evolve}
              ourFunction={week2Obj.mon}
              count={monCount}
              update={setUpdate}
              updateClick={updateClick}
              backgroundColor={backColorDay}
              saveClick={saveClick}
              id={idHolder}
            />
          </div>


          <div className="carousel-item ">
            <Day
              dayName="Tuesday"
              evolve={tuesObj}
              ourFunction={week2Obj.tues}
              count={tuesCount}
              update={setUpdate}
              updateClick={updateClick}
              backgroundColor={backColorDay}
              saveClick={saveClick}
              id={idHolder}
            />
          </div>


          <div className="carousel-item ">
            <Day
              dayName="Wednesday"
              evolve={wedObj}
              ourFunction={week2Obj.wed}
              count={wedCount}
              update={setUpdate}
              updateClick={updateClick}
              backgroundColor={backColorDay}
              saveClick={saveClick}
              id={idHolder}
            />
          </div>


          <div className="carousel-item ">
            <Day
              dayName="Thursday"
              evolve={thursObj}
              ourFunction={week2Obj.thurs}
              count={thursCount}
            />
          </div>


          <div className="carousel-item ">
            <Day
              dayName="Friday"
              evolve={friObj}
              ourFunction={week2Obj.fri}
              count={friCount}
            />
          </div>


          <div className="carousel-item ">
            <Day
              dayName="Saturday"
              evolve={satObj}
              ourFunction={week2Obj.sat}
              count={satCount}
            />
          </div>


          <div className="carousel-item ">
            <Day
              dayName="Sunday"
              evolve={sunObj}
              ourFunction={week2Obj.sun}
              count={sunCount}
            />
          </div>
        </div>
        <a className="carousel-control-prev" href="#week2" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#week2" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
</div>

  );
}

export default Week1;









//import React,{useState} from "react";
// import Day from "../Week1/Day";
//
// function Week2(props){
//
// const [color,setColor]=useState("")
//
// function red(){
//   setColor("red")
//   console.log("set red")
// }
//
// function blue(){
//   setColor("blue")
//   console.log("set blue")
// }
//
// function green(){
//   setColor("green");
// }
//
// function grey(){
//   setColor("grey")
//   console.log("set grey")
// }
//
// function yellow(){
//   setColor("yellow")
//   console.log("set yellow")
// }
//
// function black(){
//   setColor("433d3c")
//   console.log("set black")
// }
// function orange(){
//   setColor("orange");
// }
// function purple(){
//   setColor("purple");
// }
//   ////////////////////////////////////////Initital color set Above⤴ /////////////////////////////////////////////////////////////////////
// //we going to use a shortcut for our object and insert it into all our day objects.
// let skeleton={
//
//     block1:[{backgroundColor:""},0],
//     block2:[{backgroundColor:""},0],
//     block3:[{backgroundColor:""},0],
//     block4:[{backgroundColor:""},0],
//     block5:[{backgroundColor:""},0],
//     block6:[{backgroundColor:""},0],
//     block7:[{backgroundColor:""},0],
//     block8:[{backgroundColor:""},0],
//     block9:[{backgroundColor:""},0],
//     block10:[{backgroundColor:""},0],
//     block11:[{backgroundColor:""},0],
//     block12:[{backgroundColor:""},0],
//     block13:[{backgroundColor:""},0],
//     block14:[{backgroundColor:""},0],
//     block15:[{backgroundColor:""},0],
//     block16:[{backgroundColor:""},0],
//     block17:[{backgroundColor:""},0],
//     block18:[{backgroundColor:""},0],
//     block19:[{backgroundColor:""},0],
//     block20:[{backgroundColor:""},0],
//     block21:[{backgroundColor:""},0],
//     block22:[{backgroundColor:""},0],
//     block23:[{backgroundColor:""},0],
//     block24:[{backgroundColor:""},0],
//     block25:[{backgroundColor:""},0],
//     block26:[{backgroundColor:""},0],
//     block27:[{backgroundColor:""},0],
//     block28:[{backgroundColor:""},0],
//     block29:[{backgroundColor:""},0],
//     block30:[{backgroundColor:""},0],
//     block31:[{backgroundColor:""},0],
//     block32:[{backgroundColor:""},0],
//     block33:[{backgroundColor:""},0],
//     block34:[{backgroundColor:""},0],
//     block35:[{backgroundColor:""},0],
//     block36:[{backgroundColor:""},0],
//     block37:[{backgroundColor:""},0],
//     block38:[{backgroundColor:""},0],
//     block39:[{backgroundColor:""},0],
//     block40:[{backgroundColor:""},0],
//     block41:[{backgroundColor:""},0],
//     block42:[{backgroundColor:""},0],
//     block43:[{backgroundColor:""},0],
//     block44:[{backgroundColor:""},0],
//     block45:[{backgroundColor:""},0],
//     block46:[{backgroundColor:""},0],
//     block47:[{backgroundColor:""},0],
//     block48:[{backgroundColor:""},0],
//     block49:[{backgroundColor:""},0],
//     block50:[{backgroundColor:""},0],
//     block51:[{backgroundColor:""},0],
//     block52:[{backgroundColor:""},0],
//     block53:[{backgroundColor:""},0],
//     block54:[{backgroundColor:""},0],
//     block55:[{backgroundColor:""},0],
//     block56:[{backgroundColor:""},0],
//     block57:[{backgroundColor:""},0],
//     block58:[{backgroundColor:""},0],
//     block59:[{backgroundColor:""},0],
//     block60:[{backgroundColor:""},0],
//     block61:[{backgroundColor:""},0],
//     block62:[{backgroundColor:""},0],
//     block63:[{backgroundColor:""},0],
//     block64:[{backgroundColor:""},0],
//     block65:[{backgroundColor:""},0],
//     block66:[{backgroundColor:""},0],
//     block67:[{backgroundColor:""},0],
//     block68:[{backgroundColor:""},0],
//     block69:[{backgroundColor:""},0],
//     block70:[{backgroundColor:""},0],
//     block71:[{backgroundColor:""},0],
//     block72:[{backgroundColor:""},0],
//     block73:[{backgroundColor:""},0],
//     block74:[{backgroundColor:""},0],
//     block75:[{backgroundColor:""},0],
//     block76:[{backgroundColor:""},0],
//     block77:[{backgroundColor:""},0],
//     block78:[{backgroundColor:""},0],
//     block79:[{backgroundColor:""},0],
//     block80:[{backgroundColor:""},0],
//     block81:[{backgroundColor:""},0],
//     block82:[{backgroundColor:""},0],
//     block83:[{backgroundColor:""},0],
//     block84:[{backgroundColor:""},0],
//     block85:[{backgroundColor:""},0],
//     block86:[{backgroundColor:""},0],
//     block87:[{backgroundColor:""},0],
//     block88:[{backgroundColor:""},0],
//     block89:[{backgroundColor:""},0],
//     block90:[{backgroundColor:""},0],
//     block91:[{backgroundColor:""},0],
//     block92:[{backgroundColor:""},0],
//     block93:[{backgroundColor:""},0],
//     block94:[{backgroundColor:""},0],
//     block95:[{backgroundColor:""},0],
//     block96:[{backgroundColor:""},0]
// }
//
// // what if we create an object of our objects
//
//   const[evolve,setEvolve]=useState(skeleton);
//
//   const[tuesObj,setTuesObj]=useState(skeleton);
//
//   const[wedObj,setWedObj]=useState(skeleton);
//
//   const[thursObj,setThursObj]=useState(skeleton);
//
//   const[friObj,setFriObj]=useState(skeleton);
//
//   const[satObj,setSatObj]=useState(skeleton);
//
//   const[sunObj,setSunObj]=useState(skeleton);
//   ///////////////////////////////////////////////////////////
// let week1Obj={
//   mon: function (event){
//     const name=event.target.getAttribute('name');
//     console.log(name);
//     let tempObject=[{backgroundColor:color},0];
//     if(tempObject[0].backgroundColor==="red"){
//       tempObject=[{backgroundColor:color},1]
//     }else{
//       tempObject=[{backgroundColor:color},0]
//     }
//     setEvolve(function(prev){
//       return{
//         ...prev,
//       [name]: tempObject
//       }
//     })
//   },
//   tues:function (event){
//     const name=event.target.getAttribute('name');
//     console.log(name);
//     let tempObject=[{backgroundColor:color},0];
//     if(tempObject[0].backgroundColor==="red"){
//       tempObject=[{backgroundColor:color},1]
//     }else{
//       tempObject=[{backgroundColor:color},0]
//     }
//     setTuesObj(function(prev){
//       return{
//         ...prev,
//       [name]: tempObject
//       }
//     })
//   },
//   wed:function (event){
//     const name=event.target.getAttribute('name');
//     console.log(name);
//     let tempObject=[{backgroundColor:color},0];
//     if(tempObject[0].backgroundColor==="red"){
//       tempObject=[{backgroundColor:color},1]
//     }else{
//       tempObject=[{backgroundColor:color},0]
//     }
//     setWedObj(function(prev){
//       return{
//         ...prev,
//       [name]: tempObject
//       }
//     })
//   },
//   thurs:function (event){
//     const name=event.target.getAttribute('name');
//     console.log(name);
//     let tempObject=[{backgroundColor:color},0];
//     if(tempObject[0].backgroundColor==="red"){
//       tempObject=[{backgroundColor:color},1]
//     }else{
//       tempObject=[{backgroundColor:color},0]
//     }
//     setThursObj(function(prev){
//       return{
//         ...prev,
//       [name]: tempObject
//       }
//     })
//   },
//   fri:function (event){
//     const name=event.target.getAttribute('name');
//     console.log(name);
//     let tempObject=[{backgroundColor:color},0];
//     if(tempObject[0].backgroundColor==="red"){
//       tempObject=[{backgroundColor:color},1]
//     }else{
//       tempObject=[{backgroundColor:color},0]
//     }
//     setFriObj(function(prev){
//       return{
//         ...prev,
//       [name]: tempObject
//       }
//     })
//   },
//   sat:function (event){
//     const name=event.target.getAttribute('name');
//     console.log(name);
//     let tempObject=[{backgroundColor:color},0];
//     if(tempObject[0].backgroundColor==="red"){
//       tempObject=[{backgroundColor:color},1]
//     }else{
//       tempObject=[{backgroundColor:color},0]
//     }
//     setSatObj(function(prev){
//       return{
//         ...prev,
//       [name]: tempObject
//       }
//     })
//   },
//   sun:function (event){
//     const name=event.target.getAttribute('name');
//     console.log(name);
//     let tempObject=[{backgroundColor:color},0];
//     if(tempObject[0].backgroundColor==="red"){
//       tempObject=[{backgroundColor:color},1]
//     }else{
//       tempObject=[{backgroundColor:color},0]
//     }
//     setSunObj(function(prev){
//       return{
//         ...prev,
//       [name]: tempObject
//       }
//     })
//   },
// };
//
// //   //Counts for every day
//   let monCount=0;
//   ///below is old way I looped through evolve array
// //   for (const [key, value] of Object.entries(evolve)) {
// //
// //     if(value[1]===1){
// //       monCount=monCount+value[1];
// //
// //     }
// // };
// Object.values(evolve).forEach(val=>{
//   if(val[1] === 1){
//     monCount= monCount+val[1];
//   }
// });
//
//     let tuesCount=0;
//     Object.values(tuesObj).forEach(val=>{
//       if(val[1] === 1){
//         tuesCount= tuesCount+val[1];
//       }
// });
//
// let wedCount=0;
// Object.values(wedObj).forEach(val=>{
//   if(val[1] === 1){
//     wedCount= wedCount+val[1];
//   }
// });
// let thursCount=0;
// Object.values(thursObj).forEach(val=>{
//   if(val[1] === 1){
//     thursCount= thursCount+val[1];
//   }
// });
// let friCount=0;
// Object.values(friObj).forEach(val=>{
//   if(val[1] === 1){
//     friCount= friCount+val[1];
//   }
// });
// let satCount=0;
// Object.values(satObj).forEach(val=>{
//   if(val[1] === 1){
//     satCount= satCount+val[1];
//   }
// });
// let sunCount=0;
// Object.values(sunObj).forEach(val=>{
//   if(val[1] === 1){
//     sunCount= sunCount+val[1];
//   }
// });
//
//
//   return(
//     <div className="week-padding">
//
//       <h1 className="week-title">{props.weekName}</h1>
//       <div className="buttons-container">
//         <button onClick={blue} type="button" className="btn btn-primary">Work</button>
//         <button onClick={red} type="button" className="btn btn-danger">Unproductive</button>
//         <button onClick={green} type="button" className="btn btn-success">Studying</button>
//         <button  onClick={grey} type="button" className="btn btn-secondary">exercise</button>
//         <button  onClick={yellow} style={{backgroundColor:"yellow"}} type="button" className="btn">Family/Friends Time</button>
//         <button  onClick={black} type="button" className="btn btn-dark">Sleep</button>
//         <button  onClick={orange} style={{backgroundColor:"orange"}} type="button" className="btn">Eating</button>
//         <button  onClick={purple} style={{backgroundColor:"purple",color:"white"}} type="button" className="btn">Commuting</button>
//       </div>
//
//       {/* <div className="row"> */}
//
//       <div id="week2" class="carousel slide" data-ride="carousel" data-interval="false">
//
//         <div class="carousel-inner">
//           <div class="carousel-item active">
//             <Day
//               dayName="Monday"
//               evolve={evolve}
//               ourFunction={week1Obj.mon}
//               count={monCount}
//             />
//           </div>
//
//
//           <div class="carousel-item ">
//             <Day
//               dayName="Tuesday"
//               evolve={tuesObj}
//               ourFunction={week1Obj.tues}
//               count={tuesCount}
//             />
//           </div>
//
//
//           <div class="carousel-item ">
//             <Day
//               dayName="Wednesday"
//               evolve={wedObj}
//               ourFunction={week1Obj.wed}
//               count={wedCount}
//             />
//           </div>
//
//
//           <div class="carousel-item ">
//             <Day
//               dayName="Thursday"
//               evolve={thursObj}
//               ourFunction={week1Obj.thurs}
//               count={thursCount}
//             />
//           </div>
//
//
//       <div class="carousel-item ">
//         <Day
//           dayName="Friday"
//           evolve={friObj}
//           ourFunction={week1Obj.fri}
//           count={friCount}
//         />
//       </div>
//
//
//       <div class="carousel-item ">
//         <Day
//           dayName="Saturday"
//           evolve={satObj}
//           ourFunction={week1Obj.sat}
//           count={satCount}
//         />
//       </div>
//
//
//       <div class="carousel-item ">
//         <Day
//           dayName="Sunday"
//           evolve={sunObj}
//           ourFunction={week1Obj.sun}
//           count={sunCount}
//         />
//       </div>
//     </div>
//     <a class="carousel-control-prev" href="#week2" role="button" data-slide="prev">
//       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//       <span class="sr-only">Previous</span>
//     </a>
//     <a class="carousel-control-next" href="#week2" role="button" data-slide="next">
//       <span class="carousel-control-next-icon" aria-hidden="true"></span>
//       <span class="sr-only">Next</span>
//     </a>
//   </div>
// </div>
//
//   );
// }
//
// export default Week2;
