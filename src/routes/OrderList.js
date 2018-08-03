import React from 'react';
import { connect } from 'dva';
import { List,  Row, Col } from 'antd';
import { translate } from "react-i18next";
import _ from 'lodash'

function OrderList(props) {
    const { t} = props;
    return (
        <List
            itemLayout="vertical"
            size="large"
            dataSource={props.order.record}
            renderItem={(item,i) => (
                <List.Item key={i}  >

                    <Row>
                        <Col span={6} offset={2}  >
                            <Row>
                                <Col span={10} offset={1}>
                                    <p style={{ fontSize: 15 }} >{t("Meal")}:</p>
                                </Col>
                                <Col span={8} offset={4}>
                                    <h3>{item.meal}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10} offset={1}>
                                    <p style={{ fontSize: 15 }} >{t("No. of People")}:</p>
                                </Col>
                                <Col span={8} offset={4}>
                                    <h3>{item.number_people}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10} offset={1}>
                                    <p style={{ fontSize: 15 }} >{t("Restaurant")}:</p>
                                </Col>
                                <Col span={8} offset={4}>
                                    <h3>{item.restaurant}</h3>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={6} offset={2} >
                            <Row>
                                <Col span={18} >
                                    <p style={{ fontSize: 15 }} >{t("Dishes")}:</p>
                                    <table style={{ width: '100%', textAlign: 'center' }} border={1} >
                                        <thead>
                                            <tr>
                                                <th>{t("Dishes")}</th>
                                                <th>{t("No. Serving")}</th>
                                            </tr>
                                        </thead>


                                        <tbody>
                                            {
                                                _.map(item.orderList, (items, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{items.dish}</td>
                                                            <td>{items.serving} </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>



                                    </table>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    
                    
                </List.Item>
            )}
        />
    );
}

const mapStateToProps = (state) => ({
    order: state.order
})


export default connect(mapStateToProps)(translate("translations")(OrderList))
