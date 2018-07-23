const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res)=>{
//     console.log(res.result);
// });

Todo.findOneAndRemove({_id:'5b55901b312f771f8b857990'}).then((todo)=>{
    console.log(todo);
});

Todo.findByIdAndRemove('5b559067312f771f8b8579bc').then((todo)=>{
    console.log(todo);
});


