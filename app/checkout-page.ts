/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { CheckoutModel } from "./checkout-view-model";

let vm: CheckoutModel;

if (module.hot) {
    module.hot.dispose((data) => {
        console.log("[checkout-page.ts] disposed");
        data.vm = vm;
    });

    if(module.hot.data && module.hot.data.vm) {
        console.log("[checkout-page.ts] vm loaded from cache");
        vm = module.hot.data.vm;
    }
}

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    console.log(`[CHECKOUT-PAGE]: navigatingTo. cached vm: ${vm}`);
    let page = <Page>args.object;
    vm = vm || new CheckoutModel();
    page.bindingContext = vm;
}

export function navigatedTo(args: EventData) {
    console.log("[CHECKOUT-PAGE]: navigatedTo");
}

export function loaded(args: EventData) {
    console.log("[CHECKOUT-PAGE]: loaded");
}

// if (module.hot) {
//     module.hot.accept(["./checkout-view-model"], () => {
//         console.log("-----> checkout-view-model accepted");
//         page.bindingContext = copyContext(page.bindingContext);
//     })
// }

// function copyContext(context: CheckoutModel): CheckoutModel | undefined {
//     // return undefined;

//     if (!context) return undefined;

//     const newCtx = new CheckoutModel();

//     for (const key in context) {
//         if (context.hasOwnProperty(key)) {
//             console.log("coping property: " + key)
//             newCtx[key] = context[key];
//         }
//     }

//     return newCtx;
// }