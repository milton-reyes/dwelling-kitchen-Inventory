import express from 'express';
import * as brandRetailerService from '../service/brandRetailerService';

export const brandRetailerRouter = express.Router();

brandRetailerRouter.get('', (request, response, next) => {
    brandRetailerService.getAllBrandRetailers().then(brand => {
        response.json(brand);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/*
    http://localhost:3000/brand/1
    Retrieves a single brand from the database by id
    If the brand does not exist, sends 404
*/
brandRetailerRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    brandRetailerService.getBrandRetailerByBrandId(id).then(brand => {
        if (!brand) {
            response.sendStatus(404);
        } else {
            response.json(brand);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/*
    POST http://localhost:3000/brand
    Creates a new brand and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
brandRetailerRouter.post('', (request, response, next) => {
    const brand = request.body;
    brandRetailerService.saveBrandRetailer(brand)
        .then(newBrand => {
            response.status(201);
            response.json(newBrand);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

/* PATCH is an HTTP method that serves as partial replacement */
brandRetailerRouter.patch('', (request, response, next) => {
    const brand = request.body;
    brandRetailerService.patchBrandRetailer(brand)
        .then(updatedBrand => {
            if(updatedBrand) {
                response.json(updatedBrand);
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