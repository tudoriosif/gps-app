import config from './config';
import mongoose from 'mongoose';
import express, { urlencoded } from 'express';
import cors from 'cors';
import positionRoutes from './Position/';
import authRoutes from './Auth';
import errorHandler from './utils';
import passport from './Auth/auth';

const { mongo, port } = config;

const app = express();

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/', authRoutes);
app.use('/positions', positionRoutes);

if (mongo.uri) {
	mongoose.set('debug', true);
	mongoose.connect(mongo.uri, mongo.options).catch((error) => console.log(error));
}

app.get('/', (req, res) => res.send('Hello world!'));

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
});