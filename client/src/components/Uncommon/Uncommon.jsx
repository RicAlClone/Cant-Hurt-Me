import React,{useState} from "react";
import CreateNote from "../Taking-Souls/CreateNote";
import Note from "../Taking-Souls/Note";
import {Link} from "react-router-dom";



function Uncommon(){

const [array, setArray]=useState([]);


function addJournalEntry( entry){

  setArray(function(prevJournal){
    return [...prevJournal, entry]
  })


}

function deleteJournalEntry(id){

  setArray(function(prev){
    return prev.filter(function(items,index){
      return index !== id;
    })
  })
}

  return(
    <div className="body-padding">
      <h1 className="all-title">Uncommon Challenge</h1>
      <ul className="instruction-bullets">
        <li>Stand out amongst the people around you in a positive way.</li>
        <li>Note those times and how you accomplished this challenge.</li>
      </ul>


      <CreateNote
        addJournalEntry={addJournalEntry}
      />

      <div className="row">
        {array.map(function(arrayItem, index){
          return <Note
            key={index}
            id={index}
            calendar={arrayItem.date}
            title={arrayItem.title}
            paragraph={arrayItem.paragraph}
            deleteJournalEntry= {deleteJournalEntry}
                 />
        })}

      </div>
      <div>
        <Link className="first-challenge-link" as={Link} to="/EmpowermentFailure">Next Challenge</Link>      </div>
    </div>
  );
};


export default Uncommon;
