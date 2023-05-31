
const takingSoulsService={
  addTSNote: (note)=>{
    return fetch('/user/takingSouls/addTSNote',{
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(note)
    })
    .then(res=>{
      if(res.status !== 401){
        return res.json().then(data=>data);
      }else{
        return {message:{msgBody:"Unauthorized",msgError:true}}
      }
    })
  },
  getTSNotes: (signal)=>{
    return fetch('/user/takingSouls/getTSNotes',{signal})
    .then(res=>{
      if(res.status !== 401){
        return res.json().then(data=>data);
      }else{
        return {message:{msgBody:"Unauthorized", msgError:true}}
      }
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        // Handle the user-aborted request case
        console.log('The taking souls notes request was aborted by the user.');
      } else {
        // Handle other errors
        console.log('An error occurred in taking souls notes');
      }
    })
  },
  deleteTSNote: (note)=>{
    return fetch(`/user/takingSouls/deleteTSNotes/${note}`,{
      method: "DELETE"
    })
    .then(res=>{
      if(res.status !== 401){
        return res.json().then(data=>data)
      }else{
        return {message:{msgBody:"Unauthorized",msgError:true}}
      }
    })
  }
}

export default takingSoulsService;
