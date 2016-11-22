const Koa = require(`koa`);
const bodyParser = require(`koa-bodyparser`);
const app = new Koa();
const controller = require(`./controller`);

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
});

// router.get(`/`, async (ctx, next) => {
//     ctx.response.body = `<h1>This is the root</h1>`;
// });

// router.get(`/:name`, async (ctx, next) => {
//     var name = ctx.params.name;
//     ctx.response.body = `<h1>Hello, ${name}!</h1>`;
// })

app.use(bodyParser());

app.use(controller());

app.listen(3000);