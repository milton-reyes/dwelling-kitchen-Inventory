import { db } from '../dao/db';
import { Category, CategoryRow } from '../model/Category';

export function getAllCategories(): Promise<Category[]> {
    const sql = `SELECT * FROM categories`;

    return db.query<CategoryRow>(sql, []).then(result => {
        const rows: CategoryRow[] = result.rows;

        console.log(rows);

        const categories: Category[] = rows.map(row => Category.from(row));
        return categories;
    })
}

export function getCategoryById(id: number): Promise<Category> {
    const sql = `SELECT * FROM categories WHERE id = $1`;

    return db.query<CategoryRow>(sql, [id])
        .then(result => result.rows.map(row => Category.from(row))[0]);
}

export function saveCategory(category: Category): Promise<Category> {
    const sql = `INSERT INTO categories (category) VALUES ($1) RETURNING *`;

    return db.query<CategoryRow>(sql, [category.category])
        .then(result => result.rows.map(row => Category.from(row))[0]);
}

export function patchCategory(category: Category): Promise<Category> {
    const sql = `UPDATE categories SET category = COALESCE($1, category) WHERE id = $2 RETURNING *`;

    const params = [category.category, category.id];

    return db.query<CategoryRow>(sql, params)
        .then(result => result.rows.map(row => Category.from(row))[0]);
}