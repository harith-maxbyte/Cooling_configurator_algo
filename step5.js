const hs = require('./hourly_true_load');
function start1(input1, roomslen, occ_patt, true_load, eff, total_true_load, installed_rooms) {
  // console.log(occ_patt)
  // console.log(true_load)
  // console.log("instaleed rooms=====>"+installed_rooms.length)

  var mon = [], tue = [], wed = [], thurs = [], fri = [], sat = [], sun = []
  var mon_load = [], tue_load = [], wed_load = [], thurs_load = [], fri_load = [], sat_load = [], sun_load = []
  var configid = 602
  var room_weekdays = []
  var room_weekends = []

  const callit = (am, pm) => {
    var a = []
    for (var i = 1; i <= 11; i++) {
      if (am.indexOf(i + "AM") > -1) { a.push(1) } else { a.push(0) }
    }
    if (pm.indexOf("12PM") > -1) { a.push(1) } else { a.push(0) }
    for (var j = 1; j <= 11; j++) {
      if (pm.indexOf(j + "PM") > -1) { a.push(1) } else { a.push(0) }
    }
    if (am.indexOf("12AM") > -1) { a.push(1) } else { a.push(0) }
    return a
  }

  //....................mon...................................

  var am = []
  var pm = []
  var r = 0;
  for (var i = 0; i < occ_patt.length; i++) {

    if (occ_patt[i].configid == configid) {
      mon = []
      // mon_load=[]
      // console.log(occ_patt[i].configid)
      room_weekdays.push(occ_patt[i].mondaylist.length + occ_patt[i].tuesdaylist.length + occ_patt[i].wednesdaylist.length + occ_patt[i].thursdaylist.length + occ_patt[i].fridaylist.length)
      room_weekends.push(occ_patt[i].saturdaylist.length + occ_patt[i].sundaylist.length)
      for (var j = 0; j < occ_patt[i].mondaylist.length; j++) {
        // console.log("i"+(r+1))
        const [digits, word] = occ_patt[i].mondaylist[j].match(/\D+|\d+/g);
        if (word === "AM") { am.push(occ_patt[i].mondaylist[j]) }
        else { pm.push(occ_patt[i].mondaylist[j]) }
      }
      r = r + 1
      mon.push(callit(am, pm))
      // console.log(mon)
      mon_load.push(hs.mon_true_load(mon, r, true_load))
    }
  }
  // console.log(mon_load)

  //....................tue...................................

  var am = []
  var pm = []
  var r = 0;
  for (var i = 0; i < occ_patt.length; i++) {
    if (occ_patt[i].configid == configid) {
      tue = []
      for (var j = 0; j < occ_patt[i].tuesdaylist.length; j++) {
        // console.log("i"+(r+1))
        const [digits, word] = occ_patt[i].tuesdaylist[j].match(/\D+|\d+/g);
        if (word === "AM") { am.push(occ_patt[i].tuesdaylist[j]) }
        else { pm.push(occ_patt[i].tuesdaylist[j]) }
      }
      r = r + 1
      tue.push(callit(am, pm))
      tue_load.push(hs.tue_true_load(tue, r, true_load))
    }
  }
  // console.log(tue_load)


  //....................wed...................................

  var am = []
  var pm = []
  var r = 0;
  for (var i = 0; i < occ_patt.length; i++) {
    if (occ_patt[i].configid == configid) {
      wed = []

      for (var j = 0; j < occ_patt[i].wednesdaylist.length; j++) {
        // console.log("i"+(r+1))
        const [digits, word] = occ_patt[i].wednesdaylist[j].match(/\D+|\d+/g);
        if (word === "AM") { am.push(occ_patt[i].wednesdaylist[j]) }
        else { pm.push(occ_patt[i].wednesdaylist[j]) }
      }
      r = r + 1
      wed.push(callit(am, pm))
      wed_load.push(hs.wed_true_load(wed, r, true_load))
    }
  }
//  console.log(wed_load)


  //....................thurs...................................

  var am = []
  var pm = []
  var r = 0;
  for (var i = 0; i < occ_patt.length; i++) {
    if (occ_patt[i].configid == configid) {
      thurs = []
      for (var j = 0; j < occ_patt[i].thursdaylist.length; j++) {
        // console.log("i"+(r+1))
        const [digits, word] = occ_patt[i].thursdaylist[j].match(/\D+|\d+/g);
        if (word === "AM") { am.push(occ_patt[i].thursdaylist[j]) }
        else { pm.push(occ_patt[i].thursdaylist[j]) }
      }
      r = r + 1
      thurs.push(callit(am, pm))
      thurs_load.push(hs.thurs_true_load(thurs, r, true_load))
    }
  }
  //console.log(thurs_load)


  //....................fri...................................

  var am = []
  var pm = []
  var r = 0;
  for (var i = 0; i < occ_patt.length; i++) {
    if (occ_patt[i].configid == configid) {
      fri = []
      for (var j = 0; j < occ_patt[i].fridaylist.length; j++) {
        // console.log("i"+(r+1))
        const [digits, word] = occ_patt[i].fridaylist[j].match(/\D+|\d+/g);
        if (word === "AM") { am.push(occ_patt[i].fridaylist[j]) }
        else { pm.push(occ_patt[i].fridaylist[j]) }
      }
      r = r + 1
      fri.push(callit(am, pm))
      fri_load.push(hs.fri_true_load(fri, r, true_load))
    }
  }
  //console.log(fri_load)

  //....................sat...................................

  var am = []
  var pm = []
  var r = 0;
  for (var i = 0; i < occ_patt.length; i++) {
    if (occ_patt[i].configid == configid) {
      sat = []
      for (var j = 0; j < occ_patt[i].saturdaylist.length; j++) {
        // console.log("i"+(r+1))
        const [digits, word] = occ_patt[i].saturdaylist[j].match(/\D+|\d+/g);
        if (word === "AM") { am.push(occ_patt[i].saturdaylist[j]) }
        else { pm.push(occ_patt[i].saturdaylist[j]) }
      }
      r = r + 1
      sat.push(callit(am, pm))
      sat_load.push(hs.sat_true_load(sat, r, true_load))
    }
  }
  //console.log(sat_load)


  //....................sun...................................

  var am = []
  var pm = []
  var r = 0;
  for (var i = 0; i < occ_patt.length; i++) {
    if (occ_patt[i].configid == configid) {
      sun = []
      for (var j = 0; j < occ_patt[i].sundaylist.length; j++) {
        // console.log("i"+(r+1))
        const [digits, word] = occ_patt[i].sundaylist[j].match(/\D+|\d+/g);
        if (word === "AM") { am.push(occ_patt[i].sundaylist[j]) }
        else { pm.push(occ_patt[i].sundaylist[j]) }
      }
      r = r + 1
      sun.push(callit(am, pm))
      sun_load.push(hs.sun_true_load(sun, r, true_load))
    }
  }
  //console.log(sun_load)



  //hourly_operating_load
  var mon_opt_load = [], tue_opt_load = [], wed_opt_load = [], thurs_opt_load = [], fri_opt_load = [], sat_opt_load = [], sun_opt_load = [];
  var ty = []
  for (var i = 0; i < input1.length; i++) {
    let tot = []
    for (var j = 0; j < input1[i].length; j++) {

      mon_opt_load = [];
      tue_opt_load = [];
      wed_opt_load = [];
      thurs_opt_load = [];
      fri_opt_load = [];
      sat_opt_load = [];
      sun_opt_load = [];
      // console.log(input1[i][j].coolingcapacity) 

      for (var k = 0; k < mon_load.length; k++) {
        mon_opt_load.push(Math.round(mon_load[k] / input1[i][j].coolingcapacity) * 100)
      }

      for (var k = 0; k < tue_load.length; k++) {
        tue_opt_load.push(Math.round(tue_load[k] / input1[i][j].coolingcapacity) * 100)
      }

      for (var k = 0; k < wed_load.length; k++) {
        wed_opt_load.push(Math.round(wed_load[k] / input1[i][j].coolingcapacity) * 100)
      }

      for (var k = 0; k < thurs_load.length; k++) {
        thurs_opt_load.push(Math.round(thurs_load[k] / input1[i][j].coolingcapacity) * 100)
      }

      for (var k = 0; k < fri_load.length; k++) {
        fri_opt_load.push(Math.round(fri_load[k] / input1[i][j].coolingcapacity) * 100)
      }

      for (var k = 0; k < sat_load.length; k++) {
        sat_opt_load.push(Math.round(sat_load[k] / input1[i][j].coolingcapacity) * 100)
      }

      for (var k = 0; k < sun_load.length; k++) {
        sun_opt_load.push(Math.round(sun_load[k] / input1[i][j].coolingcapacity) * 100)
      }
      tot = []
      tot = [mon_opt_load, tue_opt_load, wed_opt_load, thurs_opt_load, fri_opt_load, sat_opt_load, sun_opt_load]
    }
    input1[i].hourly_operating_load = tot;

  }


  // console.log(...input1)

  //hourly_cop
  var inner1 = [], outer1 = []
  for (var i = 0; i < input1.length; i++) {
    outer1 = []
    for (var j = 0; j < input1[i].hourly_operating_load.length; j++) {
      inner1 = []
      for (var k = 0; k < input1[i].hourly_operating_load[j].length; k++) {

        for (var t = 0; t < eff.length; t++) {
          if (Number(input1[i].hourly_operating_load[j][k]) === Number(eff[t].hourly_operating_load)) {
            inner1.push(eff[t].hourly_cop)
          }
        }

      }
      outer1.push(inner1)
    }
    input1[i].hourly_cop = outer1
  }

  // console.log(...input1)



  //hourly_operating_power
  var inner1 = [], outer1 = []
  for (var i = 0; i < input1.length; i++) {
    outer1 = []

    var li = []
    li = input1[i].map(function (obj) {
      return Number(obj.coolingcapacity)
    })
    var coolcap = li.reduce((a, b) => a + b, 0)

    for (var j = 0; j < input1[i].hourly_cop.length; j++) {
      inner1 = []
      for (var k = 0; k < input1[i].hourly_cop[j].length; k++) {
        inner1.push(Number(input1[i].hourly_cop[j][k]) * coolcap)
      }
      outer1.push(inner1)
    }
    input1[i].hourly_operating_power = outer1
  }

  // console.log(...input1)


  var usage_adherence = 1 //0.75; //(75%) get value from user
  //sum of weekday & sum of weekends
  var inner1 = [], inner2 = []
  for (var i = 0; i < input1.length; i++) {
    inner1 = [], inner2 = []
    for (var j = 0; j < input1[i].hourly_operating_power.length - 2; j++) {
      inner1.push(input1[i].hourly_operating_power[j].reduce((a, b) => a + b, 0))
    }
    for (var j = 5; j < input1[i].hourly_operating_power.length; j++) {
      inner2.push(input1[i].hourly_operating_power[j].reduce((a, b) => a + b, 0))
    }
    if (usage_adherence != 1) {
      let use=[]
      for(var l=0;l<inner1.length;l++){
        use.push(usage_adherence * inner1[l])  
      }
      // console.log(use)
      input1[i].weekdays = use 
      input1[i].weekends = inner2
    }
    else {
      input1[i].weekdays = inner1
      input1[i].weekends = inner2
    }
  }
  // console.log(...input1)


  //monthly operating power
  for (var i = 0; i < input1.length; i++) {
    input1[i].monthy_operating_power = (input1[i].weekdays.reduce((a, b) => a + b, 0) + input1[i].weekends.reduce((a, b) => a + b, 0)) * 4  / 1000
  }

  //yearly operating power
  for (var i = 0; i < input1.length; i++) {
    input1[i].yearly_operating_power = input1[i].monthy_operating_power * 12
  }


  var electricity_tariff = 0.29 //1.25
  ///electricity tariff
  for (var i = 0; i < input1.length; i++) {
    // console.log(input1[i].weekdays)
    var week = ((input1[i].weekdays.reduce((a, b) => a + b, 0) / 1000) + (input1[i].weekends.reduce((a, b) => a + b, 0) / 1000))
    var week_electricity_cost = week * electricity_tariff
    var month_electricity_cost = week_electricity_cost * 4
    var year_electricity_cost = month_electricity_cost * 12

    input1[i].weekly_electricity_cost = week_electricity_cost
    input1[i].monthly_electricity_cost = month_electricity_cost
    input1[i].yearly_electricity_cost = year_electricity_cost
  }


  // console.log(...input1)


  for (var i = 0; i < input1.length; i++) {
    var li = []
    li = input1[i].map(function (obj) {
      return Number(obj.price)
    })
    input1[i].totalprice = li.reduce((a, b) => a + b, 0)
  }
  //console.log(...input1)  

  console.log("-------------Energy Wise------------------")
  console.log(
      input1.sort((a, b) => {
      return a.yearly_operating_power - b.yearly_operating_power;
  })
      )

  console.log("-------------Price Wise------------------")
  console.log(
    input1.sort((a, b) => {
      return a.totalprice - b.totalprice;
    })
  )






// var pii=[]
// pii.push(input1.sort((a, b) => {
//       return a.totalprice - b.totalprice;
//     }))
    // console.log(...pii)


// var pi2=[]
// pi2.push( input1.sort((a, b) => {
//       return a.yearly_operating_power - b.yearly_operating_power;
//   }))

//   console.log(...pi2)
};

module.exports = { start1 };






