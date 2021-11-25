import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

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