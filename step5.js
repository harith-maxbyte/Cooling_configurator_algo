const hs = require('./hourly_true_load');
function start1(input1,roomslen,occ_patt,true_load,eff,total_true_load) {
  // console.log(occ_patt)
  // console.log(true_load)
  var mon=[],tue=[],wed=[],thurs=[],fri=[],sat=[],sun=[]
  var mon_load=[],tue_load=[],wed_load=[],thurs_load=[],fri_load=[],sat_load=[],sun_load=[]
  var configid=515 
 

const callit=(am,pm)=>{
var a=[]  
  for(var i=1;i<=11;i++){
    if(am.indexOf(i+"AM") > -1){a.push(1)}else{a.push(0)}
  }
if(pm.indexOf("12PM") > -1){a.push(1)}else{a.push(0)}
  for(var j=1;j<=11;j++){
       if(pm.indexOf(j+"PM") > -1){a.push(1)}else{a.push(0)}  
  }
if(am.indexOf("12AM") > -1){a.push(1)}else{a.push(0)}
return a
}

//....................mon...................................

var am=[]
var pm=[]
var r=0;
for(var i=0;i<occ_patt.length;i++){
    if(occ_patt[i].configid==configid){
      mon=[]
      // mon_load=[]
      // console.log(occ_patt[i].mondaylist)
        
      for(var j=0;j<occ_patt[i].mondaylist.length;j++){
        // console.log("i"+(r+1))
        const [digits,word] = occ_patt[i].mondaylist[j].match(/\D+|\d+/g);
        if(word==="AM"){am.push(occ_patt[i].mondaylist[j])}
        else{pm.push(occ_patt[i].mondaylist[j])} 
      }
    r=r+1
    mon.push(callit(am,pm))
    // console.log(mon)
    mon_load.push(hs.mon_true_load(mon,r,true_load))
    }
}
//console.log(mon_load)

//....................tue...................................

var am=[]
var pm=[]
var r=0;
for(var i=0;i<occ_patt.length;i++){
    if(occ_patt[i].configid==configid){
      tue=[]
      // mon_load=[]
      for(var j=0;j<occ_patt[i].tuesdaylist.length;j++){
        // console.log(occ_patt[i].mondaylist[j])
        // console.log("i"+(r+1))
        const [digits,word] = occ_patt[i].tuesdaylist[j].match(/\D+|\d+/g);
        if(word==="AM"){am.push(occ_patt[i].tuesdaylist[j])}
        else{pm.push(occ_patt[i].tuesdaylist[j])} 
      }
    r=r+1
    tue.push(callit(am,pm))
    // console.log(mon)
    tue_load.push(hs.tue_true_load(tue,r,true_load))
    }
}
// console.log(tue_load)


//....................wed...................................

var am=[]
var pm=[]
var r=0;
for(var i=0;i<occ_patt.length;i++){
    if(occ_patt[i].configid==configid){
      wed=[]
      // mon_load=[]
      for(var j=0;j<occ_patt[i].wednesdaylist.length;j++){
        // console.log(occ_patt[i].mondaylist[j])
        // console.log("i"+(r+1))
        const [digits,word] = occ_patt[i].wednesdaylist[j].match(/\D+|\d+/g);
        if(word==="AM"){am.push(occ_patt[i].wednesdaylist[j])}
        else{pm.push(occ_patt[i].wednesdaylist[j])} 
      }
    r=r+1
    wed.push(callit(am,pm))
    // console.log(mon)
    wed_load.push(hs.wed_true_load(wed,r,true_load))
    }
}
// console.log(wed_load)


//....................thurs...................................

var am=[]
var pm=[]
var r=0;
for(var i=0;i<occ_patt.length;i++){
    if(occ_patt[i].configid==configid){
      thurs=[]
      // mon_load=[]
      for(var j=0;j<occ_patt[i].thursdaylist.length;j++){
        // console.log(occ_patt[i].mondaylist[j])
        // console.log("i"+(r+1))
        const [digits,word] = occ_patt[i].thursdaylist[j].match(/\D+|\d+/g);
        if(word==="AM"){am.push(occ_patt[i].thursdaylist[j])}
        else{pm.push(occ_patt[i].thursdaylist[j])} 
      }
    r=r+1
    thurs.push(callit(am,pm))
    // console.log(mon)
    thurs_load.push(hs.thurs_true_load(thurs,r,true_load))
    }
}
// console.log(thurs_load)


//....................fri...................................

var am=[]
var pm=[]
var r=0;
for(var i=0;i<occ_patt.length;i++){
    if(occ_patt[i].configid==configid){
      fri=[]
      // mon_load=[]
      for(var j=0;j<occ_patt[i].fridaylist.length;j++){
        // console.log(occ_patt[i].mondaylist[j])
        // console.log("i"+(r+1))
        const [digits,word] = occ_patt[i].fridaylist[j].match(/\D+|\d+/g);
        if(word==="AM"){am.push(occ_patt[i].fridaylist[j])}
        else{pm.push(occ_patt[i].fridaylist[j])} 
      }
    r=r+1
    fri.push(callit(am,pm))
    // console.log(mon)
    fri_load.push(hs.fri_true_load(fri,r,true_load))
    }
}
// console.log(fri_load)

//....................sat...................................

var am=[]
var pm=[]
var r=0;
for(var i=0;i<occ_patt.length;i++){
    if(occ_patt[i].configid==configid){
      sat=[]
      // mon_load=[]
      for(var j=0;j<occ_patt[i].saturdaylist.length;j++){
        // console.log(occ_patt[i].mondaylist[j])
        // console.log("i"+(r+1))
        const [digits,word] = occ_patt[i].saturdaylist[j].match(/\D+|\d+/g);
        if(word==="AM"){am.push(occ_patt[i].saturdaylist[j])}
        else{pm.push(occ_patt[i].saturdaylist[j])} 
      }
    r=r+1
    sat.push(callit(am,pm))
    // console.log(mon)
    sat_load.push(hs.sat_true_load(sat,r,true_load))
    }
}
// console.log(sat_load)


//....................sun...................................

var am=[]
var pm=[]
var r=0;
for(var i=0;i<occ_patt.length;i++){
    if(occ_patt[i].configid==configid){
      sun=[]
      // mon_load=[]
      for(var j=0;j<occ_patt[i].sundaylist.length;j++){
        // console.log(occ_patt[i].mondaylist[j])
        // console.log("i"+(r+1))
        const [digits,word] = occ_patt[i].sundaylist[j].match(/\D+|\d+/g);
        if(word==="AM"){am.push(occ_patt[i].sundaylist[j])}
        else{pm.push(occ_patt[i].sundaylist[j])} 
      }
    r=r+1
    sun.push(callit(am,pm))
    // console.log(mon)
    sun_load.push(hs.sun_true_load(sun,r,true_load))
    }
}
// console.log(sun_load)



// console.log(input1)
//hourly_operating_load
var mon_opt_load=[],tue_opt_load=[],wed_opt_load=[],thurs_opt_load=[],fri_opt_load=[],sat_opt_load=[],sun_opt_load=[];
var ty=[]
for(var i=0;i<input1.length;i++){
 // console.log(input1[i])
 // console.log("-------------")
   for(var j=0;j<input1[i].length;j++){
    // console.log(input1[i][j].manufacturer)
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
// console.log(tot)
input1[i][j].hourly_operating_load=tot;
      // console.log(input1[i][j].hourly_operating_load)

}
}


// console.log()

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
      }
      
     outer1.push(inner1)
    
    }
    outer2.push(outer1)
    // console.log(outer1)
    input1[i][j].hourly_cop = outer1 
}
}


// console.log(outer2)


//hourly_operating_power
var inn=[],out=[],out1=[]
for(var i=0;i<input1.length;i++){
 
 for(var j=0;j<input1[i].length;j++){ 
    
    out=[]
    for(var k=0;k<input1[i][j].hourly_cop.length;k++){
      // console.log(input1[i][j].hourly_cop[k])  
      inn=[]
       for(var l=0;l<input1[i][j].hourly_cop[k].length;l++){
          
          inn.push(input1[i][j].hourly_cop[k][l]*input1[i][j].cooling__capacity)
       }
       out.push(inn)
    }
    input1[i][j].hourly_operating_power=out
    // console.log(out)
  }
  out1.push(out)
  // console.log(out)
}



var usage_adherence=1 //0.75; //(75%) get value from user
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
    var s=[]
    s.push(sum*usage_adherence)
    // console.log(s/1000)
    input1[i][j]["weekday_operating_power"]=s
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
    var s=[]
    s.push(sum*usage_adherence)
    input1[i][j]["weekend_operating_power"]=s    
  }
}


//monthly_operating_power
for(var i=0;i<input1.length;i++){
  for(var j=0;j<input1[i].length;j++){
    var week=input1[i][j].weekday_operating_power[0] + input1[i][j].weekend_operating_power[0]
    input1[i][j].monthy_operating_power = (usage_adherence*week*4)/1000
  }
}

//yearly_operating_power
for(var i=0;i<input1.length;i++){
  for(var j=0;j<input1[i].length;j++){
    
    input1[i][j].yearly_operating_power = (usage_adherence*input1[i][j].monthy_operating_power*54)
  }
}

var electricity_tariff=0.29 //1.25
///electricity tariff for week
for(var i=0;i<input1.length;i++){
  for(var j=0;j<input1[i].length;j++){
    // console.log((input1[i][j].weekday_operating_power[0]/1000))
    // console.log((input1[i][j].weekend_operating_power[0]/1000))
    var week=((input1[i][j].weekday_operating_power[0]/1000) + (input1[i][j].weekend_operating_power[0]/1000))
    var week_electricity_cost=week*electricity_tariff
    var month_electricity_cost=week_electricity_cost*4
    var year_electricity_cost=month_electricity_cost*12
    // console.log(year_electricity_cost)
    input1[i][j].weekly_electricity_cost = week_electricity_cost
    input1[i][j].monthly_electricity_cost = month_electricity_cost
    input1[i][j].yearly_electricity_cost = year_electricity_cost
  }
}




for(var i=0;i<input1.length;i++){
  for(var j=0;j<input1[i].length;j++){
  
    console.log(input1[i][j].monthly_electricity_cost)
  }
  console.log("--------------")
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






