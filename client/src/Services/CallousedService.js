
const callousedService= {

postCallousedNote: (input)=>{
  return fetch('/user/calloused/postCallousedNote',{

    method : 'POST',
    body: JSON.stringify(input),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res=>{
    if(res.status !==401){
      return res.json().then(data=>data);
    }else{
      return {message:{msgBody:"Unauthorized",msgError:true}}
    }
  })
},

getCallousedNotes: (signal)=>{
  return fetch('/user/calloused/getCallousedNotes',{signal})
  .then(res=>{
    if(res.status !== 401){
      return res.json().then(data=>data)
    }else{
      return {message:{msgBody:"Unauthorized",msgError:true}}
    }
  })
  .catch(error => {
    if (error.name === 'AbortError') {
      // Handle the user-aborted request case
      console.log('The calloused notes request was aborted by the user.');
    } else {
      // Handle other errors
      console.log('An error occurred in calloused:', error);
    }
  })
},

deleteCallusNote:(id)=>{
  return fetch(`/user/calloused/deleteCallusNote/${id}`,{
    method:"delete" //lets see if this works without other header properties
  })
  .then(res=>{
    if(res.status !== 401){
      return res.json().then(data=>data)
    }else{
      return {message:{msgBody:"Unauthorized",msgError:true}}
    }
  })
} ,

}

export default callousedService;
