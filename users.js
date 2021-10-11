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
// console.log(area,room_temp,ceiling_height)
  Object.keys(dbobj).forEach(function (i) {
    if(Number(ceiling_height) === Number(dbobj[i].ceiling_value)){
       room_height_to_ceiling=dbobj[i].ceil_factors;
    }
});


  Object.keys(db1obj).forEach(function (i) {
    if(Number(room_temp) === Number(db1obj[i].roomtemp)){
      basic_cooling_load = db1obj[i].wsqm;     
    }
});
  // console.log(room_temp+" - "+basic_cooling_load)
  // console.log(ceiling_height+" - "+room_height_to_ceiling)
  // console.log("-----------------")
   const Cooling_load = basic_cooling_load * room_height_to_ceiling; 

 return Cooling_load;
}



function step2(area,cl){
  const true_load = area * cl * load_rating_factor;
  totrooms1=totrooms1+1;
  // sum_of_all_true_loads = sum_of_all_true_loads+true_load;
   return true_load;
}


function step3(sum_of_all_true_loads){
   
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


//   while (sum_of_all_true_loads < system_cooling_limit)
// {
// comp = comp + 1
// sum_of_all_true_loads = sum_of_all_true_loads - system_cooling_limit
// }
// localvar.compressor_needed = comp
} 


var totrooms1=0;
const localvar = {};
var user_current_rating=5
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
    "password": "Harith@kv47",
    "database": "checkcoolingalgo",    
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

client.query(`select * from occ_pattern`,(err,result)=>{
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

  	step3(sum_of_all_true_loads); 	


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

// console.log(sys2)
var a=[],b=[]

var ccc=0;
var selected_product_list=[]
var selected_product_list1=[]
for(var i=0;i<output1.length;i++){
  // console.log(output1[i])   ///final room permutations after removing duplicates
ccc=0
  for(var j=0;j<output1[i].length;j++){
    var chk=[]
    a=output1[i]

    if(a[j].length==4){
      // console.log(a[j]);
      // console.log(qwe4(a[j]));
      selected_product_list.push(qwe4(a[j])); 
      
    }
    if(a[j].length==3){
      // console.log(a[j]);
      // console.log(qwe3(a[j]));
      selected_product_list.push(qwe3(a[j]));
      
    }
    if(a[j].length==2){
      // console.log(a[j]);
      // console.log(qwe2(a[j]));
      selected_product_list.push(qwe2(a[j]));
      
    }
    if(a[j].length==1){
      // console.log(a[j]);
      // console.log(qwe1(a[j]));
      selected_product_list.push(qwe1(a[j]));
      
    }
    // for(var k=0;k<a[j].length;k++){
    //   b=a[j]
    //   console.log(b[k])
    // }
 
  }

}
// console.log("-----------------")
// console.log(selected_product_list)
function qwe4(arr){
  var li3=[];var alltrueload=[];
  
  for(var i=0;i<arr.length;i++){
    alltrueload.push(each_room_load[arr[i]-1])}
  var cool=0
  for(var j=0;j<alltrueload.length;j++){
     cool+=alltrueload[j]
  }  
  
 li3=[]
 // console.log(cool)
 // console.log(min_true_load,max_true_load)
 for(var i=0;i<sys4.length;i++){
  if(sys4[i].cooling__capacity >= cool){
    // console.log(sys4[i].cooling__capacity)
      if(sys4[i].cooling__capacity<=min_true_load && sys4[i].cooling__capacity<=max_true_load ){
        if(sys4[i].current_rating<=user_current_rating){
    li3.push(sys4[i]);}
  }
  }
  
 }
  return li3;
}
function qwe3(arr){
var li3=[];var alltrueload=[];
  
  for(var i=0;i<arr.length;i++){
    alltrueload.push(each_room_load[arr[i]-1])}
  var cool=0
  for(var j=0;j<alltrueload.length;j++){
     cool+=alltrueload[j]
  }  
  
 li3=[]
 // console.log(cool)
 // console.log(min_true_load,max_true_load)
 for(var i=0;i<sys3.length;i++){
  if(sys3[i].cooling__capacity >= cool){
    // console.log(sys3[i].cooling__capacity)
      if(sys3[i].cooling__capacity<=min_true_load && sys3[i].cooling__capacity<=max_true_load){
    if(sys3[i].current_rating<=user_current_rating){
    li3.push(sys3[i]);}}
  }
  
 }
  return li3;
}

function qwe2(arr){
  var li3=[];var alltrueload=[];
  
  for(var i=0;i<arr.length;i++){
    alltrueload.push(each_room_load[arr[i]-1])}
  var cool=0
  for(var j=0;j<alltrueload.length;j++){
     cool+=alltrueload[j]
  }  
  
 li3=[]
 // console.log(cool)
 // console.log(min_true_load,max_true_load)
 for(var i=0;i<sys2.length;i++){

  if(sys2[i].cooling__capacity >= cool){
      // console.log(sys2[i].current_rating+" - "+sys2[i].cooling__capacity)    
      if(sys2[i].cooling__capacity<=min_true_load && sys2[i].cooling__capacity<=max_true_load){
   
         
    if(sys2[i].current_rating<=user_current_rating){
      
    li3.push(sys2[i]);
   }
}
  }
  
 }
  return li3;
}

function qwe1(arr){
  var lisys11=[];var alltrueload=[];
   for(var i=0;i<arr.length;i++){
    alltrueload.push(each_room_load[arr[i]-1])}
  var cool=0
  for(var j=0;j<alltrueload.length;j++){
     cool+=alltrueload[j]
  }  
 
 lisys11=[]
// console.log(cool)
// console.log(min_true_load,max_true_load)
 for(var i=0;i<sys1.length;i++){
  // console.log(sys1[i].cooling__capacity)
  if(sys1[i].cooling__capacity >= cool){
    if(sys1[i].cooling__capacity<=min_true_load && sys1[i].cooling__capacity<=max_true_load){
      if(sys1[i].current_rating<=user_current_rating){
    lisys11.push(sys1[i]);}
  }

  }
  
 }
  return lisys11;
}



        // console.log(selected_product_list)
var sum=0
for(var i=0;i<each_room_load.length;i++){
  sum+=each_room_load[i]
}

step5.start1(selected_product_list,rooms.length,rocc,each_room_load,efficiency_profile,sum)

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