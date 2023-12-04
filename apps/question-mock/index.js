const Koa = require("koa")
const Router = require("koa-router")
const mockList = require("./mock/index")

const app = new Koa()
const router = new Router()

async function getRes(fn, ctx) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const res = fn(ctx)
            resolve(res)
        }, 1000)
    })
}

// 注册 mock 路由
mockList.forEach((item) => {
    const { url, method, response } = item
    router[method](url, async (ctx) => {
        // const res = response()
        if (url === "/api/user/register" || url === "/api/user/login") {
            ctx.body = await getRes(response, ctx)
        } else {
            const token = ctx.request.headers["authorization"]
            if (token && token.startsWith("Bearer ")) {
                const actualToken = token.substring(7)
                // 使用 actualToken 进行后续处理
                if (actualToken) {
                    // 模拟网络请求的加载状态，1s
                    ctx.body = await getRes(response, ctx) // 输入结果
                }
            }
        }
    })
})

app.use(router.routes())
app.listen(3001) // port 端口
