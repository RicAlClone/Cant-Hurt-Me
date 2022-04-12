 const authService= {
login: (user)=>{
  return fetch('/user/login',{
    method: 'POST',
    body: JSON.stringify(user),
    headers: {'Content-Type': 'application/json'}
  }).then((res)=>{
    if(res.status !== 401){
      return res.json().then(data=>data);
    }
    else{
    return {
      message:{
        msgBody:"Check username and password",
        msgError:true
      }

    }
    }
  })
},

  register: (registerData)=>{
    return fetch('/user/register',{
      method: 'POST',
      body: JSON.stringify(registerData),
      headers: {'Content-Type': 'application/json'}
    }).then(res=>res.json())
    .then(data=>data);
  },

logOut: ()=>{
  return fetch('/user/logout')
  .then(res=>res.json())
  .then(data=>data)
},


  isAuthenticated: ()=>{
    return fetch('/user/authenticated')
    .then(res=>{
      if(res.status !== 401){

        return res.json().then(data=>data);
      }
      else{
        return {isAuthenticated:false, user:{username:''}}
      }
    })
  },

  googleAuth:()=>{
    return fetch('/user/auth/google')
    .then(res=>{
      if(res.status !== 401){

        return res.json().then(data=>data);
      }
      else{
        return {isAuthenticated:false, user:{username:''}}
      }
    })
  }
}

export default authService;
