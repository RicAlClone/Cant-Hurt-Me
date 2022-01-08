
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
  getArmoredNotes:()=>{
    return fetch('/user/armoredMind/getArmoredNotes',{method:'GET'})
    .then(res=>{
      if(res.status !==401){
        return res.json()
        .then(data=>data);
      }else{
        return {message:{msgBody:"Unauthorized",msgError:true}}
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
