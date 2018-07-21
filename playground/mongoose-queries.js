const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b538b128e906620229b8c4d';
var userId = '5b527a5edaa97ef42a757712';

Todo.find({
    _id:id
}).then((docs)=>{
    console.log('docs: ',docs);
});

Todo.findOne({
    _id:id
}).then((doc)=>{
    console.log('doc: ',doc);
});

Todo.findById(id).then((doc)=>{
    if(!doc){
        return console.log('Id not found');
    }
    console.log('Document by id: ',doc);
});

//Challenge
if(ObjectID.isValid(userId)){
    User.findById(userId).then((doc)=>{
        if(!doc){
            return console.log('Id not found');
        }
        console.log('User with specific id:',doc);
    });
}else{
    console.log('Id is not valid');
}
