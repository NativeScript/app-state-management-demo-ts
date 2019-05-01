import { Observable } from "tns-core-modules/data/observable";

export class HelloWorldModel extends Observable {

    private _counter: number;
    private _message: string;

    constructor(vm: { _counter: number } = { _counter: 42 }) {
        super();

        // Initialize default values.
        this._counter = vm._counter;
        this.updateMessage();
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange("message", value);
        }
    }

    onTap() {
        this._counter += 10;
        this.updateMessage();
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message = "Hoorraaay! You unlocked the NativeScript clicker achievement!";
        } else {
            this.message = `${this._counter} taps left`;
        }
    }
}
