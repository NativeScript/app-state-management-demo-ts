/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { HelloWorldModel } from "./main-view-model";

let page: Page;
// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    let cachedContext = page ? page.bindingContext : undefined;
    page = <Page>args.object;
    page.bindingContext = new HelloWorldModel(cachedContext);
}

if (module.hot) {
    module.hot.accept(["./main-view-model"], () => {
        console.log("-------> main-view-model accepted");
        page.bindingContext = new HelloWorldModel(page.bindingContext);
    })
}