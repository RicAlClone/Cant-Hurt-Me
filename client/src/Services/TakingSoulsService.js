
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
  getTSNotes: ()=>{
    return fetch('/user/takingSouls/getTSNotes')
    .then(res=>{
      if(res.status !== 401){
        return res.json().then(data=>data);
      }else{
        return {message:{msgBody:"Unauthorized", msgError:true}}
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
