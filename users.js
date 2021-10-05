//const {step1,step2,step3} = require('./functions');

const compressor_config = require("./compressor_config");
const room_permutations = require('./room_permutations');
const room_perm_for_each_config = require('./room_perm_for_each_config');
const step5 = require('./step5');

let rocc=[]
let sys1=[]
let sys2=[]
let sys3=[]
let sys4=[]
let efficiency_profile=[]
function step1(area,room_temp,ceiling_height){
    
    var basic_cooling_load = 0;
    var room_height_to_ceiling = 0;


  Object.keys(dbobj).forEach(function (i) {
    if(Number(ceiling_height) === Number(dbobj[i].ceiling_value)){
       room_height_to_ceiling=dbobj[i].ceil_factor;
    }
});

  Object.keys(db1obj).forEach(function (i) {
    if(Number(room_temp) === Number(db1obj[i].roomtemp)){
      basic_cooling_load = db1obj[i].wsqm;     
    }
});
   const Cooling_load = basic_cooling_load * room_height_to_ceiling; 
 return Cooling_load;
}



function step2(area,cl){
  const true_load = area * cl * load_rating_factor;
  totrooms1=totrooms1+1;
  // sum_of_all_true_loads = sum_of_all_true_loads+true_load;
   return true_load;
}


function step3(true_load,cooling_capacity,sum_of_all_true_loads){
   
   var min_load_factor=1;
   var max_load_factor=1.5;
   var comp=1;
 
   var system_cooling_limit = 8510;  
   

   const min_true_load = min_load_factor * sum_of_all_true_loads;
   const max_true_load = max_load_factor * sum_of_all_true_loads;
   localvar.min_true_load = min_true_load;
   localvar.max_true_load = max_true_load;


   //no.of comp needed                   //sum of all true loads  //25000
   localvar.compressor_needed=Math.round(sum_of_all_true_loads/system_cooling_limit)
  //  if(sum_of_all_true_loads < system_cooling_limit){
  //   comp=1;
  //   localvar.compressor_needed=comp;
  // }
  //   else{
  //  while(sum_of_all_true_loads > system_cooling_limit){
  //   comp=comp+1;
  //   sum_of_all_true_loads = sum_of_all_true_loads - system_cooling_limit;
  //  localvar.compressor_needed=comp;
  //  }
  //  }
} 


var totrooms1=0;
const localvar = {};

let rooms=[];
var load_rating_factor = 1.15;
var sum_of_all_true_loads=0;
let dbobj={};
let db1obj={};
var b1=0;var li1count=0;
var li1=[];var li2=[];var li3=[];
const {Client} = require('pg');

const client=new Client({
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "myPassword",
    "database": "coolingalgo",    
})

client.connect();
client.query(`select * from ceiling_factors`,(err,result)=>{
    if(!err){
    dbobj=result.rows;
    
}
})

client.query(`select * from room_temp_coolings`,(err,result)=>{
    if(!err){
    db1obj=result.rows;
    // client.end();
}
})
client.query(`select * from rooms`,(err,result)=>{
    if(!err){
    rooms=result.rows;
    // client.end();
}
})
client.query(`select * from system1`,(err,result)=>{
    if(!err){
    sys1=result.rows;
    // client.end();
}
})
client.query(`select * from system2`,(err,result)=>{
    if(!err){
    sys2=result.rows;
    // client.end();
}
})
client.query(`select * from system3`,(err,result)=>{
    if(!err){
    sys3=result.rows;
    // client.end();
}
})
client.query(`select * from system4`,(err,result)=>{
    if(!err){
    sys4=result.rows;
    // client.end();
}
})
client.query(`select * from occupancy_pattern`,(err,result)=>{
    if(!err){
    rocc=result.rows;
    // client.end();
}
})
client.query(`select * from eff_profile`,(err,result)=>{
    if(!err){
    efficiency_profile=result.rows;
    // client.end();
}
})
module.exports={
 asd(req,res,next){

  let each_room_cooling_load = [];
  let each_room_load = [];

  Object.keys(rooms).forEach(function (i) {
    each_room_cooling_load.push(step1(rooms[i].area,rooms[i].room_temp,rooms[i].ceiling_height));
    res.locals.each_room_cooling_load = each_room_cooling_load;
});

  Object.keys(rooms).forEach(function (i) {
  	each_room_load.push(step2(rooms[i].area,each_room_cooling_load[i])); 
  	res.locals.each_room_load = each_room_load;
});

  
Object.keys(each_room_load).forEach(function (i) {
    sum_of_all_true_loads=sum_of_all_true_loads+each_room_load[i];   
});

  Object.keys(rooms).forEach(function (i) {
  	step3(each_room_load[i],each_room_cooling_load[i],sum_of_all_true_loads); 	
});

// console.log("totrooms"+totrooms);
  const {min_true_load,max_true_load,compressor_needed} = localvar;

res.locals.sum_of_all_true_loads=sum_of_all_true_loads;
res.locals.min_true_load = min_true_load;
res.locals.max_true_load = max_true_load;
res.locals.totrooms1 = totrooms1;
res.locals.compressor_needed = compressor_needed;
   var arr=[];
for(var g=0;g<totrooms1;g++){
arr[g]=g+1;
}



var totnoofcomp = compressor_needed        //compressor_needed


var output=[]

output = compressor_config.combineElements(totrooms1);

console.log("-----------------------------")
console.log("Compressors Configurations")
console.log("-----------------------------")
for(var i=0;i<output.length;i++){
  if(output[i].length==totnoofcomp){
    console.log(output[i])
  }
}

console.log("-----------------------------")
console.log("Room Permutations")
console.log("-----------------------------")
var RoomPermutations = room_permutations.permute(arr);
console.log(RoomPermutations)

var room_perm_for_each_config1 = room_perm_for_each_config.start(totnoofcomp,output,RoomPermutations);
console.log(room_perm_for_each_config1);





var roomid=[]
var compressorno=[]
var configno=[]

for(var i=0;i<room_perm_for_each_config1.length;i++){
  for(var j=0;j<room_perm_for_each_config1[i].length;j++){
    for(var k=0;k<room_perm_for_each_config1[i][j].length;k++){
      roomid.push(room_perm_for_each_config1[i][j][k])
      compressorno.push(j+1)
       configno.push(i+1)
    }
  }
}

res.locals.roomid=roomid
res.locals.compressorno=compressorno
res.locals.configno=configno

// // console.log(roomid)
// // console.log("--------------")
// // console.log(compressorno)
// // console.log("--------------")
// // console.log(configno)















//---------------------------------------------------------------------------------------------------
var output1=[]
output1=room_perm_for_each_config1


var a=[],b=[]
var lisys1=[]
// var each_room_load1=
// [
//      // 1634.61,   
//   2800,
//   526.47,
//   // 870.2049999999998,
//  2250,
//  820,
//  2200,
//  1000

// ]
// var outputex=
// [
//   // [[5],[6],[4,3,2,1]],
//   // [[6],[5],[4,3,2,1]],
//   // [[4],[6],[5,3,2,1]],
//   // [[6],[4,5],[3,2,1]],
//   // [[6],[5,4],[3,2,1]]
//   [ [ 1 ], [ 2 ], [ 3, 4, 5, 6 ] ],
//   [ [ 1 ], [ 3 ], [ 2, 4, 5, 6 ] ],
//   [ [ 1 ], [ 4 ], [ 2, 3, 5, 6 ] ],
//   [ [ 1 ], [ 2, 4 ], [ 3, 5, 6 ] ],
//   [ [ 1 ], [ 2, 5 ], [ 3, 4, 6 ] ]
  
// ]
var ccc=0;
var selected_product_list=[]
var selected_product_list1=[]
for(var i=0;i<output1.length;i++){
  // console.log(output1[i])   ///final room permutations after removing duplicates
ccc=0
  for(var j=0;j<output1[i].length;j++){
    a=output1[i]

    if(a[j].length==4){
      // console.log(a[j]);
      // console.log(qwe4(a[j]));
      selected_product_list.push(qwe4(a[j])); 
    }
    if(a[j].length==3){
      // console.log(a[j]);
      // console.log(qwe3(a[j]));
      selected_product_list.push(qwe3(a[j]));}
    if(a[j].length==2){
      // console.log(a[j]);
      // console.log(qwe2(a[j]));
      selected_product_list.push(qwe2(a[j]));}
    if(a[j].length==1){
      // console.log(a[j]);
      // console.log(qwe1(a[j]));
      selected_product_list.push(qwe1(a[j]));}
    // for(var k=0;k<a[j].length;k++){
    //   b=a[j]
    //   console.log(b[k])
    // }
 
  }

}
// console.log("-----------------")
// console.log(selected_product_list[476])
function qwe4(arr){
  var li1=[];var alltrueload=[];var f=[];
  
  for(var i=0;i<arr.length;i++){
    alltrueload.push(each_room_load[arr[i]-1])}
    alltrueload = alltrueload.sort(function (a, b) {  return b - a;  });
    // console.log(alltrueload)
    
    
    for(var k=0;k<sys4.length;k++){
      f.push(sys4[k].val1);
      f.push(sys4[k].val2);
      f.push(sys4[k].val3);
      f.push(sys4[k].val4);
    f = f.sort(function (a, b) {  return b - a;  });
    
    for(var j=0;j<sys4.length;j++){
      if(alltrueload[j]<=f[k]){
        if(alltrueload[j]<=f[k+1]){
          if(alltrueload[j]<=f[k+2]){
            if(alltrueload[j]<=f[k+3]){
            li1.push(sys4[j]);
              // ccc+=sys4[j].cooling__capacity
            }
          }
        }
      }
    
    }
    f=[]
    }
  f=[]
 alltrueload=[]
  return li1;
}
function qwe3(arr){
var li2=[];var alltrueload=[];var f=[];
  
  for(var i=0;i<arr.length;i++){
    alltrueload.push(each_room_load[arr[i]-1])}
    alltrueload = alltrueload.sort(function (a, b) {  return b - a;  });
    // console.log(alltrueload)
    
    
    for(var k=0;k<sys3.length;k++){
      f.push(sys3[k].val1);
      f.push(sys3[k].val2);
      f.push(sys3[k].val3);
      
    f = f.sort(function (a, b) {  return b - a;  });
    
    for(var j=0;j<sys3.length;j++){
      if(alltrueload[j]<=f[k]){
        if(alltrueload[j]<=f[k+1]){
          if(alltrueload[j]<=f[k+2]){
              li2.push(sys3[j]);
             // ccc+=sys4[j].cooling__capacity 
          }
        }
      }
    
    }
    f=[]
    }
  f=[]
 alltrueload=[]
  return li2;
}
function qwe2(arr){
  var li3=[];var alltrueload=[];var f=[];
  
  for(var i=0;i<arr.length;i++){
    alltrueload.push(each_room_load[arr[i]-1])}
    alltrueload = alltrueload.sort(function (a, b) {  return b - a;  });
    // console.log(alltrueload)
    
    
    for(var k=0;k<sys2.length;k++){
      f.push(sys2[k].val1);
      f.push(sys2[k].val2);
      
      
    f = f.sort(function (a, b) {  return b - a;  });
    
    for(var j=0;j<sys2.length;j++){
      if(alltrueload[j]<=f[k]){
        if(alltrueload[j]<=f[k+1]){
              li3.push(sys2[j]);
              // ccc+=sys4[j].cooling__capacity
        }
      }    
    }
    f=[]
    }
  f=[]
 alltrueload=[]
  return li3;
}

function qwe1(arr){
 lisys1=[]
 
  for(var i=0;i<arr.length;i++){
    // console.log(arr[i]+" - "+each_room_load[arr[i]-1]);
    for(var j=0;j<sys1.length;j++){
      if(each_room_load[arr[i]-1]<=sys1[j].val1){   
        lisys1.push(sys1[j]);
        // ccc+=sys4[j].cooling__capacity  
      }
    }
  }
  return lisys1;
}


// console.log(selected_product_list)

step5.start1(selected_product_list,rooms.length,rocc,each_room_load,efficiency_profile)

// console.log("-------------Price Wise------------------")
// for(var i=0;i<selected_product_list.length;i++){
// console.log(
//     selected_product_list[i].sort((a, b) => {
//     return a.price - b.price;
// })
//     )
//   }

next();
}
}    