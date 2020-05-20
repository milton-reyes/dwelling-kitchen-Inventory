export class Retailer {
    id: number;
    retailer: string;

    constructor(id:number,retailer:string) {
        this.id = id;
        this.retailer = retailer;
    }

    static from(obj: RetailerRow): Retailer {
        const retailer = new Retailer(
            obj.id,obj.retailer
        );
        return retailer;
    }

}

export interface RetailerRow {
    id: number;
    retailer: string;
}
