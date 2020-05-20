export class Category {
    id: number;
    category: string;

    constructor(id:number,category:string) {
        this.id = id;
        this.category = category;
    }

    static from(obj: CategoryRow): Category {
        const category = new Category(
            obj.id, obj.category);
        return category;
    }
}

export interface CategoryRow {
    id: number;
    category: string;
}