import update from 'react-addons-update'

export default {
	namespace: 'order',
	state: {
		activeRecord: {
			orderList: [],
		},
		record: [],
	},

	reducers: {
		updateFormInputSuccess(state, { payload, reset }) {
			if (payload === 'clear') {
				return update(state, {
					activeRecord: {
						$set: {},
					},
				})
			} else if (reset) {
				return update(state, {
					activeRecord: {
						$set: payload,
					},
				})
			} else {
				return update(state, {
					activeRecord: {
						$merge: payload,
					},
				})
			}
		},
		updateRecordSuccess(state, { payload }) {
			return update(state, {
				record: {
					$set: payload,
				},
				activeRecord: {
					$set: {
						orderList: [],
					},
				},
			})
		},
	},

	effects: {
		*updateFormInput({ payload, callback = null, reset = null }, { call, put }) {
			yield put({ type: 'updateFormInputSuccess', payload, reset })
			if (callback) callback()
		},
		*updateRecord({ payload, callback = null }, { call, put }) {
			yield put({ type: 'updateRecordSuccess', payload })
			if (callback) callback()
		},
	},

	subscriptions: {
		setup({ dispatch, history }) {},
	},
}
