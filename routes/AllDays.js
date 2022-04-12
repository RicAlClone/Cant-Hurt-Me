// const DayModel= require('../models/Schedule.model');
// const skeleton = require('../models/Skeleton');
const User= require('../models/User');


//we write a function that has a loop that returns every elem in array
// ii feeel like i did this before but send result._id to everytime
//we save a day and use result._id to look up the User and find the dayModel area and add
//the saved._id

function everyDayFunction(DayModel,skeleton,result){

  const monday= new DayModel(skeleton);
    monday.save((err,saved)=>{
     if(err){
          console.log(err);
         }
         else{
           //we have to somehow push our monday model to User.dayModel array.
           //what if we access the User models and find by
           let id=result._id;
           let idOfDay=saved._id;
           User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
             if(err){
               console.log(err);
             }
           })
          }//else ends
        })//save ends

  const tuesWeek1= new DayModel(skeleton);
    tuesWeek1.save((err,saved)=>{
      if(err){
          console.log(err);
          }
          else{

            let id=result._id;
            let idOfDay=saved._id;
            User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
              if(err){
                console.log(err);
              }
          })
        }
})


const wedWeek1= new DayModel(skeleton);
  wedWeek1.save((err,saved)=>{
    if(err){
        console.log(err);
        }
        else{

          let id=result._id;
          let idOfDay=saved._id;
          User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
            if(err){
              console.log(err);
            }
        })
      }
})

const thursWeek1= new DayModel(skeleton);
  thursWeek1.save((err,saved)=>{
    if(err){
        console.log(err);
        }
        else{

          let id=result._id;
          let idOfDay=saved._id;
          User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
            if(err){
              console.log(err);
            }
        })
      }
})

const friWeek1= new DayModel(skeleton);
  friWeek1.save((err,saved)=>{
    if(err){
        console.log(err);
        }
        else{

          let id=result._id;
          let idOfDay=saved._id;
          User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
            if(err){
              console.log(err);
            }
        })
      }
})

const satWeek1= new DayModel(skeleton);
  satWeek1.save((err,saved)=>{
    if(err){
        console.log(err);
        }
        else{

          let id=result._id;
          let idOfDay=saved._id;
          User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
            if(err){
              console.log(err);
            }
        })
      }
})

const sunWeek1= new DayModel(skeleton);
  sunWeek1.save((err,saved)=>{
    if(err){
        console.log(err);
        }
        else{

          let id=result._id;
          let idOfDay=saved._id;
          User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
            if(err){
              console.log(err);
            }
        })
      }
})

const mondayWeek2= new DayModel(skeleton);
  mondayWeek2.save((err,saved)=>{
   if(err){
        console.log(err);
       }
       else{
         //we have to somehow push our monday model to User.dayModel array.
         //what if we access the User models and find by
         let id=result._id;
         let idOfDay=saved._id;
         User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
           if(err){
             console.log(err);
           }
         })
        }//else ends
      })//save ends

const tuesWeek2= new DayModel(skeleton);
  tuesWeek2.save((err,saved)=>{
    if(err){
        console.log(err);
        }
        else{

          let id=result._id;
          let idOfDay=saved._id;
          User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
            if(err){
              console.log(err);
            }
        })
      }
})


const wedWeek2= new DayModel(skeleton);
wedWeek2.save((err,saved)=>{
  if(err){
      console.log(err);
      }
      else{

        let id=result._id;
        let idOfDay=saved._id;
        User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
          if(err){
            console.log(err);
          }
      })
    }
})

const thursWeek2= new DayModel(skeleton);
thursWeek2.save((err,saved)=>{
  if(err){
      console.log(err);
      }
      else{

        let id=result._id;
        let idOfDay=saved._id;
        User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
          if(err){
            console.log(err);
          }
      })
    }
})

const friWeek2= new DayModel(skeleton);
friWeek2.save((err,saved)=>{
  if(err){
      console.log(err);
      }
      else{

        let id=result._id;
        let idOfDay=saved._id;
        User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
          if(err){
            console.log(err);
          }
      })
    }
})

const satWeek2= new DayModel(skeleton);
satWeek2.save((err,saved)=>{
  if(err){
      console.log(err);
      }
      else{

        let id=result._id;
        let idOfDay=saved._id;
        User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
          if(err){
            console.log(err);
          }
      })
    }
})

const sunWeek2= new DayModel(skeleton);
sunWeek2.save((err,saved)=>{
  if(err){
      console.log(err);
      }
      else{

        let id=result._id;
        let idOfDay=saved._id;
        User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
          if(err){
            console.log(err);
          }
      })
    }
})


const mondayWeek3= new DayModel(skeleton);
  mondayWeek3.save((err,saved)=>{
   if(err){
        console.log(err);
       }
       else{
         //we have to somehow push our monday model to User.dayModel array.
         //what if we access the User models and find by
         let id=result._id;
         let idOfDay=saved._id;
         User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
           if(err){
             console.log(err);
           }
         })
        }//else ends
      })//save ends

const tuesWeek3= new DayModel(skeleton);
  tuesWeek3.save((err,saved)=>{
    if(err){
        console.log(err);
        }
        else{

          let id=result._id;
          let idOfDay=saved._id;
          User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
            if(err){
              console.log(err);
            }
        })
      }
})


const wedWeek3= new DayModel(skeleton);
wedWeek3.save((err,saved)=>{
  if(err){
      console.log(err);
      }
      else{

        let id=result._id;
        let idOfDay=saved._id;
        User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
          if(err){
            console.log(err);
          }
      })
    }
})

const thursWeek3= new DayModel(skeleton);
thursWeek3.save((err,saved)=>{
  if(err){
      console.log(err);
      }
      else{

        let id=result._id;
        let idOfDay=saved._id;
        User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
          if(err){
            console.log(err);
          }
      })
    }
})

const friWeek3= new DayModel(skeleton);
friWeek3.save((err,saved)=>{
  if(err){
      console.log(err);
      }
      else{

        let id=result._id;
        let idOfDay=saved._id;
        User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
          if(err){
            console.log(err);
          }
      })
    }
})

const satWeek3= new DayModel(skeleton);
satWeek3.save((err,saved)=>{
  if(err){
      console.log(err);
      }
      else{

        let id=result._id;
        let idOfDay=saved._id;
        User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
          if(err){
            console.log(err);
          }
      })
    }
})

const sunWeek3= new DayModel(skeleton);
sunWeek3.save((err,saved)=>{
  if(err){
      console.log(err);
      }
      else{

        let id=result._id;
        let idOfDay=saved._id;
        User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
          if(err){
            console.log(err);
          }
      })
    }
})

}

exports.everyDayFunction= everyDayFunction;
