const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library-managment',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
