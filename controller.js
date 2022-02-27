const words = require('./words.json');
const dictionary = require('urban-dictionary');

exports.generateMultipleWords = (req, res, next) => {
	
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
		console.log('query: ', queries);
		//console.log('words: ', filteredWords);

		const result = filteredWords[generateRandomNumber(filteredWords.length)];

		res.status(200).json({
			message: "success",
			data: {
				word: result
			}
		});
	
}
const generateRandomNumber = (limit) => {
	return Math.floor(Math.random() * limit);
}
exports.checkWord = async (req, res, next) => {
	try {
		const { word } = req.params;

		const definations = await dictionary.define(word);

		//const defination

		const define = sortObject(definations);

		res.status(200).json({
			message: "success",
			data: {
				word,
				define
			}
		});
	}
	catch (err) {

		console.log(err);

		return res.status(200).json({
			message: "success",
			data: {
				define:{}
			}
		});

	}

}
const sortObject = (array) => {
	let result = {
		thumbs_up: 0
	}
	array.forEach(el => {
		if (el.thumbs_up >= result.thumbs_up) {
			result = el;
		}
	});

	return result;
}