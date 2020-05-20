export class Grocery  {
    category: string;
    food: string;
    brand: string;
    notes: string;
    weight: number;
    measureUnit: string;
    datePurchased: Date;
    retailer: string;
    price: number;
    storage: string;
    quantity: number;
    shelfLife: string;

    constructor(
        category: string,
        food: string,
        brand: string,
        notes: string,
        weight: number,
        measureUnit: string,
        datePurchased: Date,
        retailer: string,
        price: number,
        storage: string,
        quantity: number,
        shelfLife: string) {
            this.category = category;
            this.food = food;
            this.brand = brand;
            this.notes = notes;
            this.weight = weight;
            this.measureUnit = measureUnit;
            this.datePurchased = datePurchased;
            this.retailer = retailer;
            this.price = price;
            this.storage = storage;
            this.quantity = quantity;
            this.shelfLife = shelfLife;
    }

    static from(obj: GroceryRow): Grocery{
        const grocery = new Grocery(
            obj.category,
            obj.food,
            obj.brand,
            obj.notes,
            obj.weight,
            obj.measure_unit,
            obj.date_purchased,
            obj.retailer,
            obj.price,
            obj.storage,
            obj.quantity,
            obj.shelf_life);
        return grocery;
    }

}

export interface GroceryRow {
    category: string;
    food: string;
    brand: string;
    notes: string;
    weight: number;
    measure_unit: string;
    date_purchased: Date;
    retailer: string;
    price: number;
    storage: string;
    quantity: number;
    shelf_life: string;
}