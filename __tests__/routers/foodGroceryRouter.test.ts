import express from 'express';
import bodyParser from 'body-parser';
import { foodGroceryRouter } from '../../src/router/foodGroceryRouter';
import * as foodGroceryService from '../../src/service/foodGroceryService';
import request from 'supertest';

// Setup mock for foodGroceryService dependency
jest.mock('../../src/service/foodGroceryService');
const mockfoodGroceryService = foodGroceryService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/foodGroceries', foodGroceryRouter);

describe('GET /foodGroceries', () => {
    test('Returns normally under normal circumstances', async () => {
        mockfoodGroceryService.getAllFoodGroceries.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/foodGroceries')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockfoodGroceryService.getAllFoodGroceries.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/foodGroceries')
            .expect(500);
    });
});

describe('POST /foodGroceries', () => {
    test('Successful creation should return 201 status', async () => {
        mockfoodGroceryService.saveFoodGrocery.mockImplementation(async () => ({}));
        const payload = {
            food: 'Bread',
            upc_food: '007341001385Bread',
            notes: 'Multi Grain'
        };

        await request(app)
            .post('/foodGroceries')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockfoodGroceryService.saveFoodGrocery.mockImplementation(async () => {throw new Error()});

        const payload = {
            food: 'Bread',
            upc_food: '007341001385Bread',
            notes: 'Multi Grain'
        };

        await request(app)
            .post('/foodGroceries')
            .send(payload)
            .expect(500);
    });
});


// test GET /foodGroceries/:id
// 1. Write test that asserts that normal behavior should return a JSON payload with status 200
// 2. Write test that asserts if no object is returned (service returns falsy) status 404
// 3. Write test that asserts if service throws error, status 500

describe('GET /foodGroceries/:upcFood', () => {
    test('Normal behavior Json with status 200', async () => {
        mockfoodGroceryService.getFoodGroceryByUpcFood
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/foodGroceries/002529360039Soymilk')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockfoodGroceryService.getFoodGroceryByUpcFood
            .mockImplementation(async () => (0));

        await request(app)
            .get('/foodGroceries/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockfoodGroceryService.getFoodGroceryByUpcFood
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/foodGroceries/007341001385Bread')
            .expect(500)
    })
})