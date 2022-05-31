import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';

const app = Express();
const port = 3000;

app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json({ 
    limit: '5mb',
    type: 'application/json'
}));
app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true,
    parameterLimit: 5
}));
app.use(compression());
app.use('/', Express.static('./dist/'));
app.listen(port, () => console.log(`Open http://localhost:${port}/prod/ or http://localhost:${port}/dev/`));