const ACCESS_KEY = 'j08orGogVAPr3bXvWA0GqoYeBy3UNxbt59oiFUgVSJ8'

export async function getImg(place) {
	let data, response, json
	let formatedPlace = place.split(' ').join('%20').toLowerCase()
	try {
		response = await fetch(
			`https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${formatedPlace}&per_page=1&order_by=views&orientation=landscape`
		)
		json = await response.json()
	} catch (err) {
		json = null
		throw new Error(err.message)
	} finally {
		data = json
	}

	return {
		data,
	}
}
