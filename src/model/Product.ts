abstract class Product {
    id: number;
    price: number;
    weight: number;
    upc: number;

    name: string;
    type: string;
    placed: string;
    shop: string;

    constructor(id: number,price: number,weight: number,upc: number,name: string,type: string,placed: string,shop: string) {
        this.id = id;
        this.price = price;
        this.weight = weight;
        this.upc = upc;
        this.name = name;
        this.type = type;
        this.placed = placed;
        this.shop = shop;


    }
}