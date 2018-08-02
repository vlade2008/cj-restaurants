import React, { Component } from 'react'
import { connect } from 'dva';
import { Card, Select, InputNumber, Form } from 'antd'

import { isValidateStatusNumberPeople, isValidateStatus} from '../utils/isValidation'

const Option = Select.Option;
const FormItem = Form.Item;

class StepOne extends Component {
    handleChangeForm = (name) =>{
        return (e) =>{
            let payload = {}

            if(name === 'number_people'){
                let data = isValidateStatusNumberPeople(e, name)
                payload = {
                    ...data
                }
            }else{
                let data = isValidateStatus(e, name, 'No Selected', ['validation_meal', 'message_meal'])
                let { number_people, validation_number_people, message_number_people } = this.props.order.activeRecord
                payload = {
                    ...data, number_people, validation_number_people, message_number_people, orderList:[]
                }
            }
            this.props.dispatch({
                type: 'order/updateFormInput',
                payload,
                reset:name === 'meal' ? true : false
            })
        }
    }

    
    render() {
        const formItemLayout = {
            wrapperCol: { span: 5 },
        };

        let { validation_number_people, message_number_people,
            message_meal, validation_meal,
             meal, number_people } = this.props.order.activeRecord

        return (
            <Card title="Step 1" style={{ flex: 1 }}>
                <Form layout='vertical'>
                    <div>
                        <FormItem {...formItemLayout} label="Please Select a meal" validateStatus={validation_meal} help={message_meal}>
                            <Select  value={meal || '---'} onChange={this.handleChangeForm('meal')} >
                                <Option value="lunch">lunch</Option>
                                <Option value="dinner">dinner</Option>
                                <Option value="breakfast">breakfast</Option>
                            </Select>
                        </FormItem>
                        
                    </div>
                    
                    <div style={{marginTop:20}}>
                        <FormItem {...formItemLayout} label="Please Enter Number of people" validateStatus={validation_number_people} help={message_number_people}>
                            <InputNumber value={number_people || 0} onChange={this.handleChangeForm('number_people')} />
                        </FormItem>
                    </div>
                </Form>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    order:state.order
})


export default connect(mapStateToProps)(StepOne)


