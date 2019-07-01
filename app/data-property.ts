import { Observable } from "tns-core-modules/data/observable";

declare module "tns-core-modules/data/observable" {
    interface Observable {
        __dataProps: string[];
    }
}

function assureDataProps(obj: Observable) {
    if (!obj.__dataProps) {
        Object.defineProperty(
            obj,
            "__dataProps",
            {
                value: [],
                writable: false,
                enumerable: false,
                configurable: false
            })
    }
}

// Extended from to Alex Ziskind's blog:
// https://www.nativescript.org/blog/nativescript-observable-magic-string-property-name-be-gone
export function DataProperty() {
    return (obj: Observable, key: string) => {
        console.log(`DataProperty. key: ${key}`);

        if (module.hot) {
            assureDataProps(obj);
            obj.__dataProps.push(key);
        }

        let storedValue = obj[key];
        Object.defineProperty(obj, key, {
            get: function () {
                return storedValue;
            },
            set: function (value) {
                if (storedValue === value) {
                    return;
                }
                storedValue = value;
                this.notify({
                    eventName: Observable.propertyChangeEvent,
                    propertyName: key,
                    object: this,
                    value,
                });
            },
            enumerable: true,
            configurable: true,
        });
    };
}

export function copyDataProps(from: Observable, to: Observable) {
    from.__dataProps.forEach(prop => {
        if (to.__dataProps.indexOf(prop) >= 0) {
            to[prop] = from[prop];
        }
    })
}