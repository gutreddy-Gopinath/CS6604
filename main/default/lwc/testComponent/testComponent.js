import { LightningElement } from 'lwc';

export default class TestComponent extends LightningElement {
    message = 'Hello Gopinath';
    message1 = 'gutboyyy';
    greeting;
    changeHandler(event){
        this.greeting = event.target.value;
    }
}