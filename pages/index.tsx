import Head from 'next/head'
import '../static/less/app.less'


export default () =>
  <div>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <p>Hello world! </p>
    <img src="/static/img/error_icon.png"></img>
  </div>