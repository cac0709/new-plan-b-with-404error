var mysql = require('mysql');
var conn = mysql.createConnection({
    host:'localhost',
    prot:'3306',
    user:'root',
    password:'123456',
    database:'nodejs_login'
});
exports.connectFunc = mysql.createConnection({
    host:'localhost',
    prot:'3306',
    user:'root',
    password:'123456',
    database:'nodejs_login'
});
conn.connect(function(err){
    if(err)throw err;
    console.log('Connected!');

})