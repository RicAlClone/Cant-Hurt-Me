const cookieJarService={
  postCookie:(note)=>{
    return fetch('/user/cookieJar/postCookie',{
      method: 'POST',
      body: JSON.stringify(note),
      headers:{'Content-Type': 'application/json'}
    })
    .then((res)=>{
      if(res.status !== 401){
        return res.json().then(data=>data);
      }
      else{
        return {message:{msgBody:'Unauthorized',msgError:true}};
      }
    })
  },
  getCookies:(signal)=>{
    return fetch('/user/cookieJar/getCookies',{signal})
    .then((res)=>{
      if(res.status!==401){
        return res.json().then((data)=>data);
      }
      else{
        return {message:{msgBody:"Unauthorized",msgError:true}};
      }
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        // Handle the user-aborted request case
        console.log('The cookie jar notes request was aborted by the user.');
      } else {
        // Handle other errors
        console.log('An error occurred in cookie jar:', error);
      }
    })
  },
  deleteCookie:(id)=>{
return fetch(`/user/cookieJar/deleteCookie/${id}`,{
  method:'DELETE'
})
.then((res)=>{
  if(res.status !== 401){
    return res.json().then(data=>data);
  }
  else{
    return {message:{msgBody:'Unauthorized',msgError:true}};
  }
})
  }
}

export default cookieJarService;
