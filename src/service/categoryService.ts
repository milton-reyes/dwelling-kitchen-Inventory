import { Category } from '../model/Category';
import * as categoryDao from '../dao/CategoryDao';

export function getAllCategories(): Promise<Category[]> {
    return categoryDao.getAllCategories();
}

export function getCategoryById(id: number): Promise<Category> {
    return categoryDao.getCategoryById(id);
}

export function saveCategory(category: any): Promise<Category> {
    
    console.log(category);

    const newCategory = new Category(undefined, category.category);

    if(category.category) {
        return categoryDao.saveCategory(newCategory);
    } else {
        console.warn('Category invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchCategory(input: any): Promise<Category> {
    const category = new Category(input.id, input.category);

    if(!category.id) {
        throw new Error('400');
    }
    return categoryDao.patchCategory(category);
}
