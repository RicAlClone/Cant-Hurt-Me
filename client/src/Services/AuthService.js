 const authService= {
login: (user)=>{
  return fetch('/user/login',{
//1. POST is not capitalized
    method: 'POST',
    //2.should have used user in param instead of data
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
      // isAuthenticated: false,
      // user:{username: ''}
    }
    }
  })
},

  register: (registerData)=>{
    return fetch('/user/register',{
      method: 'POST',
      //3. use user in param instead of data
      body: JSON.stringify(registerData),
      headers: {'Content-Type': 'application/json'}
    }).then(res=>res.json())
    .then(data=>data);
  },

logOut: ()=>{
  console.log('logged out');
  return fetch('/user/logout')
  .then(res=>res.json())
  .then(data=>data)
},//forgot comma here might be the problem


  isAuthenticated: ()=>{
    return fetch('/user/authenticated')
    .then(res=>{
      if(res.status !== 401){
        //i didnt understand that we can
        //include .then promise inside our first then promise
        //also i wrote my instructions wrong.
        return res.json().then(data=>data);
      }
      else{
        return {isAuthenticated:false, user:{username:''}}
      }
    })
  }
}

export default authService;
