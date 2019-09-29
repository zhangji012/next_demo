const next = require('next')
const Koa = require('koa')
// const logger = require('koa-logger')
const Router = require('koa-router')
// lru-cache 用于在内存中管理缓存数据，并且支持LRU算法。可以让程序不依赖任何外部数据库实现缓存管理
// https://segmentfault.com/a/1190000012939607
const LRUCache = require('lru-cache')
const proxy = require('koa-server-http-proxy')

const port = parseInt(process.env.PORT, 10) || 8000
const dev = process.env.NODE_ENV !== 'production'
const test = process.env.NODE_TEST === 'test'
const app = next({ dev })
const handle = app.getRequestHandler()
var axios = require('axios')
const proxyTable = {
  '/openapi': {
    target: 'http://index-api.meadin.com',
    // target: dev ? 'http://10.10.29.205:7080' : 'http://index-api.meadin.com',
    // target: dev ? 'http://localhost:8081' : 'http://index-api.meadin.com',
    // target: dev ? 'http://10.10.29.235:8081' : (test ? 'http://10.10.29.235:8081' : 'http://index-api.meadin.com'),
    // target: dev ? 'http://10.10.29.205:7080' : (test ? 'http://10.10.29.205:7080' : 'http://index-api.meadin.com'),
    // target: 'http://10.10.29.117:8081',
    // pathRewrite: { '^/json': '' },
    changeOrigin: true
  },
  '/connect': {
    target: 'https://open.weixin.qq.com',
    // pathRewrite: { '^/json': '' },
    changeOrigin: true
  }
}


// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1hour
})

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(ctx) { return ctx.url }
function renderAndCache(ctx, pagePath, noCache, queryParams = null) {
  queryParams = ctx.query;
  if (dev || test) ssrCache.reset()
  if (noCache === 'noCache') {
    return app.renderToHTML(ctx.req, ctx.res, pagePath, queryParams)
      .then((html) => {
        // Let's cache this page
        console.info('no cache')
        ctx.body = html
      })
      .catch((err) => {
        console.info('ERRR', err)
        return app.renderError(err, ctx.req, ctx.res, pagePath, queryParams)
      })
  } else {
    const key = getCacheKey(ctx.req)
    // If we have a page in the cache, let's serve it
    if (ssrCache.has(key)) {
      console.info(`CACHE HIT: ${key}`)
      ctx.body = ssrCache.get(key)
      return Promise.resolve()
    }
  
    // If not let's render the page into HTML
    return app.renderToHTML(ctx.req, ctx.res, pagePath, queryParams)
      .then((html) => {
        // Let's cache this page
        console.info(`CACHE MISS: ${key}`)
        ssrCache.set(key, html)
        ctx.body = html
      })
      .catch((err) => {
        console.info('ERRR', err)
        return app.renderError(err, ctx.req, ctx.res, pagePath, queryParams)
      })
  }

  
}
app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router();
    // server.use(logger())
    // if (dev && proxyTable) {
    if (proxyTable) {
      Object.keys(proxyTable).forEach((context) => {
        server.use(proxy(context, proxyTable[context]))
      })
    }
    // router.get('/', async ctx => {
    //   await app.render(ctx.req, ctx.res, '/index', ctx.query)
    //   ctx.respond = false
    // })
   
    router.get('/', async (ctx) => await renderAndCache(ctx, '/index'))
    router.get('/guanzhu', async (ctx) => await renderAndCache(ctx, '/guanzhu'))
    router.get('/hotelrankings/:id', async (ctx) => await renderAndCache(ctx, '/hotelrankings'))
    router.get('/hotelrankings', async (ctx) => await renderAndCache(ctx, '/hotelrankings'))
    router.get('/brandrankings', async (ctx) => await renderAndCache(ctx, '/brandrankings'))
    router.get('/brandpage/:id', async (ctx) => await renderAndCache(ctx, '/brandpage'))
    router.get('/brandpage', async (ctx) => await renderAndCache(ctx, '/brandpage'))
    router.get('/hotelPage/:id', async (ctx) => await renderAndCache(ctx, '/hotelPage'))
    router.get('/hotelPage', async (ctx) => await renderAndCache(ctx, '/hotelPage'))
    router.get('/pk', async (ctx) => await renderAndCache(ctx, '/pk'))
    router.get('/brandindex/:id', async (ctx) => await renderAndCache(ctx, '/brandindex'))
    router.get('/hotelindex/:id', async (ctx) => await renderAndCache(ctx, '/hotelindex'))
    router.get('/brandcomment/:id', async (ctx) => await renderAndCache(ctx, '/brandcomment'))
    router.get('/mediabrandcomment/:id/:pageNum', async (ctx) => await renderAndCache(ctx, '/mediabrandcomment'))
    router.get('/brandcomment/:id/:pageNum', async (ctx) => await renderAndCache(ctx, '/brandcomment'))
    router.get('/hotelcomment/:id', async (ctx) => await renderAndCache(ctx, '/hotelcomment'))
    router.get('/hotelcomment/:id/:pageNum', async (ctx) => await renderAndCache(ctx, '/hotelcomment'))
    // router.get('/test', async (ctx) => await renderAndCache(ctx, '/test'))
    router.get('/test2', async (ctx) => {
      const {res} = ctx;
      ctx.body = 'test2'
    })
    // 获取token openId
    // router.get('/test1', async (ctx) => {
    //   console.log(`/test1`);
    //   const { request: req, response: res } = ctx;
    //   const config = {
    //     AppID: 'wx3a7e5f5744892215',
    //     AppSecret: 'a73a3a85e0bfbc69466d78acf3e43c22',
    //   }
    //   var AppID = config.AppID;
    //   var return_uri = `http://202.101.161.222:8000/wxtest`;
    //   var scope = 'snsapi_base' 

    //   const data = encodeURI(`?appid=${AppID}&redirect_uri=${return_uri}&response_type=code&scope=${scope}&state=123456#wechat_redirect`)
    //   const urlData = `https://open.weixin.qq.com/connect/oauth2/authorize${data}`
    //    res.redirect(urlData)
    // })
    // router.get('/wxtest', async (ctx, next) => {
    //   const { request: req, response: res } = ctx
    //   var code = req.url.split("/wxtest?")[1];
    //   console.log({code});
    //   const config = {
    //     AppID: 'wx3a7e5f5744892215',
    //     AppSecret: 'a73a3a85e0bfbc69466d78acf3e43c22',
    //   }
    //   const urls = `https://api.weixin.qq.com/sns/oauth2/access_token`;
    //   const dataT = encodeURI(`?appid=${config.AppID}&secret=${config.AppSecret}&${code}&grant_type=authorization_code`)
      
    //   const a = await axios.get(urls+dataT).then((res) => {
    //     if (res.status === 200) {
    //       return res.data
    //     }
          
    //   }).then(async (res) => {
    //     console.info(`openId：---------`)
    //     console.log(res.openid);
    //     return await axios.get(`http://10.10.29.205:7080/openapi/rest/v1/cn.meadin.open/user/save_open.get?openId=${res.openid}`).then(res => {
    //       console.log(res);
    //       return res;
    //     }).catch((err) => {
    //       console.log(err);
    //       return err.message
    //     })
    //   })
    //   ctx.type = 'json';
    //   res.redirect("/brandrankings?id=121233")
    // })

    server.use(router.routes())
    server.use(async (ctx) => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })
    server.use(router.allowedMethods());

    server.listen(port, (err) => {
      if (err) throw err
      console.info(`> Ready on http://localhost:${port}`)
    })
  })
