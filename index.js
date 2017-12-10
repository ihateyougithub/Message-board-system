
var express =require('express')

var bodyParser = require('body-parser')

var mongoose = require('mongoose');

var web = express();

web.use(express.static('public'))

web.use(bodyParser.urlencoded({extended:false}))

var mongoDB = mongoose.connect('mongodb://localhost/studentDB')

var db = mongoDB.connection ;

db.on('error',function(err){
    console.log('数据库打开失败:' + err)
})
db.once('open',function(){
    console.log('数据库打开成功')
})
var schema = mongoose.Schema({
    name : String ,
    age : Number ,
    phone :String ,
    email :String ,
    intro : String 
})
var Students = mongoose.model('students',schema);

web.post('/add',function(req ,res){
    console.log(req.body);

    var stu = new Students(req.body);

    stu.save(function(err ,data){
        if(!err)
        {
            res.json({result:'200'})
        }
        else 
        {
            res.json({result:'0'})
        }
    })
})

web.get('/show',function(req ,res){

    Students.find().exec(function(err ,data){

        if(!err)
        {
            res.send(data)
        }
    })
})

web.get('/remove',function(req ,res){

    var id = req.query.ID 

    Students.findByIdAndRemove(id).exec(function(err ,data){
        if(!err)
        {
            res.json({result:'200'})
        }
        else 
        {
            res.json({result:'0'})
        }
    })
})
web.listen('8088',function(){
    console.log('服务器启动')
})
