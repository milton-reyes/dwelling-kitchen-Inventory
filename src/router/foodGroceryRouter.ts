import express from 'express';
import * as foodGroceryService from '../service/foodGroceryService';

export const foodGroceryRouter = express.Router();

foodGroceryRouter.get('', (request, response, next) => {
    //console.log("------------request");
    //console.log(response);
    foodGroceryService.getAllFoodGroceries().then(foodGrocery => {
        console.log("------------Get foodGrocery");
        console.log(foodGrocery);
        response.json(foodGrocery);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/*
    http://localhost:3000/foodGrocery/1
    Retrieves a single foodGrocery from the database by id
    If the foodGrocery does not exist, sends 404
*/
foodGroceryRouter.get('/:upcFood', (request, response, next) => {
    const upcFood = request.params.upcFood;
    foodGroceryService.getFoodGroceryByUpcFood(upcFood).then(foodGrocery => {
        if (!foodGrocery) {
            response.sendStatus(404);
        } else {
            response.json(foodGrocery);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/*
    POST http://localhost:3000/foodGrocery
    Creates a new foodGrocery and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
foodGroceryRouter.post('', (request, response, next) => {
    const foodGrocery = request.body;
    console.log("----------Post request foodGrocery");
    foodGroceryService.saveFoodGrocery(foodGrocery)
        .then(newFoodGrocery => {
            response.status(201);
            response.json(newFoodGrocery);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

/* PATCH is an HTTP method that serves as partial replacement */
foodGroceryRouter.patch('', (request, response, next) => {
    const foodGrocery = request.body;
    foodGroceryService.patchFoodGrocery(foodGrocery)
        .then(updatedfoodGrocery => {
            if(updatedfoodGrocery) {
                response.json(updatedfoodGrocery);
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