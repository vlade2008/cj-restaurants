import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Tabs } from 'antd';
import OrderForm from './OrderForm'
import OrderList from './OrderList'

const TabPane = Tabs.TabPane;

function IndexPage() {


  return (
    <div className={styles.normal}>
      <div className={styles.container} >
        <Tabs type="card">
          <TabPane tab="Order Form" key="1">
            <OrderForm />
          </TabPane>
          <TabPane tab="Order List" key="2">
            <OrderList />
          </TabPane>
        </Tabs>
      </div>
      
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
