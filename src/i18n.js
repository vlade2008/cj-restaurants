import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n.use(LanguageDetector).init({
	// we init with resources
	resources: {
		en: {
			translations: {
				'Order Form': 'Order Form',
				Translate: 'Translate',
				'Order List': 'Order List',
				'No Data': 'No Data',
				Meal: 'Meal',
				'No. of People': 'No. of People',
				Restaurant: 'Restaurant',
				Dishes: 'Dishes',
				'No. Serving': 'No. Serving',
				'Step 1': 'Step 1',
				'Step 2': 'Step 2',
				'Step 3': 'Step 3',
				Review: 'Review',
				Previous: 'Previous',
				Submit: 'Submit',
				Next: 'Next',
				Warning: 'Warning',
				'Please select a order!': 'Please select a order!',
				'No Selected': 'No Selected',
				'Please input a number': 'Please input a number',
				'Maximum 10': 'Maximum 10',
				'Please Select a meal': 'Please Select a meal',
				'Please Enter Number of people': 'Please Enter Number of people',
				'Please Select a Restaurant': 'Please Select a Restaurant',
				'Cannot select the same dish twice!': 'Cannot select the same dish twice!',
				'Please Select a Dish': 'Please Select a Dish',
				'Please enter no. of servings': 'Please enter no. of servings',
				'List of Order': 'List of Order',
				Dish: 'Dish',
				Action: 'Action',
				Total: 'Total',
				'Total number of dishes should be greater or equal to the number of person and Maximum of 10 is allowed!':
					'Total number of dishes should be greater or equal to the number of person and Maximum of 10 is allowed!',
			},
		},
		fil: {
			translations: {
				'Order Form': 'Order ng Form',
				Translate: 'Isalin',
				'Order List': 'Listahan ng order',
				'No Data': 'Walang Data',
				Meal: 'Pagkain',
				'No. of People': 'No. Ng Mga Tao',
				Restaurant: 'Restawran',
				Dishes: 'Mga Pinggan',
				'No. Serving': 'No. Paglilingkod',
				'Step 1': 'Hakbang 1',
				'Step 2': 'Hakbang 2',
				'Step 3': 'Hakbang 3',
				Review: 'Pagsusuri',
				Previous: 'Nakaraang',
				Submit: 'Ipasa',
				Next: 'Susunod',
				Warning: 'Babala',
				'Please select a order!': 'Mangyaring pumili ng isang order!',
				'No Selected': 'Walang Piniling',
				'Please input a number': 'Mangyaring mag-input ng isang numero',
				'Maximum 10': 'Maximum na 10',
				'Please Select a meal': 'Mangyaring pumili ng pagkain',
				'Please Enter Number of people': 'Mangyaring Ipasok ang Bilang ng mga tao',
				'Please Select a Restaurant': 'Mangyaring Pumili ng Restawran',
				'Cannot select the same dish twice!':
					'Hindi maaaring piliin ang parehong ulam nang dalawang beses!',
				'Please Select a Dish': 'Mangyaring pumili ng isang ulam',
				'Please enter no. of servings': 'Mangyaring ipasok ang no. ng mga servings',
				'List of Order': 'Listahan ng Order',
				Dish: 'Ulam',
				Action: 'Aksyon',
				Total: 'Kabuuang',
				'Total number of dishes should be greater or equal to the number of person and Maximum of 10 is allowed!':
					'Ang kabuuang bilang ng mga pinggan ay dapat mas malaki o katumbas ng bilang ng tao at ang Maximum of 10 ay pinapayagan!',
			},
		},
	},
	fallbackLng: 'en',
	debug: false,

	// have a common namespace used around the full app
	ns: ['translations'],
	defaultNS: 'translations',

	keySeparator: false, // we use content as keys

	interpolation: {
		escapeValue: false, // not needed for react!!
		formatSeparator: ',',
	},

	react: {
		wait: true,
	},
})

export default i18n
