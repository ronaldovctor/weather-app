import { initPageFunctions, searchInput } from './modules/page-script.js'

window.addEventListener('load', () => {
	initPageFunctions()
	searchInput.value = 'New York'
	searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
})
