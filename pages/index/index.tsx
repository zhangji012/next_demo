import Head from 'next/head'
import React, { Component } from 'react'
import '../../static/less/app.less'
import { Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Props } from './type'

class Home extends Component<Props> {
  render() {
    const { counter, increment } = this.props

    return (
      <div>
        <Head>
          <title>My page title</title>

          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <p>Hello world! {counter} </p>
        <Button type="primary" onClick={() => increment()}>primary disabled</Button>
        <img src="/static/img/error_icon.png"></img>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  counter: state.counter
})

const mapDispatchToProps = ({ counter }) => ({
  increment: () => counter.increment(1)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
