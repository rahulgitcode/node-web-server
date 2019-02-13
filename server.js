const server = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = server();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', hbs);
app.use(server.static(__dirname + '/public'));

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs')
// });

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = ` ${now} ${req.method} - ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Error occured while writing to file');
        }
    });
    next();
});

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('doUpperCase',(text)=>{
    return text.toUpperCase();
})

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle : 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle : 'About Page'
    });
})

app.get('/likes',(req,res)=>{
    res.send({
        hobbies : 'sports',
        skills : [
            'java',
            'c++',
            'sql'
        ]
    });
})

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`)
});