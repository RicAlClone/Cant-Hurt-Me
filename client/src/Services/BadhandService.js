
const badhandService={
  getBadhands:(signal)=>{
    return fetch('/user/badhand/getBadHands',{signal})
    .then((res)=>{

      if(res.status !== 401){
        return res.json().then(data=>data)
      }
      else{
        return res.json({message:{msgBody:"Unauthorized",msgError:true}})
      }
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        // Handle the user-aborted request case
        console.log('The badhand notes request was aborted by the user.');
      } else {
        // Handle other errors
        console.log('An error occurred in badhand:', error);
      }
    })  },
  postBadhand: input => {
    return fetch('/user/badhand/postBadHand',{
      method: "post",
      body: JSON.stringify(input),
      headers:{
        'Content-Type':'application/json'
      }
    })

    .then((response)=>{

        if(response.status!==401){
          return response.json().then((data)=>data);
        }else{
          return {message:{msgBody:'Unauthorized',msgError:true}};
        }


    })

  } ,
  deleteBadhand: (id)=>{
    return fetch(`/user/badhand/delete/${id}`,{method:'delete'})
    .then(res=>{
      if(res.status !== 401){
          return res.json().then(data=>data);
      }
      else{
        return {message:{msgBody:"Unauthorized", msgError:true}}
      }

    })

  }

}

export default badhandService;
