

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
  .catch(error => {
    if (error.name === 'AbortError') {
      // Handle the user-aborted request case
      console.log('The mirror notes request was aborted by the user.');
    } else {
      // Handle other errors
      console.log('An error occurred:', error);
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

        return res.json().then(data=>{
          console.log('from mirror service--->',data);
          return data
        });
      }
      else{
        return {message:{msgBody:"Unauthorized",msgError:true}}
      }
    })
    .catch(error => {
  if (error.name === 'AbortError') {
    // Handle the user-aborted request case
    console.log('The image mirror request was aborted by the user.');
  } else {
    // Handle other errors
    console.log('An error occurred:', error);
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
