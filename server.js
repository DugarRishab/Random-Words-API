const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');


// Starting Server ->>
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App running at port`, `${port}...`);
});