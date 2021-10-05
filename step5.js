function start1(input1,roomslen,occ_patt,true_load,eff) {
  var mon=[],tue=[],wed=[],thurs=[],fri=[],sat=[],sun=[]
  var mon_load=[],tue_load=[],wed_load=[],thurs_load=[],fri_load=[],sat_load=[],sun_load=[]
  var times=6
  for(var i=0;i<=times-1;i++){
     for(var j=0;j<roomslen*times;j++){
        if(occ_patt[j].time==i){
          
                 if(occ_patt[j].mon==0){mon.push(0)}
                  else{mon.push(1)}
                 if(occ_patt[j].tue==0){tue.push(0)}
                  else{tue.push(1)}
                    if(occ_patt[j].wed==0){wed.push(0)}
                  else{wed.push(1)}
                    if(occ_patt[j].thurs==0){thurs.push(0)}
                  else{thurs.push(1)}
                    if(occ_patt[j].fri==0){fri.push(0)}
                  else{fri.push(1)}
                    if(occ_patt[j].sat==0){sat.push(0)}
                  else{sat.push(1)}
                    if(occ_patt[j].sun==0){sun.push(0)}
                  else{sun.push(1)}

        }
     }
// console.log(tue)
// tue=[]
  }
 
 // console.log(true_load)

//-------------------------------mon-------------------------
var inner=[],outer=[]
for(var i=0;i<mon.length;i=i+roomslen){
  inner=[]
  for(var j=i;j<i+roomslen;j++){
    inner.push(mon[j])
  }
  outer.push(inner)
}


for(var i=0;i<outer.length;i++){
  var sum=0
  for(var j=0;j<outer[i].length;j++){
    if(outer[i][j]==1){sum+=true_load[j];}
    else{sum+=0}
  }
  mon_load.push(sum)
}


//-------------------------------tue-------------------------
var inner=[],outer=[]
for(var i=0;i<tue.length;i=i+roomslen){
  inner=[]
  for(var j=i;j<i+roomslen;j++){
    inner.push(tue[j])
  }
  outer.push(inner)
}

for(var i=0;i<outer.length;i++){
  var sum=0
  for(var j=0;j<outer[i].length;j++){
    if(outer[i][j]==1){sum+=true_load[j];}
    else{sum+=0}
  }
  tue_load.push(sum)
}



//-------------------------------wed-------------------------
var inner=[],outer=[]
for(var i=0;i<wed.length;i=i+roomslen){
  inner=[]
  for(var j=i;j<i+roomslen;j++){
    inner.push(wed[j])
  }
  outer.push(inner)
}

for(var i=0;i<outer.length;i++){
  var sum=0
  for(var j=0;j<outer[i].length;j++){
    if(outer[i][j]==1){sum+=true_load[j];}
    else{sum+=0}
  }
  wed_load.push(sum)
}


//-------------------------------thurs-------------------------
var inner=[],outer=[]
for(var i=0;i<thurs.length;i=i+roomslen){
  inner=[]
  for(var j=i;j<i+roomslen;j++){
    inner.push(thurs[j])
  }
  outer.push(inner)
}

for(var i=0;i<outer.length;i++){
  var sum=0
  for(var j=0;j<outer[i].length;j++){
    if(outer[i][j]==1){sum+=true_load[j];}
    else{sum+=0}
  }
  thurs_load.push(sum)
}


//-------------------------------thurs-------------------------
var inner=[],outer=[]
for(var i=0;i<fri.length;i=i+roomslen){
  inner=[]
  for(var j=i;j<i+roomslen;j++){
    inner.push(fri[j])
  }
  outer.push(inner)
}

for(var i=0;i<outer.length;i++){
  var sum=0
  for(var j=0;j<outer[i].length;j++){
    if(outer[i][j]==1){sum+=true_load[j];}
    else{sum+=0}
  }
  fri_load.push(sum)
}


//-------------------------------thurs-------------------------
var inner=[],outer=[]
for(var i=0;i<sat.length;i=i+roomslen){
  inner=[]
  for(var j=i;j<i+roomslen;j++){
    inner.push(sat[j])
  }
  outer.push(inner)
}

for(var i=0;i<outer.length;i++){
  var sum=0
  for(var j=0;j<outer[i].length;j++){
    if(outer[i][j]==1){sum+=true_load[j];}
    else{sum+=0}
  }
  sat_load.push(sum)
}


//-------------------------------sun-------------------------
var inner=[],outer=[]
for(var i=0;i<sun.length;i=i+roomslen){
  inner=[]
  for(var j=i;j<i+roomslen;j++){
    inner.push(sun[j])
  }
  outer.push(inner)
}

for(var i=0;i<outer.length;i++){
  var sum=0
  for(var j=0;j<outer[i].length;j++){
    if(outer[i][j]==1){sum+=true_load[j];}
    else{sum+=0}
  }
  sun_load.push(sum)
}

console.log("----------------------------------------------------")



//hourly_operating_power
var mon_opt_load=[],tue_opt_load=[],wed_opt_load=[],thurs_opt_load=[],fri_opt_load=[],sat_opt_load=[],sun_opt_load=[];
var ty=[]
for(var i=0;i<input1.length;i++){
 
   for(var j=0;j<input1[i].length;j++){
 mon_opt_load=[];
  tue_opt_load=[];
  wed_opt_load=[];
  thurs_opt_load=[];
  fri_opt_load=[];
  sat_opt_load=[];
  sun_opt_load=[];
      for(var k=0;k<mon_load.length;k++){
        mon_opt_load.push(Math.round(mon_load[k]/input1[i][j].cooling__capacity)*100)
      }

      for(var k=0;k<tue_load.length;k++){
        tue_opt_load.push(Math.round(tue_load[k]/input1[i][j].cooling__capacity)*100)
      }

      for(var k=0;k<wed_load.length;k++){
        wed_opt_load.push(Math.round(wed_load[k]/input1[i][j].cooling__capacity)*100)
      }

      for(var k=0;k<thurs_load.length;k++){
        thurs_opt_load.push(Math.round(thurs_load[k]/input1[i][j].cooling__capacity)*100)
      }

      for(var k=0;k<fri_load.length;k++){
        fri_opt_load.push(Math.round(fri_load[k]/input1[i][j].cooling__capacity)*100)
      }

      for(var k=0;k<sat_load.length;k++){
        sat_opt_load.push(Math.round(sat_load[k]/input1[i][j].cooling__capacity)*100)
      }

      for(var k=0;k<sun_load.length;k++){
        sun_opt_load.push(Math.round(sun_load[k]/input1[i][j].cooling__capacity)*100)
      }
      let tot=[]
      tot=[mon_opt_load,tue_opt_load,wed_opt_load,thurs_opt_load,fri_opt_load,sat_opt_load,sun_opt_load]
input1[i][j].hourly_operating_load=tot;

}
}


//hourly_cop
var inner1=[],outer1=[],outer2=[]
for(var i=0;i<input1.length;i++){
 
 for(var j=0;j<input1[i].length;j++){
 outer1=[] 
    for(var k=0;k<input1[i][j].hourly_operating_load.length;k++){
      // console.log(input1[i][j].hourly_operating_load[k])
      inner1=[]
      for(var l=0;l<input1[i][j].hourly_operating_load[k].length;l++){
      
      for(var t=0;t<eff.length;t++){
        if(input1[i][j].hourly_operating_load[k][l] == eff[t].hourly_operating_load){
             // console.log("input1.hourly_operating_load - "+input1[i][j].hourly_operating_load[k][l]+" "+
             //  "eff.hourly_operating_load"+eff[t].hourly_cop)
             inner1.push(eff[t].hourly_cop)
        }
        
      }
// console.log(inner1)
      }
      
     outer1.push(inner1)
    
    }
    outer2.push(outer1)
}
}


  // console.log(outer2)




for(var i=0;i<input1.length;i++){
   for(var j=0;j<input1[i].length;j++){
      
       // console.log(input1[i][j]) 
      // for(var k=0;k<outer2[j].length;k++){
      input1[i][j].hourly_cop=outer2[j]
    // }
   }
}





var inn=[],out=[],out1=[]
for(var i=0;i<input1.length;i++){
 
 for(var j=0;j<input1[i].length;j++){ 
    out=[]
    for(var k=0;k<input1[i][j].hourly_cop.length;k++){
      inn=[]
       for(var l=0;l<input1[i][j].hourly_cop[k].length;l++){
          inn.push(input1[i][j].hourly_cop[k][l]*input1[i][j].cooling__capacity)
       }
       out.push(inn)
    }
  }
  out1.push(out)
}


// console.log(out1)


for(var i=0;i<input1.length;i++){
   for(var j=0;j<input1[i].length;j++){
      
       // console.log(input1[i][j]) 
      // for(var k=0;k<out1.length;k++){
      input1[i][j].hourly_operating_power=out1[i]
    // }
   }
   
}



//weekday
var inn1=[]
for(var i=0;i<input1.length;i++)
{
  for(var j=0;j<input1[i].length;j++)
  { inn1=[]
    for(var k=0;k<input1[i][j].hourly_operating_power.length-2;k++){
    
    // console.log("===>"+input1[i][j].hourly_operating_power[k])
    // console.log(input1[i][j].hourly_operating_power[k].reduce((a, b) => a + b, 0))
     inn1.push(input1[i][j].hourly_operating_power[k].reduce((a, b) => a + b, 0))
   
  }
  input1[i][j].weekday_operating_power = inn1
  
}
  
}

//sum of weekdays
var sum=[]
for(var i=0;i<input1.length;i++){
  for(var j=0;j<input1[i].length;j++){
    sum=[]
    sum.push((input1[i][j].weekday_operating_power).reduce((partial_sum, a) => partial_sum + a,0))
    input1[i][j]["weekday_operating_power"]=sum    
  }
}

//weekend
var inn1=[]
for(var i=0;i<input1.length;i++)
{
  for(var j=0;j<input1[i].length;j++)
  { inn1=[]
    for(var k=5;k<=input1[i][j].hourly_operating_power.length-1;k++){
    
    // console.log("===>"+input1[i][j].hourly_operating_power[k])
    // console.log(input1[i][j].hourly_operating_power[k].reduce((a, b) => a + b, 0))
     inn1.push(input1[i][j].hourly_operating_power[k].reduce((a, b) => a + b, 0))
   
  }
  input1[i][j].weekend_operating_power = inn1
  
}
  
}

//sum of weekend
var sum=[]
for(var i=0;i<input1.length;i++){
  for(var j=0;j<input1[i].length;j++){
    sum=[]
    sum.push((input1[i][j].weekend_operating_power).reduce((partial_sum, a) => partial_sum + a,0))
    input1[i][j]["weekend_operating_power"]=sum    
  }
}

//monthly_operating_power
for(var i=0;i<input1.length;i++){
  for(var j=0;j<input1[i].length;j++){
    var week=input1[i][j].weekday_operating_power + input1[i][j].weekend_operating_power
    input1[i][j].monthy_operating_power = (week*4)/1000
  }
}

//yearly_operating_power
for(var i=0;i<input1.length;i++){
  for(var j=0;j<input1[i].length;j++){
    var week=input1[i][j].weekday_operating_power + input1[i][j].weekend_operating_power
    input1[i][j].yearly_operating_power = (input1[i][j].monthy_operating_power*54)/1000
  }
}




// console.log("-------------Energy Wise------------------")
// for(var i=0;i<input1.length;i++){
// console.log(
//     input1[i].sort((a, b) => {
//     return a.yearly_operating_power - b.yearly_operating_power;
// })
//     )
//   }



};

module.exports = { start1 };






