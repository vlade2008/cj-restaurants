import React, { Component } from 'react'
import { connect } from 'dva';
import { Card, Select, Form, InputNumber, Button, Icon, Modal} from 'antd'
import _ from 'lodash'

 import { isValidateStatus } from '../utils/isValidation'

const Option = Select.Option;
const FormItem = Form.Item;
const dataDishes = require('../../data/dishes.json')

class StepThree extends Component {
    constructor(props){
        super(props)

        this.state = {
            dish_value:'',
            serving_value:1
        }
    }

    handleChangeForm = (name) => {
        return (e) => {
            this.setState({
                [name]:e
            })
        }
    }

    handleAddOrder = () =>{

        
        let data_dish_value = isValidateStatus(this.state.dish_value, 'dish_value', 'No Selected', ['validation_dish_value', 'message_dish_value'])
        let data_serving_value = isValidateStatus(this.state.serving_value, 'serving_value', 'No Selected', ['validation_serving_value', 'message_serving_value'])
        
        this.setState({
            ...data_dish_value, ...data_serving_value
        },()=>{
            if (data_dish_value.validation_dish_value === 'success' && data_serving_value.validation_serving_value === 'success') {
                let payload = {
                    dish_value: this.state.dish_value,
                    serving_value: this.state.serving_value
                }
                this.checkOrder(payload)
            }
        })
        
        
    }

    checkOrder = (data) =>{
        let cloneOrderList = _.clone(this.props.order.activeRecord.orderList)
        

        let isDuplicate = _.filter(cloneOrderList, _.matches({ dish_value: data.dish_value }))

        if (isDuplicate.length === 0){
            cloneOrderList.push(data)

            let payload = {
                orderList: cloneOrderList
            }

           this.setState({
               dish_value: '',
               serving_value: 1
           },()=>{
               this.props.dispatch({
                   type: 'order/updateFormInput',
                   payload,
               })
           })
        }else{
            Modal.warning({
                title: 'Warning',
                content: 'Cannot select the same dish twice!',
            });
        }

        

    }

    render() {
        let {  restaurant, meal, orderList } = this.props.order.activeRecord
        let { dish_value, serving_value, validation_dish_value, message_dish_value, validation_serving_value, message_serving_value } = this.state

        let dishFiltered = []

        _.map(dataDishes.dishes, (item) => {
            let restaurantValue = restaurant.split('-')
            if (_.includes(item.availableMeals, meal) && _.includes(item.restaurant, restaurantValue[0]) ) {
                dishFiltered.push(item)
            }
        })
        return (
            <Card title="Step 3" style={{ flex: 1 }}>
                <Form layout='inline'>
                    <div>
                        <FormItem validateStatus={validation_dish_value} help={message_dish_value}>
                            <h3>Please Select a Dish</h3>
                            <Select value={dish_value || '---'} onChange={this.handleChangeForm('dish_value')} >

                                {
                                    _.map(dishFiltered, (item, i) => {
                                        return (
                                            <Option key={`${item.name}-${item.id}`} >{item.name}</Option>
                                        )
                                    })
                                }



                            </Select>
                        </FormItem>

                        <FormItem validateStatus={validation_serving_value} help={message_serving_value} style={{marginLeft:20}}>
                            <h3>Please enter no. of servings</h3>
                            <InputNumber value={serving_value} onChange={this.handleChangeForm('serving_value')}  />
                            <Button onClick={this.handleAddOrder} style={{ border: 'none' }} ><Icon style={{ fontSize: 24, color: '#1890ff' }} type="plus-circle-o" /></Button>
                        </FormItem>
                        
                    </div>
                </Form>
                <h3 style={{ marginTop: 10 }} >List of Order</h3>
                <table style={{ width: '100%',textAlign:'center'}} border={1} >
                    <thead>
                        <tr>
                            <th>Dish</th>
                            <th>No. Serving</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    
                    
                    <tbody>
                        {
                            !_.isEmpty(orderList) ? _.map(orderList,(item,i)=>{
                                return (
                                    <tr key={i}>
                                        <td>{item.dish_value}</td>
                                        <td>{item.serving_value} </td>
                                        <td>
                                            <Button style={{ border: 'none' }}><Icon type="close-circle" style={{ fontSize: 24, color: '#f81d22' }} /></Button>
                                        </td>
                                    </tr>
                                )
                            }) : (
                                    <tr >
                                        <td colSpan={3} >No Data</td>
                                    </tr>
                            )
                        }
                        
                    </tbody>
                    
                    
                    
                </table>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    order: state.order
})


export default connect(mapStateToProps)(StepThree)


