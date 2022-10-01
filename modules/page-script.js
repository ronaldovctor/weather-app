import { getImg } from './unsplash-api.js'
import { getCountryFlag } from './country-flag-api.js'
import { getCountryData } from './country-info-api.js'
import { getCityWeather } from './weather-map-api.js'

export const searchInput = document.querySelector('[data-page="search-input"]')
export function initPageFunctions() {
	const img = document.querySelector('[data-page="bg-img"]')
	const flag = document.querySelector('[data-page="country-flag"]')
	const city = document.querySelector('[data-page="city-name"]')
	const country = document.querySelector('[data-page="country"]')
	const celcius = document.querySelector('[data-page="celcius"]')
	const fahrenheit = document.querySelector('[data-page="fahrenheit"]')
	const condition = document.querySelector('[data-page="condition"]')
	const conditionImg = document.querySelector('[data-page="condition-img"]')
	const humidity = document.querySelector('[data-page="humidity"] p')
	const sunset = document.querySelector('[data-page="sunset"]')
	const sunrise = document.querySelector('[data-page="sunrise"]')
	const wind = document.querySelector('[data-page="wind"]')

	searchInput.addEventListener('keydown', async ({ key, target }) => {
		if (key == 'Enter' && target.value != '') {
			setLoading(true)
			const cityName = target.value
			try {
				const { weatherData } = await getCityWeather(cityName)
				if (weatherData != null) {
					let condImg = weatherData.weather[0].icon
					let windSpeed = weatherData.wind.speed
					let sunsetTime = new Date(weatherData.sys.sunset * 1000)
					let sunriseTime = new Date(weatherData.sys.sunrise * 1000)
					let { countryInfo } = await getCountryData(
						weatherData.sys.country.toLowerCase()
					)
					console.log(countryInfo)
					const { data } = await getImg(cityName)
					setBodyImg(data.results[0].urls.full)

					const { src } = getCountryFlag(weatherData.sys.country)
					setCountryFlag(src)
					setInfos(
						weatherData.name,
						parseInt(weatherData.main.temp),
						weatherData.weather[0].description,
						condImg,
						weatherData.main.humidity,
						sunsetTime,
						sunriseTime,
						windSpeed,
						countryInfo
					)
					// TODO: add restcountrues api to get info about country
				}
			} catch (error) {
				throw new Error(error.message)
			} finally {
				setLoading(false)
			}
		}
	})

	function setBodyImg(src) {
		img.style.backgroundImage = `url(${src})`
		img.style.backgroundSize = 'cover'
		img.style.backgroundPosition = 'center'
	}

	function setCountryFlag(src) {
		flag.src = src
	}

	function setLoading(state) {
		state ? (searchInput.disabled = true) : (searchInput.disabled = false)
	}

	function setInfos(
		place,
		temp,
		cond,
		condImg,
		humid,
		sunsetTime,
		sunriseTime,
		windSpeed,
		countryInfo
	) {
		city.innerText = place
		country.innerText = `${countryInfo[0].name.common} - ${countryInfo[0].subregion}`
		celcius.innerText = `${temp}°C`
		fahrenheit.innerText = `${(temp * 9) / 5 + 32}°F`
		condition.innerText = cond
		conditionImg.setAttribute('src', `http://openweathermap.org/img/wn/${condImg}.png`)
		humidity.innerText = `Humidity: ${humid}%`
		sunset.innerText = `Sunset: ${sunsetTime.getHours()}h ${sunsetTime.getMinutes()}min`
		sunrise.innerText = `Sunrise: ${sunriseTime.getHours()}h ${sunriseTime.getMinutes()}min`
		wind.innerText = `Wind: ${Math.round(windSpeed)}Kmph - ${Math.round(
			windSpeed * 0.62137
		)}Mph`
	}
}
