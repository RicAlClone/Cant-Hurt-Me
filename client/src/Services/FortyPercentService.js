

const fortyPercentService={
postRuleNote:(note)=>{
  return fetch('/user/fortyPercentRule/postRuleNote',{
    headers:{'Content-type':'application/json'} ,
    body: JSON.stringify(note),
    method:'POST'
      })
      .then(res=>{
        if (res.status !==401){
          return res.json().then(data=>data);
        }
        else{
          return {message:{msgBody:'Unauthorized',msgError:true}}
        }
      })
},
getRuleNotes:()=>{
  return fetch('/user/fortyPercentRule/getRuleNotes')
  .then(res=>{
    if(res.status !==401){
      return res.json().then(data=>data);
    }
    else{
      return {message:{msgBody:"Unauthorized",msgError:true}}
    }
  })
},
deleteRuleNote:(id)=>{
  return fetch(`/user/fortyPercentRule/deleteRuleNote/${id}`,{
    method:'DELETE'
  })
  .then(res=>{
    if(res.status !== 401){
      return res.json().then(data=>data);
    }
    else{
      return {message:{msgBody:'Unauthorized',msgError:true}}
    }
  })
},

updateRuleNote:(id,toUpdate)=>{
  return fetch(`/user/fortyPercentRule/updateRuleNote/${id}`,{
    method:"PUT",
    body:JSON.stringify(toUpdate),
    headers:{'Content-type':'application/json'}

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
export default fortyPercentService;
