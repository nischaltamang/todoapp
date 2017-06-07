var express = require('express');
var app = express();
var routes = require('./routes');
var mongoose = require('mongoose');
var hbs = require('express-handlebars');
var path = require('path');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var serveStatic = require('serve-static');
var errorHandler = require('errorhandler');

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/public/views');

mongoose.connect('mongodb://localhost/todoapp');
mongoose.connection.on('open', function(){
  console.log('Mongoose connected');
});

app.engine('.hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'index',
  layoutsDir: app.get('views') + '/layouts'
}));
app.set('view engine', '.hbs');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(methodOverride());
app.use(serveStatic(path.join(__dirname, '/public')));
if(app.get('env') === 'development'){
  app.use(errorHandler());
}

routes.initialize(app, new express.Router());

var server = app.listen(app.get('port'), function(err){
  console.log('Server up');
});
