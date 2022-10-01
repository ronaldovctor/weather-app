const ACCESS_KEY = 'your openweathermapapi access key'
const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${ACCESS_KEY}&lang=en_us&q`

export async function getCityWeather(city) {
	let weatherData, response, json

	try {
		response = await fetch(`${URL}=${city}`)
		json = await response.json()
		weatherData = json
	} catch (error) {
		json = null
		throw new Error(error.message)
	} finally {
		weatherData = json
	}

	return {
		weatherData,
	}
}
