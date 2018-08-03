import React, { Component } from 'react'
import { connect } from 'dva'
import { Steps, Button, Modal } from 'antd'
import _ from 'lodash'
import { translate } from 'react-i18next'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import Review from './Review'

import styles from './IndexPage.css'
import { isValidateStatusNumberPeople, isValidateStatus } from '../utils/isValidation'

const Step = Steps.Step

class OrderForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			current: 0,
		}
	}

	next = current => {
		this.setState({
			current,
		})
	}

	handleNext = () => {
		const current = this.state.current + 1
		let { t } = this.props
		let { meal, number_people, restaurant, orderList } = this.props.order.activeRecord

		switch (current) {
			case 1:
				let data_meal = isValidateStatus(meal, 'meal', t('No Selected'), [
					'validation_meal',
					'message_meal',
				])
				let data_number_people = isValidateStatusNumberPeople(
					number_people,
					'number_people',
					this.props.t
				)
				let payload = { ...data_meal, ...data_number_people }
				if (
					data_meal.validation_meal === 'success' &&
					data_number_people.validation_number_people === 'success'
				) {
					this.next(current)
				}
				this.props.dispatch({
					type: 'order/updateFormInput',
					payload,
				})
				break
			case 2:
				let data_restaurant = isValidateStatus(restaurant, 'restaurant', t('No Selected'), [
					'validation_restaurant',
					'message_restaurant',
				])
				if (data_restaurant.validation_restaurant === 'success') {
					this.next(current)
				}
				this.props.dispatch({
					type: 'order/updateFormInput',
					payload: data_restaurant,
				})
				break
			case 3:
				if (orderList.length !== 0) {

                    let total_order = 0
                    _.map(orderList, item => {
                        total_order = total_order + item.serving
                    })


                    if (total_order >= number_people && total_order <= 10 ){
                        this.next(current)
                    }else{
                        Modal.warning({
                            title: t('Warning'),
                            content: t('Total number of dishes should be greater or equal to the number of person and Maximum of 10 is allowed!'),
                        })
                    }
                    
					
				} else  {
                    Modal.warning({
                        title: t('Warning'),
                        content: t('Please select a order!'),
                    })
				}

				break
			default:
				console.log('renderStepComponent error')
		}
	}

	prev = () => {
		const current = this.state.current - 1
		this.setState({
			current,
		})
	}

	renderStepComponent = () => {
		switch (this.state.current) {
			case 0:
				return <StepOne />
			case 1:
				return <StepTwo />
			case 2:
				return <StepThree />
			case 3:
				return <Review />
			default:
				console.log('renderStepComponent error')
		}
	}

	onSubmit = () => {
		let { meal, number_people, restaurant, orderList } = this.props.order.activeRecord
		let cloneRecord = _.clone(this.props.order.record)

		let splitRestaurant = restaurant.split('-')

		let newOrderList = orderList.map(item => {
			let dish = item.dish.split('-')
			return {
				dish: dish[0],
				serving: item.serving,
			}
		})

		let payload = {
			meal,
			number_people,
			restaurant: splitRestaurant[0],
			orderList: newOrderList,
		}
		cloneRecord.push(payload)

		this.props.dispatch({
			type: 'order/updateRecord',
			payload: cloneRecord,
			callback: this.onResetValue,
		})
	}

	onResetValue = () => {
		this.setState(
			{
				current: 0,
			},
			() => {
				this.props.onChangeTab('2')
			}
		)
	}

	render() {
		const { t } = this.props
		const steps = [
			{ title: t('Step 1') },
			{ title: t('Step 2') },
			{ title: t('Step 3') },
			{ title: t('Review') },
		]
		return (
			<div className={styles.normal}>
				<div className={styles.container}>
					<Steps current={this.state.current}>
						{steps.map((Item, i) => {
							return <Step key={i} title={Item.title} />
						})}
					</Steps>

					<div style={{ marginTop: 25 }} />

					{this.renderStepComponent()}

					<div style={{ marginTop: 20 }}>
						<div style={{ float: 'left' }}>
							{this.state.current !== 0 ? (
								<Button type="primary" onClick={this.prev}>
									{t('Previous')}
								</Button>
							) : null}
						</div>

						<div style={{ float: 'right' }}>
							{this.state.current === 3 ? (
								<Button
									type="primary"
									style={{ marginLeft: 5 }}
									onClick={this.onSubmit}
								>
									{t('Submit')}
								</Button>
							) : (
								<Button
									type="primary"
									style={{ marginLeft: 5 }}
									onClick={this.handleNext}
								>
									{t('Next')}
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	order: state.order,
})

export default connect(mapStateToProps)(translate('translations')(OrderForm))
