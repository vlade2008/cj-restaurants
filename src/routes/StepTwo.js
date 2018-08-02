import React, { Component } from 'react'
import { connect } from 'dva';
import { Card, Select,Form } from 'antd'
import _ from 'lodash'

import { isValidateStatus, isValidateStatusNumberPeople } from '../utils/isValidation'

const Option = Select.Option;
const FormItem = Form.Item;
const dataDishes = require('../../data/dishes.json')

class StepTwo extends Component {
    
    handleChangeForm = (name) => {
        return (e) => {
            let payload = {}
            let {number_people,meal} = this.props.order.activeRecord

            let data_restaurant = isValidateStatus(e, name, 'No Selected', ['validation_restaurant','message_restaurant'])
            let data_number_people = isValidateStatusNumberPeople(number_people,'number_people')
            let data_meal = isValidateStatus(meal, 'meal', 'No Selected', ['validation_meal', 'message_meal'])

            payload = {
                ...data_restaurant, ...data_number_people, ...data_meal, orderList:[]
            }

            this.props.dispatch({
                type: 'order/updateFormInput',
                payload,
                reset:true
            })
        }
    }

    render() {
        const formItemLayout = {
            wrapperCol: { span: 5 },
        };

        let { validation_restaurant, message_restaurant, restaurant,meal } = this.props.order.activeRecord

        let dishFiltered = []

        _.map(dataDishes.dishes,(item)=>{
            if (_.includes(item.availableMeals, meal) && _.isEmpty(_.filter(dishFiltered, { restaurant: item.restaurant }))) {
                dishFiltered.push(item)
            }
        })
        return (
            <Card title="Step 2" style={{ flex: 1 }}>
                <Form layout='vertical'>
                    <div>
                        <FormItem {...formItemLayout} label="Please Select a Restaurant" validateStatus={validation_restaurant} help={message_restaurant}>
                            <Select value={restaurant || '---'} onChange={this.handleChangeForm('restaurant')} >
                                
                                {
                                    _.map(dishFiltered,(item,i)=>{
                                        return (
                                            <Option key={`${item.restaurant}-${item.id}`} >{item.restaurant}</Option>
                                        )
                                    })
                                }

                            

                            </Select>
                        </FormItem>

                    </div>

                </Form>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    order: state.order
})


export default connect(mapStateToProps)(StepTwo)


