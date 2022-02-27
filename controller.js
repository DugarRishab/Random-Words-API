const words = require('./words.json');

exports.generateMultipleWords = async (req, res, next) => {
	try {
		
		const queries = req.query; 
		let filteredWords = words;
		

		if (queries.length) {
			filteredWords = filteredWords.filter(word => (`${word.length}` === queries.length));

			if (queries.max || queries.min) {
				return res.status(400).json({
					message: "You cannot use queries like: [max or min] with length"
				});
			}
		}
		else {
			if (queries.max) {
				filteredWords = filteredWords.filter(word => (`${word.length}` <= queries.max));
			}
			if (queries.min) {
				filteredWords = filteredWords.filter(word => (`${word.length}` >= queries.min));
			}
		}
		console.log('query: ', queries.length);
		console.log('words: ', filteredWords);

		const result = filteredWords[generateRandomNumber(filteredWords.length)];

		res.status(200).json({
			message: "success",
			data: {
				word: result
			}
		});
	}
	catch (err) {
		console.log('err: ', err);
	}
}
const generateRandomNumber = (limit) => {
	return Math.floor(Math.random() * limit);
}