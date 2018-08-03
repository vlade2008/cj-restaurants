import _ from 'lodash'

export const isValidateStatus = (value, name, message, schema) => {
	let payload = {}
	if (
		(typeof value === 'string' && !_.isEmpty(value)) ||
		(typeof value === 'number' && value > 0)
	) {
		payload = {
			[schema[0]]: 'success',
			[schema[1]]: '',
		}
	} else {
		payload = {
			[schema[0]]: 'error',
			[schema[1]]: message,
		}
	}

	payload[name] = value

	return payload
}

export const isValidateStatusNumberPeople = (value, name, t) => {
	let payload = {}
	if (value < 0 || (_.isEmpty(value) && !value)) {
		payload = {
			validation_number_people: 'error',
			message_number_people: t('Please input a number'),
		}
	} else if (value > 10) {
		payload = {
			validation_number_people: 'error',
			message_number_people: t('Maximum 10'),
		}
	} else {
		payload = {
			validation_number_people: 'success',
			message_number_people: '',
		}
	}
	payload[name] = value

	return payload
}
