import React, { Component } from 'react'
import { connect } from 'dva';
import { translate } from "react-i18next";
import { Tabs,Button,Card } from 'antd';
import styles from './IndexPage.css';
import OrderForm from './OrderForm'
import OrderList from './OrderList'

const TabPane = Tabs.TabPane;


export class IndexPage extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      activeTab:'1'
    }

  }

  onChangeTab = (key)=>{
    this.setState({activeTab:key})
  }

  onChangeLang = (value) =>{
    return ()=>{
      this.props.i18n.changeLanguage(value)
    }
    
  }

  render() {
    const { t, i18n } = this.props;


    return (
      <div className={styles.normal}>
        <div className={styles.container} >
          <Tabs onChange={this.onChangeTab} activeKey={this.state.activeTab} type="card">
            <TabPane tab={t("Order Form")} key="1">
              <OrderForm onChangeTab={this.onChangeTab} />
            </TabPane>
            <TabPane tab={t("Order List")} key="2">
              {
                this.props.order.record.length === 0 ? (
                  <div style={{textAlign:'center',marginTop:100,marginBottom:100}}>
                    <h3>{t("No Data")}</h3>
                  </div>
                ): (
                    <OrderList />
                )
              }
             
            </TabPane>
          </Tabs>
          <Card style={{marginTop:50}} >
            <p>{t("Translate")}</p>
            <Button type={i18n.language === 'en' ? 'primary' : ''} size="small" onClick={this.onChangeLang('en')}>English</Button>
            <Button type={i18n.language === 'fil' ? 'primary' : ''} size="small" onClick={this.onChangeLang('fil')} >Tagalog</Button>
          </Card>
          
        </div>

      
    
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  order: state.order
})


export default connect(mapStateToProps)(translate("translations")(IndexPage))


