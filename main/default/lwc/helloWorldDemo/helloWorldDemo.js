import { LightningElement, track } from 'lwc';

export default class HelloWorldDemo extends LightningElement {
    @track demoHelloWord = 'Gopi Here';

    demoHandler(event){
        this.demoHelloWord = event.target.value;
    }
}