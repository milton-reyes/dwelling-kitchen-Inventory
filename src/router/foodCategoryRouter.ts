import express from 'express';
import * as foodCategoryService from '../service/foodCategoryService';

export const foodCategoryRouter = express.Router();

foodCategoryRouter.get('', (request, response, next) => {
    foodCategoryService.getAllFoodCategories().then(foodCategory => {
        response.json(foodCategory);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/*
    http://localhost:3000/foodCategory/1
    Retrieves a single foodCategory from the database by id
    If the foodCategory does not exist, sends 404
*/
foodCategoryRouter.get('/:id', (request, response, next) => {
    const id = +request.params.categoryId;
    foodCategoryService.getFoodCategoryById(id).then(foodCategory => {
        if (!foodCategory) {
            response.sendStatus(404);
        } else {
            response.json(foodCategory);
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

foodCategoryRouter.get('/:upcFood', (request, response, next) => {
    const upcFood = request.params.upcFood;
    foodCategoryService.getFoodCategoryByUpcFood(upcFood).then(foodCategory => {
        if (!foodCategory) {
            response.sendStatus(404);
        } else {
            response.json(foodCategory);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/*
    POST http://localhost:3000/foodCategory
    Creates a new foodCategory and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
foodCategoryRouter.post('', (request, response, next) => {
    const foodCategory = request.body;
    foodCategoryService.saveFoodCategory(foodCategory)
        .then(newFoodCategory => {
            response.status(201);
            response.json(newFoodCategory);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

/* PATCH is an HTTP method that serves as partial replacement */
foodCategoryRouter.patch('', (request, response, next) => {
    const foodCategory = request.body;
    foodCategoryService.patchFoodCategory(foodCategory)
        .then(updatedfoodCategory => {
            if(updatedfoodCategory) {
                response.json(updatedfoodCategory);
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