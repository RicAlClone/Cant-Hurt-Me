import React,{useState,useEffect,useContext} from "react";
import Day from "../Week1/Day";
import ScheduleService from '../../../Services/ScheduleService';
import {AuthContext} from '../../../Context/AuthContext';


function Week3(props){

const [color,setColor]=useState("")
//we have to press edit button before we can change update to true
const[update,setUpdate]=useState(false);
//This array is used to grab _id from all models,from the backend
const [array,setArray]=useState([]);

const authContext= useContext(AuthContext);

//functions allow us to choose the background color of block
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

//All our day models are based on skeleton object
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
//I create every day to be an object like skeleton
  const[evolve,setEvolve]=useState(skeleton);

  const[tuesObj,setTuesObj]=useState(skeleton);

  const[wedObj,setWedObj]=useState(skeleton);

  const[thursObj,setThursObj]=useState(skeleton);

  const[friObj,setFriObj]=useState(skeleton);

  const[satObj,setSatObj]=useState(skeleton);

  const[sunObj,setSunObj]=useState(skeleton);

  //Will hold our id when we click on edit button

  const [idHolder,setIdHolder]=useState(null);

  //Brings our data when page loads for the first time
  useEffect(()=>{

    ScheduleService.getSchedule().then(data=>{
      setArray(data.message.documents);
      setEvolve(data.message.documents[14]);
      setTuesObj(data.message.documents[15]);
      setWedObj(data.message.documents[16]);
      setThursObj(data.message.documents[17]);
      setFriObj(data.message.documents[18]);
      setSatObj(data.message.documents[19]);
      setSunObj(data.message.documents[20]);

    })

  },[])

//Styles our edit,and save button
  const [saveButtonStyle,setSaveButtonStyle]=useState('btn btn-light');
  const [editButtonStyle,setEditButtonStyle]=useState('btn btn-info');

  //The week3Obj holds the functions that tell the day object,what blocks
  //are going to be the color chosen. We set that day object with its new colors
let week3Obj={

  mon: function (event){
    if (update){
      const name=event.target.getAttribute('name');
      console.log(name);
      let tempObject=[{backgroundColor:color},0];
      if(tempObject[0].backgroundColor==="red"){
        tempObject=[{backgroundColor:color},1]
      }else{
        tempObject=[{backgroundColor:color},0]
      }
      setEvolve(function(prev){
        //Once we change the day object, we focus
        //on the save button to let us know we are ready to save
        setSaveButtonStyle('btn btn-info');
        setEditButtonStyle('btn btn-light');
        return{
          ...prev,
        [name]: tempObject
        }
      })
    }else{
      console.log('have not clicked on edit yet')
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
      setSaveButtonStyle('btn btn-info');
      setEditButtonStyle('btn btn-light');
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
      setSaveButtonStyle('btn btn-info');
      setEditButtonStyle('btn btn-light');
      return{
        ...prev,
      [name]: tempObject
      }
    })
  }
  },
  thurs:function (event){
    if(update){
    const name=event.target.getAttribute('name');
    console.log(name);
    let tempObject=[{backgroundColor:color},0];
    if(tempObject[0].backgroundColor==="red"){
      tempObject=[{backgroundColor:color},1]
    }else{
      tempObject=[{backgroundColor:color},0]
    }
    setThursObj(function(prev){
      setSaveButtonStyle('btn btn-info');
      setEditButtonStyle('btn btn-light');
      return{
        ...prev,
      [name]: tempObject
      }
    })
    }
  },
  fri:function (event){
    if(update){
    const name=event.target.getAttribute('name');
    console.log(name);
    let tempObject=[{backgroundColor:color},0];
    if(tempObject[0].backgroundColor==="red"){
      tempObject=[{backgroundColor:color},1]
    }else{
      tempObject=[{backgroundColor:color},0]
    }
    setFriObj(function(prev){
      setSaveButtonStyle('btn btn-info');
      setEditButtonStyle('btn btn-light');
      return{
        ...prev,
      [name]: tempObject
      }
    })
  }
  },
  sat:function (event){
    if(update){
    const name=event.target.getAttribute('name');
    console.log(name);
    let tempObject=[{backgroundColor:color},0];
    if(tempObject[0].backgroundColor==="red"){
      tempObject=[{backgroundColor:color},1]
    }else{
      tempObject=[{backgroundColor:color},0]
    }
    setSatObj(function(prev){
      setSaveButtonStyle('btn btn-info');
      setEditButtonStyle('btn btn-light');
      return{
          ...prev,
      [name]: tempObject
      }
    })
  }
  },
  sun:function (event){
    if(update){
    const name=event.target.getAttribute('name');
    console.log(name);
    let tempObject=[{backgroundColor:color},0];
    if(tempObject[0].backgroundColor==="red"){
      tempObject=[{backgroundColor:color},1]
    }else{
      tempObject=[{backgroundColor:color},0]
    }
    setSunObj(function(prev){
      setSaveButtonStyle('btn btn-info');
      setEditButtonStyle('btn btn-light');
      return{
        ...prev,
      [name]: tempObject
      }
    })
  }
  },
};


//below are our day counters that will add 1
//evertime we have a red block.Inside Day component we will
//multiply it by 15 to get us our minutes being unproductive
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


const stepContainer={
  display:"block",
  width: "50%",
  margin:"0 auto 0 auto",
  padding: "15px 0",
  // backgroundColor:"pink"
}


const [backColorDay,setBackColorDay]=useState({backgroundColor:'lightcyan'});
//In order to get the current _id we loop through dayInfo.
const dayInfo=[
{index:14,day:"Monday"},{index:15,day:"Tuesday"},{index:16,day:"Wednesday"},
{index:17,day:"Thursday"},{index:18,day:"Friday"},{index:19,day:"Saturday"},
{index:20,day:"Sunday"}
];
//Clicking edit button allows us to color the blocks
function editClick(nameDay){

  dayInfo.forEach((item)=>{
    if(nameDay===item.day){
      setIdHolder(array[item.index]._id);
    }
  })

  setUpdate(true);
  setBackColorDay({backgroundColor:'white'});

}
console.log("w2 idHolder:",idHolder);//we are gettin id here now lets use it in <day>


//Save button will get id from edit button and the day object
//and send to the backend to update our original day model
function saveClick(id,body){

  if(update){
    console.log('send id:',id);
    console.log('send body:',body);

    ScheduleService.updateDay(id,body).then(data=>{
      if(!data.message.msgError){
        ScheduleService.getSchedule().then(newData=>{
          setArray(newData.message.documents);
          setEvolve(newData.message.documents[14]);
          setTuesObj(newData.message.documents[15]);
          setWedObj(newData.message.documents[16]);
          setThursObj(newData.message.documents[17]);
          setFriObj(newData.message.documents[18]);
          setSatObj(newData.message.documents[19]);
          setSunObj(newData.message.documents[20]);
        })
        setSaveButtonStyle('btn btn-light');
        setEditButtonStyle('btn btn-info');
      }
      else if(data.message.msgBody === "Unauthorized"){
    const {setUser,setIsAuthenticated}=authContext;
      setUser(null);
      setIsAuthenticated(false);
      }
    })
      console.log('we click save and turn our background back to lightcyan');
      setBackColorDay({backgroundColor:'lightcyan'});
      setUpdate(false);

  }
  else{
    console.log('need to click update first');
  }

}

//When we click slide we want to make sure we get previous colors,if object was
//changed but not saved. We also want to turn off the ability to change the object
//unless we click edit again.
function slide(){
  if(update){
ScheduleService.getSchedule().then(data=>{
  if(!data.message.msgError){
  setArray(data.message.documents);
  setEvolve(data.message.documents[14]);
  setTuesObj(data.message.documents[15]);
  setWedObj(data.message.documents[16]);
  setThursObj(data.message.documents[17]);
  setFriObj(data.message.documents[18]);
  setSatObj(data.message.documents[19]);
  setSunObj(data.message.documents[20]);
}
else if(data.message.msgBody === "Unauthorized"){
const {setUser,setIsAuthenticated}=authContext;
setUser(null);
setIsAuthenticated(false);
}
})
setSaveButtonStyle('btn btn-light');
setEditButtonStyle('btn btn-info');
  setUpdate(false);
  setBackColorDay({backgroundColor:'lightcyan'});

  }

}

console.log('update:',update);


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



      <div id="week3" className="carousel slide" data-ride="carousel" data-interval="false">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Day
              dayName="Monday"
              evolve={evolve}
              ourFunction={week3Obj.mon}
              count={monCount}
              update={setUpdate}
              editClick={editClick}
              backgroundColor={backColorDay}
              saveClick={saveClick}
              id={idHolder}
              saveButtonStyle={saveButtonStyle}
              editButtonStyle={editButtonStyle}
            />
          </div>


          <div className="carousel-item ">
            <Day
              dayName="Tuesday"
              evolve={tuesObj}
              ourFunction={week3Obj.tues}
              count={tuesCount}
              update={setUpdate}
              editClick={editClick}
              backgroundColor={backColorDay}
              saveClick={saveClick}
              id={idHolder}
              saveButtonStyle={saveButtonStyle}
              editButtonStyle={editButtonStyle}
            />
          </div>


          <div className="carousel-item ">
            <Day
              dayName="Wednesday"
              evolve={wedObj}
              ourFunction={week3Obj.wed}
              count={wedCount}
              update={setUpdate}
              editClick={editClick}
              backgroundColor={backColorDay}
              saveClick={saveClick}
              id={idHolder}
              saveButtonStyle={saveButtonStyle}
              editButtonStyle={editButtonStyle}
            />
          </div>


          <div className="carousel-item ">
            <Day
              dayName="Thursday"
              evolve={thursObj}
              ourFunction={week3Obj.thurs}
              count={thursCount}
              update={setUpdate}
              editClick={editClick}
              backgroundColor={backColorDay}
              saveClick={saveClick}
              id={idHolder}
              saveButtonStyle={saveButtonStyle}
              editButtonStyle={editButtonStyle}
            />
          </div>


          <div className="carousel-item ">
            <Day
              dayName="Friday"
              evolve={friObj}
              ourFunction={week3Obj.fri}
              count={friCount}
              update={setUpdate}
              editClick={editClick}
              backgroundColor={backColorDay}
              saveClick={saveClick}
              id={idHolder}
              saveButtonStyle={saveButtonStyle}
              editButtonStyle={editButtonStyle}
            />
          </div>


          <div className="carousel-item ">
            <Day
              dayName="Saturday"
              evolve={satObj}
              ourFunction={week3Obj.sat}
              count={satCount}
              update={setUpdate}
              editClick={editClick}
              backgroundColor={backColorDay}
              saveClick={saveClick}
              id={idHolder}
              saveButtonStyle={saveButtonStyle}
              editButtonStyle={editButtonStyle}
            />
          </div>


          <div className="carousel-item ">
            <Day
              dayName="Sunday"
              evolve={sunObj}
              ourFunction={week3Obj.sun}
              count={sunCount}
              update={setUpdate}
              editClick={editClick}
              backgroundColor={backColorDay}
              saveClick={saveClick}
              id={idHolder}
              saveButtonStyle={saveButtonStyle}
              editButtonStyle={editButtonStyle}
            />
          </div>
        </div>


        <a onClick={slide} className="carousel-control-prev" href="#week3" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>

        <a onClick={slide} className="carousel-control-next" href="#week3" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>


      </div>
      </div>

      );
      }

      export default Week3;








// import React,{useState} from "react";
// import Day from "../Week1/Day";
//
// function Week3(props){
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
//       <div id="week3" class="carousel slide" data-ride="carousel" data-interval="false">
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
//           <div class="carousel-item ">
//             <Day
//               dayName="Friday"
//               evolve={friObj}
//               ourFunction={week1Obj.fri}
//               count={friCount}
//             />
//           </div>
//
//
//           <div class="carousel-item ">
//             <Day
//               dayName="Saturday"
//               evolve={satObj}
//               ourFunction={week1Obj.sat}
//               count={satCount}
//             />
//           </div>
//
//
//           <div class="carousel-item ">
//             <Day
//               dayName="Sunday"
//               evolve={sunObj}
//               ourFunction={week1Obj.sun}
//               count={sunCount}
//             />
//           </div>
//         </div>
//         <a class="carousel-control-prev" href="#week3" role="button" data-slide="prev">
//           <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span class="sr-only">Previous</span>
//         </a>
//         <a class="carousel-control-next" href="#week3" role="button" data-slide="next">
//           <span class="carousel-control-next-icon" aria-hidden="true"></span>
//           <span class="sr-only">Next</span>
//         </a>
//       </div>
//     </div>
//
//   );
// }
//
// export default Week3;
