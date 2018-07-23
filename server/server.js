const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
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

app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.comleted = false;
        body.completedAt = null;
    }
    
    Todo.findOneAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });

});

app.listen(port,()=>{
    console.log(`Server is started on port ${port}`);
});

module.exports = {app};