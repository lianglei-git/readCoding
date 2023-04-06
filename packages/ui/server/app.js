const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();

// Serve static files from the "public" directory
app.use(serve('../dist', {
    setHeaders(res) {
      // Cross-Origin-Embedder-Policy: require-corp
      res.setHeader('siu','Mei Cuo!')
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
        res.setHeader('Cross-Origin-Resource-Policy' ,'same-origin' )
        return res;
    }
}));

// Start the server
app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});