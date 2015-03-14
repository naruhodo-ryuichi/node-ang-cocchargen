/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var orm = require('orm');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

//DB
app.use(orm.express("sqlite://midb.sqlite", {
    define: function (db, models) {
        models.person = db.define("ficha", {
            name: String,
            clearance: String,
            sector: Number
        });;
    }
}));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
