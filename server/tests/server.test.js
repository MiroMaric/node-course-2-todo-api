const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {Todo} = require('./../models/todo');
const {app} = require('./../server');

var todos = [{
    _id:new ObjectID(),
    text:'Pick up tickets for Halid show!'
},{
    _id:new ObjectID(),
    text:'Go to toalet'
}];

//Pokrece se pre svakog testa
beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        Todo.insertMany(todos).then(()=>{
            done();
        })
    });
});


describe('POST /todos',()=>{
    it('Should add new todo in database',(done)=>{
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res)=>{
                if(err){
                    done(err);
                }else{
                    Todo.find({text}).then((todos)=>{
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    }).catch((e)=>done(e));
                }
            });
    });

    it('Should not created new todo with invalid body data',(done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res)=>{
                if(err){
                    done(err);
                }else{
                    Todo.find().then((docs)=>{
                        expect(docs.length).toBe(2);
                        done();
                    }).catch((e)=>done(e));
                }
            })
    });
});

describe('GET /todos',()=>{
    it('Should get all todos',()=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        });
    });
});

describe('GET /todos:id',()=>{
    it('Should return todo doc',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toEqual(todos[0].text);
            }).end(done);
    })

    it('Should return 400 if path not valid',(done)=>{
        request(app)
            .get('/todos/0000000000')
            .expect(400)
            .expect((res)=>{
                expect(res.body).toEqual({});
            }).end(done);
    });

    it('Should return 404 id todo doc is not found',(done)=>{        
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .expect((res)=>{
                expect(res.body).toEqual({});
            }).end(done);
    });

});