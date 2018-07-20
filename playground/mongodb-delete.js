const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        console.log('Unable to connect to server: ',err);
    }else{
        //DELETE MANY
        // db.collection('Todos').deleteMany({text:'Learn NodeJS'}).then((res)=>{
        //     console.log(res.result);
        // });

        //DELETE ONE
        // db.collection('Todos').deleteOne({text:'Learn NodeJS'}).then((res)=>{
        //     console.log(res.result);
        // });

        //FINDONEANDDELETE
        // db.collection('Todos').findOneAndDelete({text:'Learn NodeJS'}).then((res)=>{
        //     console.log(JSON.stringify(res,undefined,2));
        // });

        //Challenge
        // db.collection('Users').deleteMany({name:'Den'}).then((res)=>{
        //     console.log(res.result);
        // });
        // db.collection('User').findOneAndDelete({_id:new ObjectID('5b5191d60de4ad2fc8fcb9b3')}).then((res)=>{
        //     console.log(JSON.stringify(res,undefined,2));
        // });
        db.close();
    }
});