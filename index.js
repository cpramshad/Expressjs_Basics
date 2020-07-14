const express = require('express');
const path = require('path');
//const members = require('./Members');
const logger = require('./middleware/logger');

const app = express();



//Init middleware
//app.use(logger);

//Body Parser Middleware
app.use(express.json());

//Handle form submission
app.use(express.urlencoded({extended: false}));

//Set Static folder
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/members',require('./routes/api/members'));


// app.get('/', (req,res) => {
//     //res.send('<h1>Hello World!<h1>');
//     res.sendFile(path.join(__dirname,'public','index.html'));
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));