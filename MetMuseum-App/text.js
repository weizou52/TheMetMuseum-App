const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'aae597bfcbmshae14c93f610ec13p13ef61jsna0a0a0894247',
		'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
	}
};

fetch('https://the-cocktail-db.p.rapidapi.com/search.php?s=vodka', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));