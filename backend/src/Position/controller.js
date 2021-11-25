import dayjs from 'dayjs';
import Position from './model.js';
import { timeAggregation } from './service.js';

export const getAllPositions = async (req, res, next) => {
	try {
		const allPositions = await Position.find();

		res.status(200).json(allPositions);
	} catch (error) {
		return next(error);
	}
};

export const getPosition = async (req, res, next) => {
	try {
		const { query, params } = req;

		const { terminalId } = params;

		console.log(query.startDate, query.endDate, terminalId);

		const startDate = dayjs(query.startDate).toISOString().substring(0, 10);
		const endDate = dayjs(query.endDate).add(2, 'day').toISOString().substring(0, 10);

		console.log(startDate, endDate);

		const specificPositions = await Position.aggregate(timeAggregation(terminalId, startDate, endDate));

		console.log(specificPositions);

		res.status(200).json({
			startDate,
			endDate,
		});
	} catch (error) {
		return next(error);
	}
};

export const createPosition = async (req, res, next) => {
	try {
		const { body } = req;
		const newPosition = await Position.create(body);

		res.status(200).json(newPosition);
	} catch (error) {
		return next(error);
	}
};

export const updatePosition = async (req, res, next) => {
	try {
		const { body, params } = req;
		const { terminalId } = params;

		const positionEntry = await Position.findOneAndUpdate({ terminalId }, { ...body });

		res.status(200).json({ message: 'Entry was updated!', data: positionEntry });
	} catch (error) {
		return next(error);
	}
};

export const deletePosition = async (req, res, next) => {
	try {
		const { params } = req;
		const { terminalId } = params;

		const { deletedCount } = await Position.deleteOne({ terminalId });

		if(deletedCount < 1) return res.status(404).json({ message: 'Entry not found!' });

		return res.status(204).json();
	} catch (error) {
		return next(error);
	}
};