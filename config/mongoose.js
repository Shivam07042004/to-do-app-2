const mongoose= require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/to_do_db')
    .then( () => { console.log('server is connected to the mongoose');
    })
    .catch( () => { console.log('error in mongoose',error);
    });