const URL = 'https://restcountries.com/v3.1/alpha'

export async function getCountryData(code) {
	let countryInfo, response, json

	try {
		response = await fetch(`${URL}/${code}`)
		json = await response.json()
	} catch (error) {
		json = null
		throw new Error(error.message)
	} finally {
		countryInfo = json
	}

	return {
		countryInfo,
	}
}
