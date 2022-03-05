const words = require('./words.json');
const dictionary = require('urban-dictionary');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const test = require('./test.json');

exports.generateMultipleWords = async (req, res, next) => {

	const queries = req.query;
	let filteredWords = words;


	if (queries.length) {
		filteredWords = filteredWords.filter(word => (`${word.length}` === queries.length));

		if (queries.max || queries.min) {
			return res.status(400).json({
				message: "You cannot use queries like: [max or min] with length"
			});
		}
	} else {
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

	//const res = await 


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
		const {
			word
		} = req.params;

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
	} catch (err) {

		console.log(err);

		return res.status(200).json({
			message: "success",
			data: {
				define: {}
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
exports.filterData = async (req, res, next) => {

	const filteredData = [];
	
	async function loop(){
		words.forEach(async (word) => {

			try {
				const res = await wordCheck(word);
				if (res) {
					//console.log('word');
					filteredData.push(word);
					fs.writeFileSync(path.resolve(__dirname, 'filteredWords.json'), JSON.stringify(filteredData));
				}
				else {
					//console.log('word not found');
				}
			}
			catch (err) {
				//console.log(err);
			}
	
		});
	}

	await loop();

	//console.log('filtered data: ', filteredData);

	res.status(200).json({
		message: "success",
		data: {
			filteredData
		}
	});
}

const wordCheck = async (word) => {
	
	try {
		//console.log('chekcing');
		let res = await axios.get(
			`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
		);

		//console.log(res.data[0].meanings[0].definitions[0].definition);
		//console.log('found');
		return res.data[0].meanings[0].definitions[0].definition;

	} catch (err) {
		//console.log('not found');
		console.log(err.message);
		return false;
	}
}