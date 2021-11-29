const compressor_config = require("./compressor_config");
const room_permutations = require('./room_permutations');
const room_perm_for_each_config = require('./room_perm_for_each_config');
const step5 = require('./step5');

let condenser = []
let fcu = []
let rocc = []
let efficiency_profile = []

function step1(area, room_temp, ceiling_height) {

  var basic_cooling_load = 0;
  var room_height_to_ceiling = 0;
  // console.log(area,room_temp,ceiling_height)
  Object.keys(dbobj).forEach(function (i) {
    if (Number(ceiling_height) === Number(dbobj[i].ceiling_value)) {
      room_height_to_ceiling = dbobj[i].ceil_factors;
    }
  });


  Object.keys(db1obj).forEach(function (i) {
    if (Number(room_temp) === Number(db1obj[i].roomtemp)) {
      basic_cooling_load = db1obj[i].wsqm;
    }
  });
  // console.log(room_temp+" - "+basic_cooling_load)
  // console.log(ceiling_height+" - "+room_height_to_ceiling)
  // console.log("-----------------")
  const Cooling_load = basic_cooling_load * room_height_to_ceiling;

  return Cooling_load;
}



function step2(area, cl) {

  const true_load = area * cl * load_rating_factor;
  // totrooms1=totrooms1+1;
  // sum_of_all_true_loads = sum_of_all_true_loads+true_load;
  return true_load;
}


function step3(sum_of_all_true_loads) {

  var min_load_factor = 1;
  var max_load_factor = 1.5;
  var comp = 1;

  var system_cooling_limit = 8510;


  localvar.min_true_load = min_load_factor * sum_of_all_true_loads;
  localvar.max_true_load = max_load_factor * sum_of_all_true_loads;


  //no.of comp needed                   //sum of all true loads  //25000
  localvar.compressor_needed = Math.ceil(sum_of_all_true_loads / system_cooling_limit)

  //   while (sum_of_all_true_loads < system_cooling_limit)
  // {
  // comp = comp + 1
  // sum_of_all_true_loads = sum_of_all_true_loads - system_cooling_limit
  // }
  // localvar.compressor_needed = comp
}


var totrooms1 = 0;
const localvar = {};
let user_current_rating = 8
let rooms = [];
let load_rating_factor = 1.15;
var sum_of_all_true_loads = 0;
let dbobj = {};
let db1obj = {};
var b1 = 0; var li1count = 0;
var li1 = []; var li2 = []; var li3 = [];
const { Client } = require('pg');

const client = new Client({
  "host": "localhost",
  "port": 5432,
  "user": "postgres",
  "password": "Harith@kv47",
  "database": "checkcoolingalgo",
})

client.connect();
client.query(`select * from ceiling_factors`, (err, result) => {
  if (!err) {
    dbobj = result.rows;

  }
})

client.query(`select * from room_temp_coolings`, (err, result) => {
  if (!err) {
    db1obj = result.rows;
    // client.end();
  }
})
client.query(`select * from rooms`, (err, result) => {
  if (!err) {
    rooms = result.rows;
    // client.end();
  }
})
client.query(`select * from condenser`, (err, result) => {
  if (!err) {
    condenser = result.rows;
    // client.end();
  }
})
client.query(`select * from fcutable`, (err, result) => {
  if (!err) {
    fcu = result.rows;
    // client.end();
  }
})
client.query(`select * from occ_pattern`, (err, result) => {
  if (!err) {
    rocc = result.rows;
    // client.end();
  }
})
client.query(`select * from eff_profile`, (err, result) => {
  if (!err) {
    efficiency_profile = result.rows;
    // client.end();
  }
})

module.exports = {
  asd(req, res, next) {

    let each_room_cooling_load = [];
    let each_room_load = [];

    Object.keys(rooms).forEach(function (i) {
      each_room_cooling_load.push(step1(rooms[i].area, rooms[i].room_temp, rooms[i].ceiling_height));
      res.locals.each_room_cooling_load = each_room_cooling_load;
    });


    Object.keys(rooms).forEach(function (i) {
      each_room_load.push(step2(rooms[i].area, each_room_cooling_load[i]));
      res.locals.each_room_load = each_room_load;
    });

    var sum_of_all_true_loads = 0;

    Object.keys(each_room_load).forEach(function (i) {
      sum_of_all_true_loads = sum_of_all_true_loads + each_room_load[i];
    });

    step3(sum_of_all_true_loads);


    const { min_true_load, max_true_load, compressor_needed } = localvar;

    var totrooms1 = rooms.length

    res.locals.sum_of_all_true_loads = sum_of_all_true_loads;
    res.locals.min_true_load = min_true_load;
    res.locals.max_true_load = max_true_load;
    res.locals.totrooms1 = totrooms1;
    res.locals.compressor_needed = compressor_needed;
    // console.log(res.locals)
    var arr = [];

    for (var g = 0; g < totrooms1; g++) {
      arr[g] = g + 1;
    }




    var output = []
    var RoomPermutations = []
    output = compressor_config.combineElements(totrooms1);


    console.log("-----------------------------")
    console.log("Compressors Configurations")
    console.log("-----------------------------")
    console.log(output)

    console.log("-----------------------------")
    console.log("Room Permutations")
    console.log("-----------------------------")
    RoomPermutations = room_permutations.permute(arr);
    console.log(RoomPermutations)



    var room_perm_for_each_config1 = room_perm_for_each_config.start(compressor_needed, output, RoomPermutations);
    console.log(room_perm_for_each_config1);



    var roomid = []
    var compressorno = []
    var configno = []

    for (var i = 0; i < room_perm_for_each_config1.length; i++) {
      for (var j = 0; j < room_perm_for_each_config1[i].length; j++) {
        for (var k = 0; k < room_perm_for_each_config1[i][j].length; k++) {
          roomid.push(room_perm_for_each_config1[i][j][k])
          compressorno.push(j + 1)
          configno.push(i + 1)
        }
      }
    }

    res.locals.roomid = roomid
    res.locals.compressorno = compressorno
    res.locals.configno = configno

    // // console.log(roomid)
    // // console.log("--------------")
    // // console.log(compressorno)
    // // console.log("--------------")
    // // console.log(configno)

    //finding products
    let productList = []
    // let display_to_rooms=[]


    console.log("--------------------------------------------------")
    console.log("filtered compressors and their fcu's")
    console.log("---------------------------------------------------")

    for (var i = 0; i < room_perm_for_each_config1.length; i++) {
      // display_to_rooms.push(room_perm_for_each_config1[i])
      for (var j = 0; j < room_perm_for_each_config1[i].length; j++) {
        // console.log(room_perm_for_each_config1[i][j])
        var tot = 0, sum = 0, fcuarrays = []
        for (var k = 0; k < room_perm_for_each_config1[i][j].length; k++) {
          sum += each_room_load[room_perm_for_each_config1[i][j][k] - 1]
          fcuarrays.push(each_room_load[room_perm_for_each_config1[i][j][k] - 1])
          tot += 1
        }
    
        var status = 'system' + tot
        var listt = []
        for (var l = 0; l < condenser.length; l++) {
          var num = condenser[l].currentrating.replace(/\D/g, '')
          if (condenser[l].tags === status &&
            num >= user_current_rating &&
            sum_of_all_true_loads >= min_true_load && sum_of_all_true_loads <= max_true_load &&
            condenser[l].coolingcapacity >= sum &&
            condenser[l].fcucapacity >= sum) {
            var allfcunames = [], allfcus = []

            for (var i1 = 0; i1 < fcu.length; i1++) {

              if (condenser[l].condenserid === fcu[i1].CondenserId) {
                allfcunames.push(fcu[i1].FCUName)
                allfcus.push(fcu[i1].FCU)
              }
            }
            flag1 = 1
            var count = 0
            for (var i2 = 0; i2 < fcuarrays.length; i2++) {
              if (fcuarrays[i2] <= allfcus[i2]) {
                count = count + 1
              }

            }
            if (count === fcuarrays.length) {

              // console.log(allfcunames)
              // console.log(allfcus)
              // console.log(fcuarrays)

              // console.log("YES")

              listt.push(
                `{"rooms":"${room_perm_for_each_config1[i][j]}","condensorname":"${condenser[l].productname}","condenserid":"${condenser[l].condenserid}","fcusname":"${allfcunames}","fcus":"${allfcus}","coolingcapacity":"${condenser[l].coolingcapacity}","price":"${condenser[l].price}","currentrating":"${condenser[l].currentrating}"}`
              )
            }
            else {

              // console.log(allfcunames)
              // console.log(allfcus)
              // console.log(fcuarrays)
              //   console.log("NO")
            }
            allfcunames = []
            allfcus = []

          }
        }
        productList.push(listt)
      }
    }



    //grouping products with based on it's rooms
    var temporary = chunk(productList)
    function chunk(arr) {
      var i, j, tempor = [], chunk = compressor_needed;
      for (i = 0, j = arr.length; i < j; i += chunk) {
        tempor.push(arr.slice(i, i + chunk));
      }
      return tempor
    }

    //removing unwanted products EX:like [1,3] will have no prod but [2,4] will have products
    var li = [], rtt = []
    for (var i = 0; i < temporary.length; i++) {
      var flag = 0
      for (var j = 0; j < temporary[i].length; j++) {
        if (temporary[i][j].length === 0) { flag = 1 }
      }
      if (flag === 0) { li.push(temporary[i]) }
    }
    // console.log(li)

    //evening the all products as same amount
    var val = []
    var curr = 0
    const allEqual = arr => arr.every(v => v === arr[0])
    function call(val, i1) {
      if (!allEqual(val)) {
        curr = val.indexOf(Math.min(...val))
        for (var k = 0; k < (Math.max(...val) - Math.min(...val)); k++) {
          li[i1][curr].push(li[i1][curr][Math.min(...val) - 1])
        }
      }
      // console.log(val)

      val = []
      for (var j = 0; j < li[i].length; j++) {
        val.push(li[i][j].length)
      }
      if (!allEqual(val)) {
        call(val, i1)
      }
    }

    for (var i = 0; i < li.length; i++) {
      val = []
      // for(var j=0;j<li[i].length;j++){
      //     val.push(li[i][j].length)
      // }
      // console.log(val)
      if (val.length != 1) {
        call(val, i)
      }
    }



    //combining the product datas based on index
    var res = []
    for (var i = 0; i < li.length; i++) {
      res.push(li[i].reduce((a, b) => a.map((v, i) => v + "$" + b[i])))

    }

    //splitting a string based on $
    var temp = []
    for (var i = 0; i < res.length; i++) {
      for (var j = 0; j < res[i].length; j++) {
        temp.push(res[i][j].split("$"))
      }
    }

    //list view
    // console.log(temp)


    //converting list to meaningful obj
    let r = [], select_product_list = []
    for (var i = 0; i < temp.length; i++) {
      r = []
      for (var j = 0; j < temp[i].length; j++) {
        r.push(JSON.parse(temp[i][j]))
      }
      select_product_list.push(r)
    }
    // console.log(select_product_list)


    var sum = 0
    for (var i = 0; i < each_room_load.length; i++) {
      sum += each_room_load[i]
    }
    step5.start1(select_product_list, rooms.length, rocc, each_room_load, efficiency_profile, sum)

    next();
  }
}