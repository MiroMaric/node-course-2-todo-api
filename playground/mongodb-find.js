const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        console.log('Unable to connect to database');
    }else{
        db.collection('Todos').find({complited:false}).toArray().then((docs)=>{
            console.log('fetch all data with complited:true field');
            console.log(JSON.stringify(docs,undefined,2));
        },(err)=>{
            console.log('Unable to fetch document from databse: ',err);
        });

        db.collection('Todos').find(
            {
                _id:new ObjectID('5b51a07a6edef51c90a512c8')

            }).toArray().then((docs)=>{
            console.log('fetch document with specific id');
            console.log(JSON.stringify(docs,undefined,2));
        },(err)=>{
            console.log('Unable to fetch document from databse: ',err);
        });

        db.collection('Todos').find().count().then((count)=>{
            console.log('Todos count:',count);
        },(err)=>{
            console.log(err);
        });

        db.collection('Users').find({name:'Miro'}).toArray().then((docs)=>{
            console.log('Users with name:"Miro"');
            console.log(JSON.stringify(docs,undefined,2));
        },(err)=>{
            console.log('Unable to fetch data: ',err);
        });
    }
    db.close();
});