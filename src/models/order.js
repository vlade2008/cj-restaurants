import update from 'react-addons-update'

export default {
    namespace: 'order',
    state: {
        activeRecord:{
            meal: "lunch",
            validation_meal:'success',
            number_people:1,
            validation_number_people:'success',
            validation_restaurant:'success',
            restaurant:'Mc Donalds-1',
            orderList:[
                { dish_value: 'Chicken Burger-1', serving_value:1}
            ]
        },
        record:[]
    },

    reducers: {
        updateFormInputSuccess(state, { payload,reset }) {
			if (payload === 'clear') {
				return update(state, {
					activeRecord: {
						$set: {},
					},
				})
            }else if(reset){
                return update(state, {
                    activeRecord: {
                        $set: payload,
                    },
                })
            }else{
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
            })
        },
    },

   
    effects: {
        *updateFormInput({ payload,callback = null,reset = null }, { call, put }) {  
            yield put({ type: 'updateFormInputSuccess', payload, reset });
            if(callback)callback()
        },
        *updateRecord({ payload }, { call, put }) { 
            yield put({ type: 'updateRecordSuccess', payload });
        },
    },

    

    subscriptions: {
        setup({ dispatch, history }) { 
        },
    },


};
