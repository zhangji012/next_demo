
1. 当服务渲染时，getInitialProps将会把数据序列化，就像JSON.stringify。所以确保getInitialProps返回的是一个普通 JS 对象，而不是Date, Map 或 Set类型。

当页面初始化加载时，getInitialProps只会加载在服务端。只有当路由跳转（Link组件跳转或 API 方法跳转）时，客户端才会执行getInitialProps。

注意：getInitialProps将不能使用在子组件中。只能使用在pages页面中。

2. dynamic动态导入，默认支持ssr，可以设置不支持
3. 
