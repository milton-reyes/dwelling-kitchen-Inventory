import express from 'express';
import * as storageService from '../service/storageService';

export const storageRouter = express.Router();

storageRouter.get('', (request, response, next) => {
    storageService.getAllStorages().then(storage => {
        response.json(storage);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/*
    http://localhost:3000/storage/1
    Retrieves a single storage from the database by id
    If the storage does not exist, sends 404
*/
storageRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    storageService.getStorageById(id).then(storage => {
        if (!storage) {
            response.sendStatus(404);
        } else {
            response.json(storage);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/*
    POST http://localhost:3000/storage
    Creates a new storage and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
storageRouter.post('', (request, response, next) => {
    const storage = request.body;
    storageService.saveStorage(storage)
        .then(newStorage => {
            response.status(201);
            response.json(newStorage);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

/* PATCH is an HTTP method that serves as partial replacement */
storageRouter.patch('', (request, response, next) => {
    const storage = request.body;
    storageService.patchStorage(storage)
        .then(updatedStorage => {
            if(updatedStorage) {
                response.json(updatedStorage);
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