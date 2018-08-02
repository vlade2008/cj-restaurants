import React, { Component } from 'react'
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Steps,Button } from 'antd';

//component
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import Review from './Review'


const Step = Steps.Step;


class OrderForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            current:0
        }
    }

    next = () =>{
        const current = this.state.current + 1
        this.setState({
            current
        })
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
                                <Button type="primary" style={{ marginLeft: 5 }} onClick={this.next} >
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
  
})

export default connect(mapStateToProps)(OrderForm)
