import express from 'express';
import * as groceryService from '../service/groceryService';

export const groceryRouter = express.Router();

groceryRouter.get('', (request, response, next) => {
    groceryService.getAllGroceries().then(grocery => {
        console.log("------------Get grocery");
        console.log(grocery);
        response.json(grocery);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});


/*
    POST http://localhost:3000/grocery
    Creates a new grocery and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
//groceryRouter.post('', (request, response, next) => {
//    const grocery = request.body;
//    console.log("----------Post request grocery");
//    groceryService.saveFoodGrocery(grocery)
//        .then(newFoodGrocery => {
//            response.status(201);
//            response.json(newFoodGrocery);
//            next();
//        }).catch(err => {
//            console.log(err);
//            response.sendStatus(500);
//            next();
//        });
//});
//
///* PATCH is an HTTP method that serves as partial replacement */
//groceryRouter.patch('', (request, response, next) => {
//    const grocery = request.body;
//    groceryService.patchFoodGrocery(grocery)
//        .then(updatedgrocery => {
//            if(updatedgrocery) {
//                response.json(updatedgrocery);
//            } else {
//                response.sendStatus(404);
//            }
//        }).catch(err => {
//            console.log(err);
//            response.sendStatus(500);
//        }).finally(() => {
//            next();
//        })
//});