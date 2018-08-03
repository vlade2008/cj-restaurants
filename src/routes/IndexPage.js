import React, { Component } from 'react'
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Tabs } from 'antd';
import OrderForm from './OrderForm'
import OrderList from './OrderList'

const TabPane = Tabs.TabPane;


export class IndexPage extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      activeTab:'2'
    }

  }

  onChangeTab = (key)=>{
    this.setState({activeTab:key})
  }

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.container} >
          <Tabs onChange={this.onChangeTab} activeKey={this.state.activeTab} type="card">
            <TabPane tab="Order Form" key="1">
              <OrderForm onChangeTab={this.onChangeTab} />
            </TabPane>
            <TabPane tab="Order List" key="2">
              <OrderList />
            </TabPane>
          </Tabs>
        </div>

      </div>
    )
  }
}



export default connect()(IndexPage)


