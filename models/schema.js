/*const mongoose= require('mongoose');

const todoSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
});


const todoList= mongoose.model('todoList','todoSchema');

module.exports= todoList;*/

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    completed:{
        type:Boolean,
        default:false
    }
    
});

const todoList = mongoose.model('Todo', todoSchema);

module.exports = todoList;
