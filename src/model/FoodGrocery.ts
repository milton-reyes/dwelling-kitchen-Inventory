export class FoodGrocery {
    food: string;
    upcFood: string;
    notes: string;

    constructor(food:string,upcFood:string,notes:string){
        this.food = food;
        this.upcFood = upcFood;
        this.notes = notes;
    }

    static from(obj: FoodGroceryRow): FoodGrocery{
        const foodGrocery = new FoodGrocery(obj.food,obj.upc_food,obj.notes);
        return foodGrocery;
    }

}

export interface FoodGroceryRow {
    food: string;
    upc_food: string;
    notes: string;
}