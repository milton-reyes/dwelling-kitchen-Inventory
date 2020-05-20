export class FoodRetailer {
    retailerId: number;
	upcFood: string;
    price: number;

    constructor(retailerId: number,upcFood: string,price: number){
        this.retailerId = retailerId;
	    this.upcFood = upcFood;
	    this.price = price;
    }

    static from(obj:FoodRetailerRow): FoodRetailer {
        const foodRetailer = new FoodRetailer(
            obj.retailerId,
            obj.upcFood,
            obj.price
        );
        return foodRetailer;
    }
}

export interface FoodRetailerRow {
    retailerId: number;
	upcFood: string;
	price: number;
}