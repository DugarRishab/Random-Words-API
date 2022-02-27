const words = require('./words.json');

exports.generateMultipleWords = async (req, res, next) => {
	try {
		
		const queries = req.query; 
		let filteredWords = [];

		if (queries.length) {
			filteredWords = words.filter(word => (`${word.length}` === queries.length));
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