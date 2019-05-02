import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";

export function checkout(args: EventData) {
    (<Button>args.object).page.frame.navigate("checkout-page");
}
