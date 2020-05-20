import express from 'express';
import * as foodStorageService from '../service/foodStorageService';

export const foodStorageRouter = express.Router();

foodStorageRouter.get('', (request, response, next) => {
    foodStorageService.getAllFoodStorages().then(foodStorage => {
        response.json(foodStorage);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/*
    http://localhost:3000/foodStorage/1
    Retrieves a single foodStorage from the database by id
    If the foodStorage does not exist, sends 404
*/
foodStorageRouter.get('/:id', (request, response, next) => {
    const id = +request.params.storageId;
    foodStorageService.getFoodStorageById(id).then(foodStorage => {
        if (!foodStorage) {
            response.sendStatus(404);
        } else {
            response.json(foodStorage);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/*

*/

foodStorageRouter.get('/:upcFood', (request, response, next) => {
    const upcFood = request.params.upcFood;
    foodStorageService.getFoodStorageByUpcFood(upcFood).then(foodStorage => {
        if (!foodStorage) {
            response.sendStatus(404);
        } else {
            response.json(foodStorage);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/*
    POST http://localhost:3000/foodStorage
    Creates a new foodStorage and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
foodStorageRouter.post('', (request, response, next) => {
    const foodStorage = request.body;
    foodStorageService.saveFoodStorage(foodStorage)
        .then(newFoodStorage => {
            response.status(201);
            response.json(newFoodStorage);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

/* PATCH is an HTTP method that serves as partial replacement */
foodStorageRouter.patch('', (request, response, next) => {
    const foodStorage = request.body;
    foodStorageService.patchFoodStorage(foodStorage)
        .then(updatedfoodStorage => {
            if(updatedfoodStorage) {
                response.json(updatedfoodStorage);
            } else {
                response.sendStatus(404);
            }
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
        }).finally(() => {
            next();
        })
});