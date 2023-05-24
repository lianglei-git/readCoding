import Koa from "koa";
import serve from "koa-static";
import https from "https";
import http from "http";
import Cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
import path from "path";
import { readFileSync } from "node:fs";
import router from './routes.js'



// const sslOptions = {
//   key: readFileSync(
//     path.resolve(__dirname, "../www.sparrowui.cn_nginx/www.sparrowui.cn.key")
//   ),
//   cert: readFileSync(
//     path.resolve(
//       __dirname,
//       "../www.sparrowui.cn_nginx/www.sparrowui.cn_bundle.crt"
//     )
//   ),
// };

const app = new Koa();
app.use(bodyParser())
app.use(Cors())
app.use(router.routes())

// Serve static files from the "public" directory
app.use(
  serve("../dist", {
    setHeaders(res) {
      // Cross-Origin-Embedder-Policy: require-corp
      res.setHeader("siu", "Mei Cuo!");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
      return res;
    },
  })
);

// https.createServer(sslOptions, app.callback()).listen(28256, () => {
//   console.log("Server is listening on port 28256");
// });

http.createServer(app.callback()).listen(28256, () => {
  console.log("Server is listening on port 28256");
});

