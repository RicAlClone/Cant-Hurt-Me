

const mirrorService={

 postMirrorNote:(note)=>{
   return fetch('/user/mirror/addMirrorNote',{
     //headers
     method: 'Post',
     body: JSON.stringify(note),
     headers:{
       'Content-Type': 'application/json'
     }

   })
   .then(response=>{
     if( response.status !== 401){
       return response.json().then(data=>data)
      }
      else{
        return {message:{msgBody:"Unauthorized",msgError:true}};
      }
   })

 },

getMirrorNotes:(signal)=>{
  return fetch('/user/mirror/getMirrorNotes',{signal})
  .then(response=>{
    if(response.status !== 401){
    return response.json().then(data=>data)
  }
    else{
      return {message:{msgBody:"Unauthorized",msgError:true}}
    }
  })

},
deleteMirrorNote: (id)=>{
  return fetch(`/user/mirror/deleteMirrorNote/${id}`,
    {
      method: 'delete',
      headers: {'Content-Type': 'application/json'}
  })
.then(res=>{
  if(res.status !== 401){
      return res.json().then(data=>data)
  }else{
    return {message:{msgBody:"Unauthorized",msgError:true}}
  }
})

},
postImage:(body)=>{
  return fetch(`/user/mirror/postImage`,{
    method:'POST',
    body:JSON.stringify(body),
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
getImage:(signal)=>{
  return fetch('/user/mirror/getImage',{signal})
  .then(res=>{
    if(res.status!==401){
      return res.json().then(data=>data);
    }
    else{
      return {message:{msgBody:"Unauthorized",msgError:true}}
    }
  })
},
updateImage:(id,body)=>{
  return fetch(`/user/mirror/updateImage/${id}`,{
    method:'PUT',
    body:JSON.stringify(body),
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
}
}
export default mirrorService;
