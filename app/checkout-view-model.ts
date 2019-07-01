import { Observable } from "tns-core-modules/data/observable";
import { DataProperty, copyDataProps } from "./data-property";

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
    @DataProperty()
    public step: number = 1;

    @DataProperty()
    public streetAddress: string;

    onNext() {
        this.step++;
    }

    onPrevious() {
        this.step--;
    }
}


if (module.hot) {
    // Handle changes in checkout-page.ts (this file) 
    module.hot.dispose((data) => {
        console.log("[checkout-vm.ts] disposed");
        data.vm = instance;
    });
}

let instance: CheckoutModel = new CheckoutModel();
if (module.hot.data && module.hot.data.vm) {
    console.log("[checkout-vm.ts] vm loaded from cache");
    copyDataProps(module.hot.data.vm, instance);
}

export function getCheckoutVM(): CheckoutModel {
    return instance;
}
