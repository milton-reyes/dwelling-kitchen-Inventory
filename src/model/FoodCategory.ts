export class FoodCategory {
    categoriesId: number;
    upcFood: string;

    constructor(categoriesId: number,upcFood: string) {
        this.categoriesId = categoriesId;
	    this.upcFood = upcFood;
    }

    static from(obj: FoodCategoryRow): FoodCategory {
        const foodCategory = new FoodCategory(obj.categoriesId,obj.upcFood);
        return foodCategory;
    }
}

export interface FoodCategoryRow {
    categoriesId: number;
	upcFood: string;
}