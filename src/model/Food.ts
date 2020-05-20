export class Food {
    food: string;
    upcFood: string;

    constructor(food:string,upcFood:string) {
        this.food = food;
        this.upcFood = upcFood;
    }

    static from(obj: FoodRow): Food {
        const food = new Food(
            obj.food, obj.upcFood);
        return food;
    }
}

export interface FoodRow {
    food: string;
    upcFood: string;
}