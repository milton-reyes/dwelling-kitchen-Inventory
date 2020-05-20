import express from 'express';
const path = require('path');

export const indexRouter = express.Router();

indexRouter.get('', (request, response, next) => {
    // response.send('Hello');
    response.sendFile('index.html', {
        root: path.join(__dirname, '../../web')
    })
});

indexRouter.get('/poststuff', (request, response, next) => {
    response.sendFile('form.html', {
        root: path.join(__dirname, '../../web')
    })
});