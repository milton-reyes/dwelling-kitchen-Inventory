import express from 'express';
import * as categoryService from '../service/categoryService';

export const categoryRouter = express.Router();

categoryRouter.get('', (request, response, next) => {
    categoryService.getAllCategories().then(category => {
        response.json(category);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/*
    http://localhost:3000/category/1
    Retrieves a single category from the database by id
    If the category does not exist, sends 404
*/
categoryRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    categoryService.getCategoryById(id).then(category => {
        if (!category) {
            response.sendStatus(404);
        } else {
            response.json(category);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/*
    POST http://localhost:3000/category
    Creates a new category and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
categoryRouter.post('', (request, response, next) => {
    const category = request.body;
    categoryService.saveCategory(category)
        .then(newCategory => {
            response.status(201);
            response.json(newCategory);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

/* PATCH is an HTTP method that serves as partial replacement */
categoryRouter.patch('', (request, response, next) => {
    const category = request.body;
    categoryService.patchCategory(category)
        .then(updatedCategory => {
            if(updatedCategory) {
                response.json(updatedCategory);
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