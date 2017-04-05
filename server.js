
var express = require('express'),
	app = express(),
 	bodyParser =  require('body-parser'),
	config = require('./config'),
	mongoose = require('mongoose'),
	user_action = require('./user_action')

mongoose.connect(config.db);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/');
});
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');

});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    limit: '500mb'
}));

app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    parameterLimit: 5000000
}));




app.post('/userSignup',user_action.userSignUp);

app.post('/Login',user_action.login);

app.post('/createProfile',user_action.createProfile);

app.post('/storeImages',user_action.storeImages);

app.post('/getLastImage',user_action.getLastImage);

app.post('/storeImagesCloundinary',user_action.storeImagesCloundinary);

app.post('/showUserDetails',user_action.showUserDetails);

app.post('/deleteUserDetails',user_action.deleteUserDetails);

app.post('/showRoleData',user_action.showRoleData);

//KING
app.post('/getAllMinusKing',user_action.getAllMinusKing);

//QUEEN
app.post('/getGirls',user_action.getGirls);

//GIRL
app.post('/getBoys',user_action.getBoys);

//BOY
app.post('/getKings',user_action.getKings);

//ADMIN
app.post('/getAll',user_action.getAll);



// start the server
app.listen(config.port,function(){
	console.log("welcome to the node.js world" +config.port);
});
