import Express from 'express';

const app = Express();
const port = 8080;

app.use('/', Express.static('./dist/'));
app.listen(port, () => console.log(`Open http://localhost:${port}/prod/ or http://localhost:${port}/dev/`));