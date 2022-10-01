const URL = 'https://countryflagsapi.com/svg'

export function getCountryFlag(country) {
	let src = `${URL}/${country}`

	return {
		src,
	}
}
