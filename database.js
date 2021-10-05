const {Client} = require('pg');

const client=new Client({
	"host": "localhost",
    "port": 5432,
	"user": "postgres",
    "password": "myPassword",
    "database": "coolingalgo",
    
})

client.connect();

client.query(`select * from qwe`,(err,result)=>{
	if(!err){
		console.log(result.rows);
	}
	client.end();
})