import mongoose from "mongoose";

export const timeAggregation = (terminalId, startDate, endDate, userID) => 
	[
		{
			$match: {
				$expr: {
					$and: [
                        { $eq: ['$user', mongoose.Types.ObjectId(userID)]},
                        { $eq: ['$terminalId', terminalId ] },
                        { $gt: ['$createdAt', { $toDate: startDate }] },
                        { $lt: ['$createdAt', { $toDate: endDate }] },
                    ]
				}
			}
		},
        {
            $lookup: {
                localField: "user",
                foreignField: "_id",
                from: "users",
                as: "user",
            }
        },
        {
            $unset: "user.password",
        },
	]