import { LightningElement, track } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    @track checkAvailability = false;

showAvailable(event){
    this.checkAvailability = event.target.checked;
}
}