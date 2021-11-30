import dayjs from 'dayjs';
import Position from './model';
import User from '../User/model';
import { timeAggregation } from './service';

export const getAllPositions = async (req, res, next) => {
	try {
        const { user } = req;
		const allPositions = await Position.find({ user: user.userID });

		return res.status(200).json(allPositions);
	} catch (error) {
		return next(error);
	}
};

export const getPosition = async (req, res, next) => {
	try {
		const { query, params, user } = req;

		const { terminalId } = params;

		const startDate = dayjs(query.startDate).toISOString().substring(0, 10);
		const endDate = dayjs(query.endDate).add(2, 'day').toISOString().substring(0, 10);

		const specificPositions = await Position.aggregate(timeAggregation(terminalId, startDate, endDate, user.userID));

		return res.status(200).json(specificPositions);
	} catch (error) {
		return next(error);
	}
};

export const createPosition = async (req, res, next) => {
	try {
		const { body, user } = req;

        const newPosition = await Position.create({ ...body, user: user.userID });

		return res.status(200).json(newPosition);
	} catch (error) {
		return next(error);
	}
};

export const updatePosition = async (req, res, next) => {
	try {
		const { body, params } = req;
		const { terminalId } = params;

		const positionEntry = await Position.findOneAndUpdate({ terminalId }, { ...body });

		return res.status(200).json({ message: 'Entry was updated!', data: positionEntry });
	} catch (error) {
		return next(error);
	}
};

export const deletePosition = async (req, res, next) => {
	try {
		const { params } = req;
		const { terminalId } = params;

		const { deletedCount } = await Position.deleteMany({ terminalId });

		if(deletedCount < 1) return res.status(404).json({ message: 'Entry not found!' });

		return res.status(204).json();
	} catch (error) {
		return next(error);
	}
};