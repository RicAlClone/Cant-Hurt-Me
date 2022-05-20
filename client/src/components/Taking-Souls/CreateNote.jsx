import React, {useState} from "react";
import AddIcon from "../AddIcon";
import {BsFillExclamationCircleFill} from "react-icons/bs"
import Message from "../Message";


function CreateNote(props,{children}) {

// const [startDate,setStartDate]=useState(new Date());
//new Date().toISOString().slice(0,10)
  const [entry, setEntry] = useState({
    date:"",
    title: "",
    paragraph: ""
  })

const [submitCheck,setSubmitCheck]=useState(false);


  function ourChange(event) {
    // const newValue=event.target.value;
    // const name= event.target.name;
    const {name, value} = event.target;

    setEntry(function(prevValue) {
      return {
        ...prevValue,
        [name]: value
      }
console.log('ourChange():',entry);

        //event.target.name is given when we change the html input for date and we give it the value we enter.
        //we are adding that ontop of the new object properties. but when the property key is the same
        //as the name attribute in the date input. it automatically gives that property the value because its not a new name
        //for property.

        //analogy
        //a roster for people who play basketball (red Jersies) who havent recieved jersies yet
        //alex
        //max
        //albert

        // i want to give alex 8 jersy
        //i was giving ricky 8 jersy on accident making him part of the team and alex wasnt showing up to play.


    })
  }


  function handleAddEntry(event) {
    event.preventDefault();

setSubmitCheck(true);
if(!entry.date||!entry.title||!entry.paragraph){
  console.log('something is empty');
}
else{
console.log('handleAddEntry():',entry);
  props.addJournalEntry(entry);
  setEntry(()=>{
    setSubmitCheck(false);
    return(
      {
        date:"",
        title:"",
        paragraph:""
      }
    )
  }
    )
}


}

function dateFilled(property){
  if (!entry[property] && submitCheck){
    return {width:'60%',margin:"0",backgroundColor:"#ffdede"}
  }
  else{
    return {width:'60%',margin:"0",backgroundColor:"white"}
  }
}

function titleFilled(property){
  if (!entry[property] && submitCheck){
    return {margin:"0",backgroundColor:"#ffdede"}
  }
  else{
    return {margin:"0",backgroundColor:"white"}
  }
}

function paragraphFilled(property){
  if (!entry[property] && submitCheck){
    return {margin:"0",backgroundColor:"#ffdede"}
  }
  else{
    return {margin:"0",backgroundColor:"white"}
  }
}


console.log('entry:',entry);
  return (
    <form >
      <div className="all-main-containers">
        <div className="main-contain" style={{paddingBottom:"0",marginBottom:"30px"}}>

          <div style={{margin:'15px 0'}}>
            <div style={{height:"24px"}}>
              {!entry.date&&submitCheck?
                <p style={{color:"#bf2121",marginBottom:"0"}}><BsFillExclamationCircleFill style={{color:"#bf2121"}}/></p>
              :
                null
              }
            </div>

            {/* date-input */}
            <label style={{display:"block"}}>Date:</label>



            <input
              className="inputStyle "
              type="date"
              name="date"
              style={dateFilled('date')}
              onChange={ourChange}  value={entry.date}
              placeholder='enter date'

            />



          </div>


          <div style={{margin:'15px 0'}}>
            <div style={{height:"24px"}}>
              {!entry.title&&submitCheck?
                <p style={{color:"#bf2121",marginBottom:"0"}}><BsFillExclamationCircleFill style={{color:"#bf2121"}}/></p>
              :
                null
              }
            </div>
            <input style={titleFilled('title')} className="inputStyle list-input" name="title" onChange={ourChange}  placeholder="Enter your competitor..." value={entry.title} />
          </div>

          <div style={{margin:'15px 0'}}>
            <div style={{height:"24px"}}>
              {!entry.paragraph&&submitCheck?
                <p style={{color:"#bf2121",marginBottom:"0"}}><BsFillExclamationCircleFill style={{color:"#bf2121"}}/></p>:null}
            </div>
            <textarea style={paragraphFilled('paragraph')} name="paragraph" onChange={ourChange}  placeholder="Explain how you beat your competitor..." value={entry.paragraph} />
          </div>

          <div style={{height:"39px",margin:"10px 0"}}>
            {
              props.message?

                <Message style={{height:"39px"}} message={props.message}/>

              :
              null
            }
          </div>


          <button type='submit' onClick={handleAddEntry} style={{display: "block"}} className="bottom-right-add-button">
            <AddIcon/>
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateNote;
