import Koa from "koa";
import serve from "koa-static";
import https from "https";
import path from "path";
import { readFileSync } from "node:fs";

const sslOptions = {
  key: readFileSync(
    path.resolve(__dirname, "../www.sparrowui.cn_nginx/www.sparrowui.cn.key")
  ),
  cert: readFileSync(
    path.resolve(
      __dirname,
      "../www.sparrowui.cn_nginx/www.sparrowui.cn_bundle.crt"
    )
  ),
};

const app = new Koa();

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

https.createServer(sslOptions, app.callback()).listen(28256, () => {
  console.log("Server is listening on port 28256");
});
