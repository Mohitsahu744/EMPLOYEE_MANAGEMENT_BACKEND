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
app.post('/api/company/employee/insert', function(req,res){
    var employeedata = {
                empName : req.body.empName,
                mobile : req.body.mobile,
                city : req.body.city,
                address : req.body.address,
                joiningDate : req.body.joiningDate
            };
        let sqlQuery = "INSERT INTO employee SET ?";
        let query = con.query(sqlQuery,employeedata,function(err,result){
            if(err) throw err;
            res.send(JSON.stringify({"status": 200,"response" : result}));
        });
    });

    app.get('/api/company/employee/display_all_data', function(req,res){
        let sqlQuery= "SELECT * FROM employee";
        let query = con.query(sqlQuery,function(err,result){
            if(err) throw err;
            res.send(JSON.stringify({"status" : 200, "response" : result}  ));
        });
    });
    app.get('/api/company/employee/search-data/:empid', function(req,res){
        let sqlQuery= "SELECT * FROM employee WHERE empid=" + req.params.empid;
        let query = con.query(sqlQuery,function(err,result){
            if(err) throw err;
            res.send(JSON.stringify({"status" : 200, "response" : result}));
        });
    });
    
    app.put('/api/company/employee/update-data/:empid', function(req,res){
        let sqlQuery = " UPDATE employee SET empNAme='" + req.body.empName +"'WHERE empid="+req.params.empid;
        let query= con.query(sqlQuery,function(err,result){
            if(err) throw err;
            res.send(JSON.stringify({"status" : 200, " response" : result}));
        });
    });

      app.delete('/api/company/employee/delete-data/:empid',function(req,res){
        let sqlQuery = "DELETE FROM employee WHERE empid=" + req.params.empid;
        let query = con.query(sqlQuery,function(err,result){
            if(err) throw err;
            res.send(JSON.stringify({"status": 200,"response" : result}));
        });
    });
 
    
    app.listen(7000,()=>{
        console.log("server running");
    });
    