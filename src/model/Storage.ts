export class Storage {
    id: number;
    storage: string;

    constructor(id:number,storage:string) {
        this.id = id;
        this.storage = storage;
    }

    static from(obj:StorageRow): Storage {
        const storage = new Storage(obj.id,obj.storage);
        return storage;
    }
}

export interface StorageRow {
    id: number;
    storage: string;
}
