import { Observable } from "tns-core-modules/data/observable";

interface Product {
    name: string;
    price: number;
}

interface ProductOrder extends Product {
    quantity: number;
}

interface Order {
    items: ProductOrder[];
}

const products: Product[] = [
    { name: "Product 1", price: 10 },
    { name: "Product 2", price: 20 },
    { name: "Product 3", price: 30 },
    { name: "Product 4", price: 40 },
    { name: "Product 5", price: 50 },
]

const order: Order = {
    items: [
        { name: "Product 1", price: 10, quantity: 5 },
        { name: "Product 3", price: 30, quantity: 2 },
        { name: "Product 4", price: 40, quantity: 1 },
    ]
}

export class CheckoutModel extends Observable {
    private _step: number = 1;

    get step(): number {
        return this._step;
    }

    set step(value: number) {
        if (this._step !== value) {
            this._step = value;
            this.notifyPropertyChange("step", value);
        }
    }

    constructor() {
        super();
        this.set("order", order)
    }

    onNext() {
        this.step++;
    }

    onPrevius() {
        this.step--;
    }
}
