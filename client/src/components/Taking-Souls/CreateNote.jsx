import React, {useState} from "react";
import AddIcon from "../AddIcon";
import RequiredMessage from "../RequiredMessage";

function CreateNote(props) {

  const [entry, setEntry] = useState({
    date: "",
    title: "",
    paragraph: ""
  })

  const [required,setRequired]=useState({
    date:false,
    title:false,
    paragraph:false
  })


  function ourChange(event) {
    // const newValue=event.target.value;
    // const name= event.target.name;
    const {name, value} = event.target;

    setEntry(function(prevValue) {
      return {
        ...prevValue,
        [name]: value
      }


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

  const block = {
    display: "block",
    width: "100%",
    border: "none"
  }

  function handleAddEntry(event) {
    event.preventDefault();
    if(entry.date && entry.title && entry.paragraph !== ""){
      props.addJournalEntry(entry);
      setEntry({
        date: "",
        title: "",
        paragraph: ""
      })
    }
    ////Date
    if(entry.date === ""){

    setRequired((prev)=>{
      return({
        date: true,
        title: prev.title,
        paragraph: prev.paragraph
      })
    })
  }
  else{
    setRequired((prev)=>{
      return({
        date: false,
      title: prev.title,
      paragraph: prev.paragraph
    })
    })
  }
////Title
if(entry.title === ""){

setRequired((prev)=>{
  return({
    date: prev.date,
    title: true,
    paragraph: prev.paragraph
  })
})
}
else{
setRequired((prev)=>{
  return({
    date: prev.date,
  title: false,
  paragraph: prev.paragraph
})
})
}
////Paragraph
if(entry.paragraph === ""){

setRequired((prev)=>{
  return({
    date: prev.date,
    title: prev.title,
    paragraph: true
  })
})
}
else{
setRequired((prev)=>{
  return({
    date: prev.date,
  title: prev.title,
  paragraph: false
})
})
}

}

  return (
    <form >
      <div className="all-main-containers">
        <div className="main-contain">
          <br/>
          {required.date?<RequiredMessage />: null}
          <br/>
          <input name="date"  onChange={ourChange} type="date" value={entry.date} />
          <br/>
          {required.title?<RequiredMessage />: null}
          <br/>
          <input name="title" onChange={ourChange} style={block} placeholder="Enter your competitor..." value={entry.title} />
          <br/>
          {required.paragraph?<RequiredMessage />: null}
          <br/>
          <textarea name="paragraph" onChange={ourChange} style={block} placeholder="Write how you beat your competitor..." value={entry.paragraph} />

          <button type='submit' onClick={handleAddEntry} style={{display: "block"}} className="bottom-right-add-button">
            <AddIcon/>
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateNote;
