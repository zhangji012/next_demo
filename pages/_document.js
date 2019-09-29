import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width,user-scalable=0,initial-scale=1,maximum-scale=1,minimum-scale=1,viewport-fit=cover"></meta>
          {/* <!-- antd 插件 高清解决方案 --> */}
          <script type="text/javascript" src="/static/asserts/antd-hd.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js" type="text/javascript"></script>
          <script src="https://f3-md.veimg.cn/common/js/bdtj.js" type="text/javascript"></script>
        </body>
      </Html>
    )
  }

}
export default MyDocument