
const badhandService={
  getBadhands:()=>{
    return fetch('/user/badhand/getBadHands')
    .then((res)=>{
      // passport send a 401 when not authorized
      //what i need to understand a bit more is what res.json() does
      if(res.status !== 401){
        return res.json().then(data=>data)
      }
      else{
        return res.json({message:{msgBody:"Unauthorized",msgError:true}})
      }
    })
  },
  postBadhand: input => {
    return fetch('/user/badhand/postBadHand',{
      method: "post", //first problem i had header as prop here wich is wrong
      body: JSON.stringify(input),
      headers:{      //second problem is headers should have been an object
        'Content-Type':'application/json' //third problem content type inclosed in ''
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
