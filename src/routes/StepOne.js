import React, { Component } from 'react'
import { connect } from 'dva';
import { Card, Select, InputNumber, Form } from 'antd'
import _ from 'lodash'
const Option = Select.Option;
const FormItem = Form.Item;

class StepOne extends Component {
    constructor(props){
        super(props)

        this.state = {
            number_people:0,
            validation:'',
            message:''
        }
    }

    handleNumberChange = (e) =>{
        this.setState({
            number_people: e
        },()=>{
            this.isValidateStatus()
        })
        
    }

    isValidateStatus = () =>{
        if( this.state.number_people === 0 || _.isEmpty(this.state.number_people.toString()) ){
            this.setState({
                validation:'error',
                message:'Please input a number'

            })
        }else if(this.state.number_people > 10){
            this.setState({
                validation: 'error',
                message: 'Maximum 10'

            })
        }else{
            this.setState({
                validation: 'success',
                message: ''
            })
        }
    }
    
    render() {
        const formItemLayout = {
            wrapperCol: { span: 5 },
        };
        return (
            <Card style={{ flex: 1 }}>
                <Form layout='vertical'>
                    <div>
                        <FormItem {...formItemLayout} label="Please Select a meal">
                            <Select defaultValue="Please Select"  >
                                <Option value="lunch">lunch</Option>
                                <Option value="dinner">dinner</Option>

                            </Select>
                        </FormItem>
                        
                    </div>
                    
                    <div style={{marginTop:20}}>
                        <FormItem {...formItemLayout} label="Please Enter Number of people" validateStatus={this.state.validation} help={this.state.message}>
                            <InputNumber value={this.state.number_people} onChange={this.handleNumberChange} />
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


