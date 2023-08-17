
const uncommonService={
  post:(note)=>{
    return fetch('/user/uncommon/postUncommonNote',{
      method:'Post',
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
    return fetch('/user/uncommon/getUncommonNotes',{signal})
    .then(res=>{
      if(res.status!==401){
        return res.json().then(data=>data);
      }
      else{
        return {message:{msgBody:"Unauthorized",msgError:true}}
      }
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        // Handle the user-aborted request case
        // console.log('The uncommon notes request was aborted by the user.');
      } else {
        // Handle other errors
        console.log('An error occurred in uncommon:', error);
      }
    })
  },
  delete:(id)=>{
    return fetch(`/user/uncommon/deleteUncommonNote/${id}`,{
      method:"DELETE"
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

export default uncommonService;
