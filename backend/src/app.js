import config from './config.js';
import mongoose from 'mongoose';
import express, { urlencoded } from 'express';
import cors from 'cors';
import positionRoute from './Position/index.js';
import errorHandler from './utils.js';

const { mongo, port } = config;

const app = express();

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: true }));

app.use('/positions', positionRoute);

if (mongo.uri) {
	mongoose.set('debug', true);
	mongoose.connect(mongo.uri, mongo.options).catch((error) => console.log(error));
}

app.get('/', (req, res) => res.send('Hello world!'));

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
});