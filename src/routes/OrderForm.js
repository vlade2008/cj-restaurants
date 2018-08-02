import React, { Component } from 'react'
import { connect } from 'dva';
import { Steps,Button } from 'antd';

import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import Review from './Review'

import styles from './IndexPage.css';
import { isValidateStatusNumberPeople, isValidateStatus } from '../utils/isValidation'

const Step = Steps.Step;


class OrderForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            current:0
        }
    }

    next = (current) =>{
        this.setState({
            current
        })
    }

    handleNext = () =>{
        const current = this.state.current + 1

        let { meal, number_people, restaurant} = this.props.order.activeRecord

        switch(current){
            case 1:
                let data_meal = isValidateStatus(meal, 'meal', 'No Selected', ['validation_meal','message_meal'])
                let data_number_people = isValidateStatusNumberPeople(number_people, 'number_people')
                let payload = {...data_meal,...data_number_people}
                if (data_meal.validation_meal === 'success' && data_number_people.validation_number_people === 'success'){
                    this.next(current)
                }
                this.props.dispatch({
                    type: 'order/updateFormInput',
                    payload,
                })
                break;
            case 2:
                let data_restaurant = isValidateStatus(restaurant, 'restaurant', 'No Selected', ['validation_restaurant','message_restaurant'])
                if (data_restaurant.validation_restaurant === 'success') {
                    this.next(current)
                }
                this.props.dispatch({
                    type: 'order/updateFormInput',
                    payload: data_restaurant
                })
                break;
            default:
                console.log('renderStepComponent error')
        }

       
        
    }

    prev = () =>{
        const current = this.state.current - 1
        this.setState({
            current
        })
    }

    renderStepComponent = () =>{
            switch(this.state.current){
                case 0:
                    return (
                        <StepOne />
                    )
                case 1:
                    return (
                        <StepTwo />
                    )
                case 2:
                    return (
                        <StepThree />
                    )
                case 3:
                    return (
                        <Review />
                    )
                default:
                    console.log('renderStepComponent error')
            }
    }


  render() {
      const steps = [
          { title: 'Step 1' },
          { title: 'Step 2' },
          { title: 'Step 3' },
          { title: 'Review' },
      ];
    return (
        <div className={styles.normal}>
            <div className={styles.container} >
                <Steps current={this.state.current}  >

                    {
                        steps.map((Item,i)=>{
                            return(
                                <Step key={i} title={Item.title}  />
                            )
                        })
                    }
                </Steps>

                <div style={{marginTop:25}} >

                </div>

                {this.renderStepComponent()}



                <div style={{marginTop:20}} >
                    <div style={{float:'left'}} >
                        {
                            this.state.current !== 0 ? (
                                <Button type="primary" onClick={this.prev} >
                                    Previous
                            </Button>
                            ) : null
                        }
                    </div>
                    
                    <div style={{float:'right'}}>

                        {
                            this.state.current === 3 ? (
                                <Button type="primary" style={{ marginLeft: 5 }}  >
                                    Submit
                                </Button>
                            ): (
                                <Button type="primary" style={{ marginLeft: 5 }} onClick={this.handleNext} >
                                    Next
                                </Button>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  order:state.order
})

export default connect(mapStateToProps)(OrderForm)
