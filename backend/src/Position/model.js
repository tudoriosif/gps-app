import mongoose from 'mongoose';

const positionSchema = new mongoose.Schema(
	{
		terminalId: {
			type: String,
			required: true,
		},
		latitude: {
			type: Number,
			required: true,
		},
		longitude: {
			type: Number,
			required: true,
		},
	},
	{
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (obj, ret) => {
                delete ret._id;
            },
        },
    },
);

const model = mongoose.model('Position', positionSchema);

export const { schema } = model;

export default model;