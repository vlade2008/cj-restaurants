import React, { Component } from 'react'
import { connect } from 'dva'
import { Card, Select, Form, InputNumber, Button, Icon, Modal } from 'antd'
import _ from 'lodash'
import { translate } from 'react-i18next'

import { isValidateStatus } from '../utils/isValidation'

const Option = Select.Option
const FormItem = Form.Item
const dataDishes = require('../../data/dishes.json')

class StepThree extends Component {
	constructor(props) {
		super(props)

		this.state = {
			dish: '',
			serving: 1,
		}
	}

	handleChangeForm = name => {
		return e => {
			this.setState({
				[name]: e,
			})
		}
	}

	handleAddOrder = () => {
		let { t } = this.props

		let data_dish = isValidateStatus(this.state.dish, 'dish', t('No Selected'), [
			'validation_dish',
			'message_dish',
		])
		let data_serving = isValidateStatus(
			this.state.serving,
			'serving',
			t('Please input a number'),
			['validation_serving', 'message_serving']
		)

		this.setState(
			{
				...data_dish,
				...data_serving,
			},
			() => {
				if (
					data_dish.validation_dish === 'success' &&
					data_serving.validation_serving === 'success'
				) {
					let payload = {
						dish: this.state.dish,
						serving: this.state.serving,
					}
					this.checkOrder(payload)
				}
			}
		)
	}

	checkOrder = data => {
		let { t } = this.props
		let cloneOrderList = _.clone(this.props.order.activeRecord.orderList)
		let isDuplicate = _.filter(cloneOrderList, _.matches({ dish: data.dish }))

		if (isDuplicate.length === 0) {
			cloneOrderList.push(data)

			let payload = {
				orderList: cloneOrderList,
			}

			this.setState(
				{
					dish: '',
					serving: 1,
				},
				() => {
					this.props.dispatch({
						type: 'order/updateFormInput',
						payload,
					})
				}
			)
		} else {
			Modal.warning({
				title: t('Warning'),
				content: t('Cannot select the same dish twice!'),
			})
		}
	}

	onRemove = data => {
		return () => {
			let cloneOrderList = _.clone(this.props.order.activeRecord.orderList)
			let newArray = _.filter(cloneOrderList, o => {
				if (!_.includes(o.dish, data.dish)) {
					return o
				}
			})
			let payload = {
				orderList: newArray,
			}

			this.props.dispatch({
				type: 'order/updateFormInput',
				payload,
			})
		}
	}

	render() {
		let { t } = this.props
		let { restaurant, meal, orderList } = this.props.order.activeRecord
		let {
			dish,
			serving,
			validation_dish,
			message_dish,
			validation_serving,
			message_serving,
		} = this.state

		let dishFiltered = []

		_.map(dataDishes.dishes, item => {
			let restaurantValue = restaurant.split('-')
			if (
				_.includes(item.availableMeals, meal) &&
				_.includes(item.restaurant, restaurantValue[0])
			) {
				dishFiltered.push(item)
			}
		})
		return (
			<Card title={t('Step 3')} style={{ flex: 1 }}>
				<Form layout="inline">
					<div>
						<FormItem validateStatus={validation_dish} help={message_dish}>
							<h3> {t('Please Select a Dish')} </h3>
							<Select value={dish || '---'} onChange={this.handleChangeForm('dish')}>
								{_.map(dishFiltered, (item, i) => {
									return (
										<Option key={`${item.name}-${item.id}`}>{item.name}</Option>
									)
								})}
							</Select>
						</FormItem>

						<FormItem
							validateStatus={validation_serving}
							help={message_serving}
							style={{ marginLeft: 20 }}
						>
							<h3>{t('Please enter no. of servings')}</h3>
							<InputNumber
								value={serving}
								onChange={this.handleChangeForm('serving')}
							/>
							<Button onClick={this.handleAddOrder} style={{ border: 'none' }}>
								<Icon
									style={{ fontSize: 24, color: '#1890ff' }}
									type="plus-circle-o"
								/>
							</Button>
						</FormItem>
					</div>
				</Form>
				<h3 style={{ marginTop: 10 }}>{t('List of Order')}</h3>
				<table style={{ width: '100%', textAlign: 'center' }} border={1}>
					<thead>
						<tr>
							<th>{t('Dish')}</th>
							<th>{t('No. Serving')}</th>
							<th>{t('Action')}</th>
						</tr>
					</thead>

					<tbody>
						{!_.isEmpty(orderList) ? (
							_.map(orderList, (item, i) => {
								let dishSplit = item.dish.split('-')
								return (
									<tr key={i}>
										<td>{dishSplit[0]}</td>
										<td>{item.serving} </td>
										<td>
											<Button
												style={{ border: 'none' }}
												onClick={this.onRemove(item)}
											>
												<Icon
													type="close-circle"
													style={{ fontSize: 24, color: '#f81d22' }}
												/>
											</Button>
										</td>
									</tr>
								)
							})
						) : (
							<tr>
								<td colSpan={3}>{t('No Data')}</td>
							</tr>
						)}
					</tbody>
				</table>
			</Card>
		)
	}
}

const mapStateToProps = state => ({
	order: state.order,
})
export default connect(mapStateToProps)(translate('translations')(StepThree))
