

const mirrorService={
  // when we want to add a mirror-note
  //what can go wrong?
    //wont be read
    //is not authorized
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
  //when we want to get back all mirror-notes
  //what can go wrong?
      //is not authorized
getMirrorNotes:()=>{
  return fetch('/user/mirror/getMirrorNotes')
  .then(response=>{
    if(response.status !== 401){
    return response.json().then(data=>data)
  }
    else{
      return {message:{msgBody:"Unauthorized",msgError:true}}
    }
  })

},
  //we want to be able to delete a mirror-note
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

}
}
export default mirrorService;
