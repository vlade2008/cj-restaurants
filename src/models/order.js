import update from 'react-addons-update'

export default {
    namespace: 'order',
    state: {
        activeRecord:{},
        record:[]
    },

    reducers: {
        updateFormInputSuccess(state, { payload }) {
			if (payload === 'clear') {
				return update(state, {
					activeRecord: {
						$set: {},
					},
				})
			}
			return update(state, {
				activeRecord: {
					$merge: payload,
				},
			})
        },
        updateRecordSuccess(state, { payload }) {
            return update(state, {
                record: {
                    $set: payload,
                },
            })
        },
    },

   
    effects: {
        *updateFormInput({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ type: 'updateFormInputSuccess',payload });
        },
        *updateRecord({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ type: 'updateRecordSuccess', payload });
        },
    },

    

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },


};
