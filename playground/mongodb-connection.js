//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        console.log('Unable to connect to server');
    }else{
        console.log('Connected!');
        db.collection('Todos').insertOne({
            text:'Buy beer',
            completed:false
        },(err,result)=>{
            if(err){
                console.log('Unable to insert new document in Todos collection',err);
            }else{
                console.log('Document is inserted');
                console.log(JSON.stringify(result.ops,undefined,2));
            }
        });

        db.collection('Users').insertOne({
            name:'John',
            age:21,
            location:'Germany'
        },(err,result)=>{
            if(err){
                console.log('Unable to insert document in users collection',err);
            }else{
                console.log('Document is inserted');
                console.log(JSON.stringify(result.ops,undefined,2));
                //console.log(result.ops[0]._id.getTimestamp());
            }
        });
        db.close();
    }
});

