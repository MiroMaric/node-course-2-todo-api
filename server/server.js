const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.contentType('text/json').send({todos});
    },(err)=>{
        res.status(400).send(err);
    });
});

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(400).send({});
    }else{
        Todo.findById(id).then((doc)=>{
            if(!doc){
                res.status(404).send({});
            }else{
                res.send(doc);
            }
        }).catch((err)=>{
            res.status(404).send({});
            console.log(err);
        });
    }
});

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(400).send();
    }else{
        Todo.findByIdAndRemove(id).then((todo)=>{
            if(!todo){
                res.status(404).send();
            }else{
                res.send({todo});
            }
        }).catch((e)=>{
            res.status(404).send(e);
        });
    }
});

app.listen(port,()=>{
    console.log(`Server is started on port ${port}`);
});

module.exports = {app};