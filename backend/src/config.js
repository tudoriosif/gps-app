import path from 'path';

const dotenv = require('dotenv').config({
	path: path.resolve(__dirname, '../.env')
});

const config = {
	mongo: {
		options: {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		},
		uri: process.env.MONGODB_URI
	},
	port: process.env.PORT,
}


export default config;