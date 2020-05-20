import express from 'express';
import * as foodRetailerService from '../service/foodRetailerService';

export const foodRetailerRouter = express.Router();

foodRetailerRouter.get('', (request, response, next) => {
    foodRetailerService.getAllFoodRetailers().then(foodRetailer => {
        response.json(foodRetailer);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/*
    http://localhost:3000/foodRetailer/1
    Retrieves a single foodRetailer from the database by id
    If the foodRetailer does not exist, sends 404
*/
foodRetailerRouter.get('/:id', (request, response, next) => {
    const id = +request.params.retailerId;
    foodRetailerService.getFoodRetailerById(id).then(foodRetailer => {
        if (!foodRetailer) {
            response.sendStatus(404);
        } else {
            response.json(foodRetailer);
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

foodRetailerRouter.get('/:upcFood', (request, response, next) => {
    const upcFood = request.params.upcFood;
    foodRetailerService.getFoodRetailerByUpcFood(upcFood).then(foodRetailer => {
        if (!foodRetailer) {
            response.sendStatus(404);
        } else {
            response.json(foodRetailer);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/*
    POST http://localhost:3000/foodRetailer
    Creates a new foodRetailer and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
foodRetailerRouter.post('', (request, response, next) => {
    const foodRetailer = request.body;
    foodRetailerService.saveFoodRetailer(foodRetailer)
        .then(newFoodRetailer => {
            response.status(201);
            response.json(newFoodRetailer);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

/* PATCH is an HTTP method that serves as partial replacement */
foodRetailerRouter.patch('', (request, response, next) => {
    const foodRetailer = request.body;
    foodRetailerService.patchFoodRetailer(foodRetailer)
        .then(updatedfoodRetailer => {
            if(updatedfoodRetailer) {
                response.json(updatedfoodRetailer);
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