/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { CheckoutModel } from "./checkout-view-model";

let vm: CheckoutModel;
let page: Page;

if (module.hot) {

    // Handle changes in checkout-page.ts (this file)
    module.hot.dispose((data) => {
        console.log("[checkout-page.ts] disposed");
        data.vm = vm;
    });
    if (module.hot.data && module.hot.data.vm) {
        console.log("[checkout-page.ts] vm loaded from cache");
        vm = module.hot.data.vm;
    }

    // Handle changes in checkout-view-model.ts (vm module)
    module.hot.accept(["./checkout-view-model"], () => {
        console.log("-----> checkout-view-model accepted");
        vm = Object.assign(new CheckoutModel(), vm);
        page.bindingContext = vm;
    })
}

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    console.log(`[CHECKOUT-PAGE]: navigatingTo. cached vm: ${vm}`);
    page = <Page>args.object;
    vm = vm || new CheckoutModel();
    page.bindingContext = vm;
}

export function navigatedTo(args: EventData) {
    console.log("[CHECKOUT-PAGE]: navigatedTo");
}

export function loaded(args: EventData) {
    console.log("[CHECKOUT-PAGE]: loaded");
}
