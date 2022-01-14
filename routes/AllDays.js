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
             }else{
                 console.log('saved monday model and saved to dayModel property');
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
              }else{
                  console.log('saved monday model and saved to dayModel property');
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
            }else{
                console.log('saved monday model and saved to dayModel property');
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
            }else{
                console.log('saved thurs model, week1');
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
            }else{
                console.log('saved friday model, week1');
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
            }else{
                console.log('saved saturday model, week1');
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
            }else{
                console.log('saved sunday model, week1');
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
           }else{
               console.log('saved mondayWeek2 model ');
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
            }else{
                console.log('saved tuesWeek2 ');
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
          }else{
              console.log('saved wedWeek2 ');
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
          }else{
              console.log('saved thursWeek2 ');
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
          }else{
              console.log('saved friWeek2 ');
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
          }else{
              console.log('saved satWeek2 ');
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
          }else{
              console.log('saved sunWeek2 ');
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
           }else{
               console.log('saved mondayWeek3 model ');
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
            }else{
                console.log('saved tuesWeek3 ');
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
          }else{
              console.log('saved wedWeek3 ');
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
          }else{
              console.log('saved thursWeek3 ');
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
          }else{
              console.log('saved friWeek3 ');
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
          }else{
              console.log('saved satWeek3 ');
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
          }else{
              console.log('saved sunWeek3 ');
          }
      })
    }
})

}

exports.everyDayFunction= everyDayFunction;
