const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const morganConfig = morgan((tokens, req, res) => {
    return [
        chalk.green.bold(tokens.method(req, res)),
        chalk.red.bold(tokens.status(req, res)),
        chalk.white(tokens.url(req, res)),
        chalk.yellow(tokens['response-time'](req, res) + ' ms'),
    ].join(' ');
});

app.use(morganConfig);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap/dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap/dist', 'js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery/dist')));

app.set('views', path.join('src', 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', {list: ['Library', 'Book'], title: 'EJS'});
});

app.listen(port, () => {
    (debug(`Server is running on  ${chalk.green(port)}`));
});