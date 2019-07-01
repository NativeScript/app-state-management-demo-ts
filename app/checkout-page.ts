/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { CheckoutModel, getCheckoutVM } from "./checkout-view-model";

let page: Page;

if (module.hot) {
    // Handle changes in checkout-view-model.ts (vm module)
    module.hot.accept(["./checkout-view-model"], () => {
        console.log("-----> checkout-view-model accepted");
        page.bindingContext = getCheckoutVM();
    })
}

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    console.log(`[CHECKOUT-PAGE]: navigatingTo`);
    page = <Page>args.object;
    page.bindingContext = getCheckoutVM();
}

export function navigatedTo(args: EventData) {
    console.log("[CHECKOUT-PAGE]: navigatedTo");
}

export function loaded(args: EventData) {
    console.log("[CHECKOUT-PAGE]: loaded");
}
