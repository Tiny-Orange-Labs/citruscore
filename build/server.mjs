import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';

const app = Express();
const port = 3000;
const urls = [
    `http://localhost:${port}/prod/`,
    `http://localhost:${port}/dev/`,
    `http://localhost:${port}/unit-tests/`,
];

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
app.use('/unit-tests/', Express.static('./test/unit-tests'));
app.use('/unit-tests/', Express.static('./node_modules'));
app.listen(port, () => console.log(`Open ${urls.join(', ')} in your browser`));