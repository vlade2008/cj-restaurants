import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col } from 'antd'
import _ from 'lodash'
import { translate } from 'react-i18next'
export class Review extends Component {
	render() {
		let { t } = this.props
		let { meal, number_people, restaurant, orderList } = this.props.order.activeRecord

		return (
			<Card title={t('Review')} style={{ flex: 1 }}>
				<Row>
					<Col span={4} offset={4}>
						<p style={{ fontSize: 15 }}>{t('Meal')}:</p>
					</Col>
					<Col span={4}>
						<h3>{meal}</h3>
					</Col>
				</Row>
				<Row>
					<Col span={4} offset={4}>
						<p style={{ fontSize: 15 }}>{t('No. of People')}:</p>
					</Col>
					<Col span={4}>
						<h3>{number_people}</h3>
					</Col>
				</Row>
				<Row>
					<Col span={4} offset={4}>
						<p style={{ fontSize: 15 }}>{t('Restaurant')}:</p>
					</Col>
					<Col span={4}>
						<h3>{restaurant}</h3>
					</Col>
				</Row>
				<Row>
					<Col span={4} offset={4}>
						<p style={{ fontSize: 15 }}>{t('Dishes')}:</p>
					</Col>
					<Col span={12}>
						<table style={{ width: '100%', textAlign: 'center' }} border={1}>
							<thead>
								<tr>
									<th>{t('Dishes')}</th>
									<th>{t('No. Serving')}</th>
								</tr>
							</thead>

							<tbody>
								{_.map(orderList, (item, i) => {
									let dishSplit = item.dish.split('-')
									return (
										<tr key={i}>
											<td>{dishSplit[0]}</td>
											<td>{item.serving} </td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</Col>
				</Row>
			</Card>
		)
	}
}

const mapStateToProps = state => ({
	order: state.order,
})
export default connect(mapStateToProps)(translate('translations')(Review))
