import express from 'express';
import * as foodBrandService from '../service/foodBrandsService';

export const foodBrandRouter = express.Router();

foodBrandRouter.get('', (request, response, next) => {
    foodBrandService.getAllFoodBrands().then(foodBrand => {
        response.json(foodBrand);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/*
    http://localhost:3000/foodBrand/1
    Retrieves a single foodBrand from the database by id
    If the foodBrand does not exist, sends 404
*/
foodBrandRouter.get('/:id', (request, response, next) => {
    const id = +request.params.brandId;
    foodBrandService.getFoodBrandById(id).then(foodBrand => {
        if (!foodBrand) {
            response.sendStatus(404);
        } else {
            response.json(foodBrand);
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

foodBrandRouter.get('/:upcFood', (request, response, next) => {
    const upcFood = request.params.upcFood;
    foodBrandService.getFoodBrandByUpcFood(upcFood).then(foodBrand => {
        if (!foodBrand) {
            response.sendStatus(404);
        } else {
            response.json(foodBrand);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/*
    POST http://localhost:3000/foodBrand
    Creates a new foodBrand and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
foodBrandRouter.post('', (request, response, next) => {
    const foodBrand = request.body;
    foodBrandService.saveFoodBrand(foodBrand)
        .then(newFoodBrand => {
            response.status(201);
            response.json(newFoodBrand);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

/* PATCH is an HTTP method that serves as partial replacement */
foodBrandRouter.patch('', (request, response, next) => {
    const foodBrand = request.body;
    foodBrandService.patchFoodBrand(foodBrand)
        .then(updatedfoodBrand => {
            if(updatedfoodBrand) {
                response.json(updatedfoodBrand);
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