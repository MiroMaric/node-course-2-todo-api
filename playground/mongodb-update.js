const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        console.log('Unable to connect to database');
    }else{
        //Pogledas dokumentaciju
        // db.collection('Todos').findOneAndUpdate({
        //     text:'Walk the dog'
        // },{
        //     $set:{completed:true}
        // },{
        //     returnOriginal:false
        // }).then((res)=>{
        //     console.log(JSON.stringify(res,undefined,2));
        // });
        // db.close();

        //Challenge
        db.collection('Users').findOneAndUpdate({
            name:'Miro'
        },{
            $set:{
                name:'Miko'
            },
            $inc:{
                age:1
            }
        },{
            returnOriginal:false
        }).then((res)=>{
            console.log(res);
        });
    }
});