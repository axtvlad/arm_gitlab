import express, {Request, Response} from 'express';
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import RoutesRestApi from './routes/RoutesRestApi';
import i18n from 'i18n';
import cookieParser from 'cookie-parser';
import Initial from './initial';

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = +process.env.PORT || 8080;

i18n.configure({
    defaultLocale: 'ru',
    queryParameter: 'locale',
    locales: ['ru', 'en', 'kz'],
    autoReload: true,
    syncFiles: true,
    directory: __dirname + '/locales',
});

app.use(cookieParser());

/*
app.use(function (req, res, next) {
    // check if client sent cookie
    let cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        // no: set a new cookie
        let randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie('cookieName', randomNumber, {maxAge: 900000, httpOnly: false});
        console.log('cookie created successfully');
    } else {
        // yes, cookie was already present
        console.log('cookie exists', cookie);
    }
    next(); // <-- important!
});

// let static middleware do its job
app.use(express.static(__dirname + '/public'));

 */


app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
}));
app.use(i18n.init);
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

/**
 * Routes REST API
 */
app.use(process.env.REST_API, RoutesRestApi);

app.get('*', (req: Request, res: Response) => {
    return res.status(500).send({
        errorCode: 13,
        message: 'Invalid request method',
    });
});

createConnection()
    .then(() => {
        new Initial();

        app.listen(port, err => {
            if (err) {
                return console.error(err);
            }

            return console.log(`Application is listening on ${port}`);
        });
    })
    .catch(err => console.error('TypeORM connection error: ', err));
