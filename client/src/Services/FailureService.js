
const failureService={
post:(note)=>{
  return fetch('/user/failure/postFailureNote',{
    method:"POST",
    body:JSON.stringify(note),
    headers:{'Content-Type':'application/json'}
  })
  .then(res=>{
    if(res.status!==401){
      return res.json().then(data=>data);
    }
    else{
      return {message:{msgBody:"Unauthorized",msgError:true}}
    }
  })
},
get:(signal)=>{
  return fetch("/user/failure/getFailureNotes",{signal})
  .then(res=>{
    if(res.status!==401){
      return res.json().then(data=>data)
    }
    else{
      return {message:{msgBody:"Unauthorized",msgError:true}}
    }
  })
  .catch(error => {
    if (error.name === 'AbortError') {
      // Handle the user-aborted request case
      console.log('The failure notes request was aborted by the user.');
    } else {
      // Handle other errors
      console.log('An error occurred in failure:', error);
    }
  })
},
delete:(id)=>{
  return fetch(`/user/failure/deleteFailureNote/${id}`,{
    method: 'DELETE',
  })
  .then(res=>{
    if(res.status!==401){
      return res.json().then(data=>data);
    }
    else{
      return {message:{msgBody:"Unauthorized",msgError:true}}
    }
  })
}
}

export default failureService;
