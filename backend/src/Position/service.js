export const timeAggregation = (terminalId, startDate, endDate) => 
	[
		{
			$match: {
				$expr: {
					$and: [
                        { $eq: ['$terminalId', terminalId ] },
                        { $gt: ['$createdAt', { $toDate: startDate }] },
                        { $lt: ['$createdAt', { $toDate: endDate }] },
                    ]
				}
			}
		}
	]