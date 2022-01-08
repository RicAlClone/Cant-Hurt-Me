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

//   const tuesWeek1= new DayModel(skeleton);
//     tuesWeek1.save((err,saved)=>{
//       if(err){
//           console.log(err);
//           }
//           else{
//
//             let id=result._id;
//             let idOfDay=saved._id;
//             User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
//               if(err){
//                 console.log(err);
//               }else{
//                   console.log('saved monday model and saved to dayModel property');
//               }
//           })
//         }
// })


// const wedWeek1= new DayModel(skeleton);
//   wedWeek1.save((err,saved)=>{
//     if(err){
//         console.log(err);
//         }
//         else{
//
//           let id=result._id;
//           let idOfDay=saved._id;
//           User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
//             if(err){
//               console.log(err);
//             }else{
//                 console.log('saved monday model and saved to dayModel property');
//             }
//         })
//       }
// })

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
               console.log('saved mondayWeek2 model and saved to dayModel property');
           }
         })
        }//else ends
      })//save ends

// const tuesWeek2= new DayModel(skeleton);
//   tuesWeek2.save((err,saved)=>{
//     if(err){
//         console.log(err);
//         }
//         else{
//
//           let id=result._id;
//           let idOfDay=saved._id;
//           User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
//             if(err){
//               console.log(err);
//             }else{
//                 console.log('saved tuesWeek2 model and saved to dayModel property');
//             }
//         })
//       }
// })


// const wedWeek2= new DayModel(skeleton);
// wedWeek2.save((err,saved)=>{
//   if(err){
//       console.log(err);
//       }
//       else{
//
//         let id=result._id;
//         let idOfDay=saved._id;
//         User.updateOne({_id:id},{$push:{dayModel:idOfDay}},(err,found)=>{
//           if(err){
//             console.log(err);
//           }else{
//               console.log('saved wedWeek2 model and saved to dayModel property');
//           }
//       })
//     }
// })

}


exports.everyDayFunction= everyDayFunction;
