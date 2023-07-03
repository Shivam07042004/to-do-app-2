const express= require('express');
const port= 8001;
const path= require('path');

const db= require('./config/mongoose');
const ToDo= require('./models/schema');

const app= express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

let todoList=[
    {
        name:"homework",
        time:"26/06/2023",
        completed:false
    },


    {
        name:"vegetable",
        time:"27/06/2023",
        completed:false
    }
];

app.get('/',function(request,response)
{
    ToDo.find({})
        .then( (list) => {
            console.log('list is updated');
            return response.render('home',{
                title:"To Do List",
                to_do_list: list
            })
        })
        .catch( (error) => {
            console.log('error',error)
        });
});

app.get('/complete-list/', function(request, response) {
    let id = request.query.id.trim();
    console.log(id);
  
    ToDo.findByIdAndUpdate(id, { completed: true })
      .then(() => {
        console.log('list completed');
        return response.redirect('back');
      })
      .catch((error) => {
        console.log('error in completing the list element', error);
      });
  });
  
app.post('/create-list',function(request,response)
{
    const addInList={
        name:request.body.name,
        time:request.body.time
    }

    ToDo.create(addInList)
        .then( (addedInList) => { console.log('new added in list',addedInList);
                                  return response.redirect('back');
        })
        .catch( (error) => { console.log('error in adding in the list');
        });
});

app.get('/delete-list/',function(request,response){

    let id=request.query.id.trim();
    console.log(id);

    ToDo.findByIdAndDelete(id)
        .then( () => { console.log('list deleted');
                        return response.redirect('back');
        })
        .catch( (error) => { console.log('error in deleting the list element',error);
    });    

});

app.get('/delete-all', function(request, response) {
    ToDo.deleteMany({})
      .then(() => {
        console.log('All items deleted');
        return response.redirect('/');
      })
      .catch((error) => {
        console.log('Error deleting all items', error);
      });
  });
  

app.listen(port,function(error){
    if(error)
    {
        console.log('error in running',error);
        return;
    }

    console.log('server is running');
});