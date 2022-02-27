const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const router = require('./router');
const app = express();

// MIDLEWARES ->>
app.enable('trust proxy');

app.use(cors());

console.log(`ENV = ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === 'development') {
	//console.log('MORGAN working');
	app.use(morgan('dev')); // <- 3rd party Middleware Function
}

app.use((req,res,next) => {	// <- Serves req time and cookies
	req.requestTime = new Date().toISOString();
	console.log(req.requestTime);
	if(req.cookies) console.log(req.cookies);
	
	next();
});

app.use((req, res, next) => {
	res.setHeader("Content-Type", "application/json");
	next();
});


app.use('/api/v1/', router);

module.exports = app;