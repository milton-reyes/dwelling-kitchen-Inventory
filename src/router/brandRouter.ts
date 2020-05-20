import express from 'express';
import * as brandService from '../service/brandService';

export const brandRouter = express.Router();

brandRouter.get('', (request, response, next) => {
    brandService.getAllBrands().then(brand => {
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
brandRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    brandService.getBrandById(id).then(brand => {
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
brandRouter.post('', (request, response, next) => {
    const brand = request.body;
    brandService.saveBrand(brand)
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
brandRouter.patch('', (request, response, next) => {
    const brand = request.body;
    brandService.patchBrand(brand)
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