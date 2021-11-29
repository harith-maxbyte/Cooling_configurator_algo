const objectstocsv = require('objects-to-csv')
const v8 = require('v8')
const express = require('express');
const app = express();
const cors = require('cors');
const { Client } = require('pg');

const client = new Client({
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "Harith@kv47",
    "database": "checkcoolingalgo",
})


app.use(cors({
    origin: '*'
}));

const { asd } = require('./users');

app.use(express.json());




const datass = []


app.get("/", asd, async (req, res) => {

    for (var i = 0; i < res.locals.roomid.length; i++) {
        datass[i] = { Room_Id: res.locals.roomid[i], Compressor_No: res.locals.compressorno[i], Config_No: res.locals.configno[i] }
    }
    const csv = new objectstocsv(datass);
    await csv.toDisk("./test.csv");
    // console.log(await csv.toString());
    // export NODE_OPTIONS=--max_old_space_size=4096

    res.json({
        status: 200,
        Cooling_load_individual_room: res.locals.each_room_cooling_load,
        power_consumption_of_individual_room: res.locals.each_room_load,
        sum_of_all_true_loads: res.locals.sum_of_all_true_loads,
        min_range: res.locals.min_true_load,
        max_range: res.locals.max_true_load,
        Total_rooms: res.locals.totrooms1,
        no_of_compressor_needed: res.locals.compressor_needed,
        hourly_operating_load: res.locals.hourly_operating_load,
        monthly_operating_power: res.locals.monthly_operating_power,
        yearly_operating_power: res.locals.yearly_operating_power,
        monthly_electricity_cost: res.locals.monthly_electricity_cost,
        yearly_electricity_cost: res.locals.yearly_electricity_cost,
    });

});

// client.connect();
// client.query(`COPY room_configurations(room_id,compressor_no,config_no) FROM './test.csv' DELIMITER ',' CSV HEADER`,(err,result)=>{
//     if(!err){
//  console.log("successfuly csv inserted into table")

// }
// })


app.use((req, res) => {
    res.status(404)
        .send('Unknown request');
});

// console.log(v8.getHeapStatistics())
const totalHeapSize = v8.getHeapStatistics().total_available_size;
const totalHeapSizeGb = (totalHeapSize / 1024 / 1024 / 1024).toFixed(2);
console.log('totalHeapSizeGb: ', totalHeapSizeGb);

const port = 5000;
app.listen(port, () => console.log(`server runs at ${port}`));