const expect = require('expect');
const request = require('supertest');

const {Todo} = require('./../models/todo');
const {app} = require('./../server');

var todos = [{
    text:'Pick up tickets for Halid show!'
},{
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