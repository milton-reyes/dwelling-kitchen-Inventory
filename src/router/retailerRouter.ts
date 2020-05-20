import express from 'express';
import * as retailerService from '../service/retailerService';

export const retailerRouter = express.Router();

retailerRouter.get('', (request, response, next) => {
    retailerService.getAllRetailers().then(retailer => {
        response.json(retailer);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/*
    http://localhost:3000/retailer/1
    Retrieves a single retailer from the database by id
    If the retailer does not exist, sends 404
*/
retailerRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    retailerService.getRetailerById(id).then(retailer => {
        if (!retailer) {
            response.sendStatus(404);
        } else {
            response.json(retailer);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/*
    POST http://localhost:3000/retailer
    Creates a new retailer and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
retailerRouter.post('', (request, response, next) => {
    const retailer = request.body;
    retailerService.saveRetailer(retailer)
        .then(newRetailer => {
            response.status(201);
            response.json(newRetailer);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

/* PATCH is an HTTP method that serves as partial replacement */
retailerRouter.patch('', (request, response, next) => {
    const retailer = request.body;
    retailerService.patchRetailer(retailer)
        .then(updatedRetailer => {
            if(updatedRetailer) {
                response.json(updatedRetailer);
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