import React from 'react'
import Layout from '../components/Layout'
// import TabBottom from '../components/TabBottom'
import { Button } from 'antd-mobile'; 
// import { imgBase }  from '../utils'
import Router from 'next/router'
// import '../static/less/error.less'
export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }
  toIndex() {
    Router.back();
  }
  render() {
    return (
      <Layout>
        <div className="error-box">
          <p>非常抱歉 页面加载错误啦</p>
          <Button prefixCls="error_back" onClick={() => this.toIndex()}>点击重试</Button>
        </div>
      </Layout>
    )
  }
}