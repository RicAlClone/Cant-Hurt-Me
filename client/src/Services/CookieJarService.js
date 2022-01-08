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
  getCookies:()=>{
    return fetch('/user/cookieJar/getCookies')
    .then((res)=>{
      if(res.status!==401){
        return res.json().then((data)=>data);
      }
      else{
        return {message:{msgBody:"Unauthorized",msgError:true}};
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
