import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col } from 'antd'
import _ from 'lodash'

export class Review extends Component {
  render() {

      let { meal, number_people, restaurant, orderList} = this.props.order.activeRecord

    return (
        <Card title="Review" style={{ flex: 1 }}>
            <Row>
                <Col span={4} offset={4}>
                    <p style={{fontSize:15}} >Meal:</p>
                </Col>
                <Col span={4}>
                    <h3>{meal}</h3>
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={4}>
                    <p style={{ fontSize: 15 }} >No. of People:</p>
                </Col>
                <Col span={4}>
                    <h3>{number_people}</h3>
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={4}>
                    <p style={{ fontSize: 15 }} >Restaurant:</p>
                </Col>
                <Col span={4}>
                    <h3>{restaurant}</h3>
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={4}>
                    <p style={{ fontSize: 15 }} >Dishes:</p>
                </Col>
                <Col span={12}>
                    <table style={{ width: '100%', textAlign: 'center' }} border={1} >
                        <thead>
                            <tr>
                                <th>Dish</th>
                                <th>No. Serving</th>
                            </tr>
                        </thead>


                        <tbody>
                            {
                                _.map(orderList, (item, i) => {
                                    let dishSplit = item.dish.split('-')
                                    return (
                                        <tr key={i}>
                                            <td>{dishSplit[0]}</td>
                                            <td>{item.serving} </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>



                    </table>
                </Col>
            </Row>
        </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  order:state.order
})


export default connect(mapStateToProps)(Review)
