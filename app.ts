import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes/articles'; 

const app = new Koa();

app.use(bodyParser());

// 加入路由
app.use(router.routes());
app.use(router.allowedMethods());

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
