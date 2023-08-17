
 const armoredMindService = {
  postArmoredNote:(note)=>{
    return fetch('/user/armoredMind/addArmoredNote',{
      method: 'POST',
      headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(note),
    })
    .then(response=>{
      if(response.status !== 401){
        return response.json()
        .then(data=>data);
      }
      else{
        return {message:{msgBody:"Unauthorized",msgError:true}}
      }
    })

  },
  getArmoredNotes:(signal)=>{
    return fetch('/user/armoredMind/getArmoredNotes',{method:'GET'},{signal})
    .then(res=>{
      if(res.status !==401){
        return res.json()
        .then(data=>data);
      }else{
        return {message:{msgBody:"Unauthorized",msgError:true}}
      }
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        // Handle the user-aborted request case
        // console.log('The armoured mind notes request was aborted by the user.');
      } else {
        // Handle other errors
        console.log('An error occurred in armoured mind:', error);
      }
    })
  },
  deleteArmoredNote:(id)=>{
    return fetch(`/user/armoredMind/deleteArmoredNote/${id}`,{
      method:'DELETE'
    })
    .then(res=>{
      if(res.status !==401){
        return res.json()
        .then(data=>data);
      }else{
        return {message:{msgBody:"Unauthorized",msgError:true}}
      }
    })
  },
}

export default armoredMindService;
