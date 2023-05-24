var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());

var con = mysql.createConnection({
    host : "ecom.clyqga6vzi7o.ap-southeast-1.rds.amazonaws.com",
    user : "admin",
    password : "12345678",
    database : "company"
});

con.connect(function(err){
    if(err){
        console.log(err.message);
    }
    else{
        console.log("connection succesfully");
    }
});
app.post('/api/company/designation/insert', function(req,res){
    var designationdata = {
                empid : req.body.empid,
                designation : req.body.designation,
                department : req.body.department
                
            };
        let sqlQuery = "INSERT INTO designation SET ?";
        let query = con.query(sqlQuery,designationdata,function(err,result){
            if(err) throw err;
            res.send(JSON.stringify({"status": 200,"response" : result}));
        });
        console.log(sqlQuery)
    });

    app.get('/api/company/designation/display_all_data', function(req,res){
        let sqlQuery= "SELECT * FROM designation";
        let query = con.query(sqlQuery,function(err,result){
            if(err) throw err;
            res.send(JSON.stringify({"status" : 200, "response" : result}  ));
        });
    });
    app.get('/api/company/designation/display_all_data/join', function(req,res){
        let sqlQuery= "SELECT * FROM employee natural join designation";
        let query = con.query(sqlQuery,function(err,result){
            if(err) throw err;
            res.send(JSON.stringify({"status" : 200, "response" : result}  ));
        });
    });
    
    app.put('/api/company/designation/update-data/:empid', function(req,res){
        let sqlQuery = " UPDATE designation SET designation='" + req.body.designation +"'WHERE empid="+req.params.empid;
        let query= con.query(sqlQuery,function(err,result){
            if(err) throw err;
            res.send(JSON.stringify({"status" : 200, " response" : result}));
        });
    });

      app.delete('/api/company/designation/delete-data/:empid',function(req,res){
        let sqlQuery = "DELETE FROM designation WHERE empid=" + req.params.empid;
        let query = con.query(sqlQuery,function(err,result){
            if(err) throw err;
            res.send(JSON.stringify({"status": 200,"response" : result}));
        });
    });
 
    
    app.listen(9000,()=>{
        console.log("server running");
    });