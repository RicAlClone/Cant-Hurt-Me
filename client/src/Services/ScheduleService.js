
const ScheduleService={
  getSchedule:(signal)=>{
    return fetch('/user/schedule/scheduleGetDays',{signal})
    .then(res=>{
      if(res.status!==401){
        return res.json().then(data=>data);
      }
      else{
        return {message:{msgBody:'Unauthorized',msgError:true}};
      }
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        // Handle the user-aborted request case
        // console.log('The schedule notes request was aborted by the user.');
      } else {
        // Handle other errors
        console.log('An error occurred in schedule:', error);
      }
    })
  },

  updateDay:(id,body)=>{
    return fetch(`/user/schedule/dayUpdate/${id}`,{
      method:'PUT',
      body:JSON.stringify(body),
      headers:{'Content-type':'application/json'}
    })
    .then(res=>{
      if(res.status!==401){
        return res.json().then(data=>data);
      }
      else{
        return {message:{msgBody:'Unauthorized',msgError:true}};
      }
    })
  }
}

export default ScheduleService;
