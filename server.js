var express=require('express');
var mongoose=require('mongoose');
var path=require('path');
var bodyParser=require('body-parser');
var routes=require('./routes');
var app=express();
var port=process.env.PORT||3001;
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',routes.home);
app.get('/home',routes.home2);
app.listen(port, () => {
    console.log('server started on' + ' ' + port);
});