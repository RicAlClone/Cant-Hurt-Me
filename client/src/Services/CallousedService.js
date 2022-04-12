
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

getCallousedNotes: ()=>{
  return fetch('/user/calloused/getCallousedNotes')
  .then(res=>{
    if(res.status !== 401){
      return res.json().then(data=>data)
    }else{
      return {message:{msgBody:"Unauthorized",msgError:true}}
    }
  })

} ,

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
