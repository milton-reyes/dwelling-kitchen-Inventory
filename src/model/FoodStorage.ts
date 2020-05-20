export class FoodStorage {
    storagesId: number;
    upcFood: string;
    quantity: number;
	datePurchased: Date;
    shelfLife: string;

    constructor(
        storagesId: number,
        upcFood: string,
        quantity: number,
	    datePurchased: Date,
	    shelfLife: string) {
            this.storagesId = storagesId;
            this.upcFood = upcFood;
            this.quantity = quantity;
	        this.datePurchased = datePurchased;
	        this.shelfLife = shelfLife;
    }

    static from(obj:FoodStorageRow): FoodStorage {
        const foodStorage = new FoodStorage(
            obj.storagesId,
            obj.upcFood,
            obj.quantity,
	        obj.datePurchased,
            obj.shelfLife
        );
        return foodStorage;
    }
}

export interface FoodStorageRow {
    storagesId: number;
    upcFood: string;
    quantity: number;
	datePurchased: Date;
	shelfLife: string;
}